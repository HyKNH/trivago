import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '../../../signup/utils/db'; // MongoDB connection
import User from '../../../signup/models/User'; // User model
import { getSession } from '../../utils/auth'; // JWT session handler

export async function GET(req: NextRequest) {
  try {
    // Get session data from the request (i.e., the JWT token in the Authorization header)
    const session = await getSession(req);

    // If no session data is returned, the user is not authenticated
    if (!session || !session.user) {
      return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
    }

    const email = session.user.email; // Get user email from the session

    // Connect to MongoDB
    await connectToDatabase();

    // Query MongoDB to find the user by email
    const user = await User.findOne({ email });  // Find the user by their email

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    // Return the user profile data including role, name, and email
    return NextResponse.json({
      role: user.role,
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    console.error('Error fetching profile:', error);
    return NextResponse.json({ message: 'Error fetching profile' }, { status: 500 });
  }
}
