// pages/api/addLabTest.js
export const revalidate = 0;

import { connect } from "@/dbConfig/dbConfig";
import LabTest from "../../../models/tests";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { testName, price, image, expectedResults, description } = reqBody;

    // You can add any necessary validations here before proceeding with the lab test creation.

    const labTest = new LabTest({
      testName,
      price,
      image,
      expectedResults,
      description,
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
