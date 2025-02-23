import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import User from "@/models/doctors"; // Ensure correct model path

export async function GET(req, context) {
  try {
    if (!mongoose.connections[0].readyState) {
      await mongoose.connect(process.env.MONGODB_URI);
    }

    const { id } = context.params;

    // ✅ Fix: Ensure ID is correctly used in the query
    const doctor = await User.findById(id);

    if (!doctor) {
      return NextResponse.json({ error: "Doctor not found" }, { status: 404 });
    }

    return NextResponse.json({ doctor }, { status: 200 });
  } catch (error) {
    console.error("Error fetching doctor:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
