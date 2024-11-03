import { connect } from "@/dbconfig/dbconnect";
import bcryptjs from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import jwt from "jsonwebtoken";

// Ensure database connection
connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;

    // Normalize email to lowercase
    const normalizedEmail = email.toLowerCase();

    const findingUser = await User.findOne({ email: normalizedEmail });

    if (!findingUser) {
      return NextResponse.json(
        { success: false, error: "Invalid credentials" },
        { status: 400 }
      );
    }

    const validPassword = await bcryptjs.compare(
      password,
      findingUser.password
    );

    if (!validPassword) {
      return NextResponse.json(
        { success: false, error: "Invalid credentials" },
        { status: 400 }
      );
    }

    // Create token data
    const tokenData = {
      id: findingUser._id,
      username: findingUser.name,
      email: findingUser.email,
    };

    // Generate token
    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET as string, {
      expiresIn: "1h",
    });

    const response = NextResponse.json({
      message: "Login successful",
      success: true,
    });

    // Set cookie with secure and httpOnly flags
    response.cookies.set("token", token, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 3600, // 1 hour
    });

    return response;
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "An unexpected error occurred";
    console.error("Error during login:", errorMessage);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}