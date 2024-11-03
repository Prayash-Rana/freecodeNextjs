import { NextResponse } from "next/server";


export async function GET(){
  try {
    const response = NextResponse.json({
      success:true,
      message: "logout successfully"
    },)

    response.cookies.set("token","",{httpOnly: true});
    return response;
    
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
    console.error("Error during login:", errorMessage);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
}
}