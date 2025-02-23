import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import User, { IUser } from '@/models/doctors';

export async function GET(req: Request) {
  try {
    // Ensure MongoDB connection
    if (!mongoose.connections[0].readyState) {
      await mongoose.connect(process.env.MONGODB_URI as string);
    }

    // Extract search parameters from request URL
    const { searchParams } = new URL(req.url);
    const name = searchParams.get("name");
    const city = searchParams.get("city");
    const specialty = searchParams.get("specialty");

    // Build query object dynamically
    const filter: any = {};
    if (name) filter.name = { $regex: name, $options: "i" }; // Case-insensitive search
    if (city) filter.city = { $regex: city, $options: "i" };
    if (specialty) filter.specialty = { $regex: specialty, $options: "i" };

    // Fetch filtered users from MongoDB
    const users = await User.find();

    return NextResponse.json({ users }, { status: 200 });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    if (!mongoose.connections[0].readyState) {
      await mongoose.connect(process.env.MONGODB_URI as string);
    }
    
    const data = await request.json();
    const user = new User(data);
    await user.save();
    
    return NextResponse.json({ 
      success: true, 
      id: user._id 
    });
  } catch (error) {
    const err = error as Error;
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}