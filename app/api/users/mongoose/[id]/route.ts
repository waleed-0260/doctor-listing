import { NextResponse } from "next/server";
import mongoose from "mongoose";
import User from "@/models/doctors"; // Ensure correct model path

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    if (!mongoose.connections[0].readyState) {
      await mongoose.connect(process.env.MONGODB_URI as string);
    }

    const { id } = params;
    // console.log("idnsjnds", id)

    // ✅ Fix: Query `_id` as a STRING
    const doctor = await User.findById(id) 

    if (!doctor) {
      return NextResponse.json({ error: "Doctor not found" }, { status: 404 });
    }

    return NextResponse.json({ doctor }, { status: 200 });
  } catch (error) {
    console.error("Error fetching doctor:", error);
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
