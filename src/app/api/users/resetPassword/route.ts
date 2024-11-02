import { connect } from "@/dbconfig/dbconnect";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs"

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { token, password } = reqBody;

    const user = await User.findOne({
      forgotPasswordToken: token,
      forgotPasswordTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json({ error: "Invalid token" }, { status: 400 });
    }
    console.log(user);

    const hashedPassword = await bcryptjs.hash(password,10)

    user.isVerified = true;
    user.forgotPasswordToken = "";
    user.forgotPasswordTokenExpiry = undefined;
    user.password = hashedPassword;

    await user.save();

    return NextResponse.json({
      message: "new password set successfully",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
