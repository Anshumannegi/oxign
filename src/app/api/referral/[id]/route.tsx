// pages/api/referral.js

export const revalidate = 0;
import { connect } from "@/dbConfig/dbConfig";

import User from "../../../../models/userModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: any) {
  try {
    await connect();

    const { referralCode } = params;
    console.log("p0", params.id);


    

    // Check if a user with the given referral code exists
    const userWithReferralCode = await User.findOne({
      referralCode: params?.id.trim(),
    });

    

    if (userWithReferralCode) {
      return NextResponse.json({ isValid: true }, { status: 200 });
    } else {
      return NextResponse.json({ isValid: false }, { status: 200 });
    }
  } catch (error) {
    console.error("Error checking referral code:", error);
    return NextResponse.json(
      {
        error: "An error occurred while checking referral code",
      },
      { status: 500 }
    );
  }
}
