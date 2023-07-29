// pages/api/getAllLabTests.js
export const revalidate = 0;

import { connect } from "@/dbConfig/dbConfig";
import LabTest from "../../../models/tests";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function GET(request: NextRequest) {
  try {
    const labTests = await LabTest.find();
    return NextResponse.json(labTests);
  } catch (error: any) {
    return NextResponse.json(
      { error: "Error fetching lab tests" },
      { status: 500 }
    );
  }
}
