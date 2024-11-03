import { connect } from "@/dbconfig/dbconnect";
import bcryptjs from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel"; // Use default export
import { sendEmail } from "@/helper/mailer";

// Ensure database connection
connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, email, password } = reqBody;

    // Normalize email to lowercase
    const normalizedEmail = email.toLowerCase();

    // Check if user already exists
    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      return NextResponse.json(
        { success: false, error: "User with this email already exists" },
        { status: 409 }
      );
    }

    // Hash the password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // Create new user
    const newUser = await User.create({
      name: username,
      email: normalizedEmail,
      password: hashedPassword,
    });

    console.log("User registered:", newUser);

    //send verification email
    await sendEmail({email,emailType:"VERIFY",userId:newUser._id})

    return NextResponse.json(
      { success: true, message: "User registered successfully", user: newUser },
      { status: 201 }
    );
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
    console.error("Error during login:", errorMessage);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
}
}
