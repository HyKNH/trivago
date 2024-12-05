import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "../../lib/models/User"; 
import { connectToDatabase } from "../../lib/db";

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();

    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userCount = await User.countDocuments();
    const role = userCount === 0 ? 'admin' : 'user';

    const newUser = new User({ name, email, password: hashedPassword, role });
    console.log("New user data before saving:", newUser);

    await newUser.save();

    console.log("User saved:", newUser); 

    return NextResponse.json(
      { message: "User created successfully", user: newUser },
      { status: 201 }
    );  
  } catch (error) {
    console.error("Error creating user:", error);

    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";

    return NextResponse.json(
      { message: "Error creating user", error: errorMessage },
      { status: 500 }
    );
  }
}
