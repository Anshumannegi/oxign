// pages/api/addLabTest.js

import { connect } from "@/dbConfig/dbConfig";
import LabTest from "../../../models/tests";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { testName, price, image, expectedResults } = reqBody;

    // You can add any necessary validations here before proceeding with the lab test creation.

    const labTest = new LabTest({
      testName,
      price,
      image,
      expectedResults,
    });

    await labTest.save();

    return NextResponse.json({
      message: "Lab test added successfully",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Error adding lab test" },
      { status: 400 }
    );
  }
}
