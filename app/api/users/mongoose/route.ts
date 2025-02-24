import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import User, { IUser } from '@/models/doctors';

export async function GET(req: Request) {
  try {
    // Ensure MongoDB connection
    if (!mongoose.connections[0].readyState) {
      await mongoose.connect(process.env.MONGODB_URI as string);
    }

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