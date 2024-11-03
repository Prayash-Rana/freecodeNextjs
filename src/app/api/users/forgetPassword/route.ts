import { connect } from "@/dbconfig/dbconnect";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel"; // Use default export
import { sendEmail } from "@/helper/mailer";

// Ensure database connection
connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email } = reqBody;

    // Normalize email to lowercase
    const normalizedEmail = email.toLowerCase();

    // Check if user already exists
    const existingUser = await User.findOne({ email: normalizedEmail });
    if (!existingUser) {
      return NextResponse.json(
        { success: false, error: "This user email is not registered on the server" },
        { status: 409 }
      );
    }

    // Send verification email
    await sendEmail({ email, emailType: "RESET", userId: existingUser._id });

    return NextResponse.json(
      { success: true, message: "Token created successfully", user: existingUser },
      { status: 201 }
    );
  } catch (error: unknown) {
    // Handle unknown type error safely
    const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
    console.error("Error registering user:", errorMessage);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
