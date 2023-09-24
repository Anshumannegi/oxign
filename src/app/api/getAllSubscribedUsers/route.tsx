// pages/api/getAllLabTests.js
export const revalidate = 0;

import { connect } from "@/dbConfig/dbConfig";
import subscribedUsers from "../../../models/subscribedUser";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function GET(request: NextRequest) {
  try {
    const subscribedUser = await subscribedUsers.find();
    return NextResponse.json(subscribedUser);
  } catch (error: any) {
    return NextResponse.json(
      { error: "Error fetching subscribedUser" },
      { status: 500 }
    );
  }
}
