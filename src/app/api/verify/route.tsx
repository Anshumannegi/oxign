export const revalidate = 0;

import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";

connect();

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json();

    const user = await User.findOne({ verifyToken: token });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "Invalid token" },
        { status: 400 }
      );
    }

    if (user.verifyTokenExpiry < new Date()) {
      return NextResponse.json(
        { success: false, message: "Token expired" },
        { status: 400 }
      );
    }

    user.isVerfied = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;
    await user.save();

    return NextResponse.json(
      { success: true, message: "Verification successful" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
