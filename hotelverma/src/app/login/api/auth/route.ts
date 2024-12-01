import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "../../../signup/models/User";
import { connectToDatabase } from "../../../signup/utils/db";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
  try {

    await connectToDatabase();

    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    const token = jwt.sign(
        { userId: user._id, email: user.email, role: user.role },
        process.env.JWT_SECRET || "your-secret-key",
        { expiresIn: "1h" }
    );

    return NextResponse.json(
        { message: "Login successful, you will be redirected in 5 seconds", token},
        { status: 200 }
    );
  } catch (error) {
    console.error("Error logging in:", error);

    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";

    return NextResponse.json(
        { message: "Error logging in", error: errorMessage },
        { status: 500 }
    );
  }
}
