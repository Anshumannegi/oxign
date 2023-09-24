// pages/api/addLabTest.js
export const revalidate = 0;

import { connect } from "@/dbConfig/dbConfig";
import subscribedUsers from "../../../models/subscribedUser";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, email, phoneNumber, uniqueId, subscriptionDate } =
      reqBody;

    // You can add any necessary validations here before proceeding with the lab test creation.

    const subscribedUser = new subscribedUsers({
        username,
        email,
        phoneNumber,
        uniqueId,
        subscriptionDate,
    });

    await subscribedUser.save();

    return NextResponse.json({
      message: "subscribed user added successfully",
      success: true,
    });
  } catch (error: any) {
    console.log(error)
    return NextResponse.json(
      { error: "Error adding subscrubed user " },
      { status: 400 }
    );
  }
}
