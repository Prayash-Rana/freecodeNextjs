import nodemailer from "nodemailer" ;
import bcryptjs from "bcryptjs" ;
import User from "@/models/userModel";

export const sendEmail = async({email,emailType,userId}: any) => {
  try {
    //create a hashed token
    const hashedToken = await bcryptjs.hash(userId.toString(),10);

    if(emailType === "VERIFY"){
      await User.findByIdAndUpdate(userId,
        {verifyToken: hashedToken,verifyTokenExpiry: Date.now()+3600000})
    }
    else if(emailType === "RESET"){
      await User.findByIdAndUpdate(userId,
        {forgotPasswordToken: hashedToken,forgotPasswordTokenExpiry: Date.now()+3600000})
    }

    // Looking to send emails in production? Check out our Email API/SMTP product!
const transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "5d71ed78cbdfad",
    pass: "346e010d2721f7"
  }
});

  // Define email options
  const mailOptions = {
    from: "hitesh@gmail.com",
    to: email,
    subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
    html: `
     <p>Click 
          <a href="${process.env.DOMAIN}/${emailType === "VERIFY" ? "verifyEmail" : "resetPassword"}?token=${hashedToken}">
            here
          </a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}.
          <br />
          Or copy and paste the link below into your browser: <br />
          ${process.env.DOMAIN}/${emailType === "VERIFY" ? "verifyEmail" : "resetPassword"}?token=${hashedToken}
        </p>
    `,
  };

 const mailResponse = await transport.sendMail(mailOptions);


   
  } catch (error: any) {
    throw new Error(error.message)
  }
}