import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '../../../lib/db'; 
import User from '../../../signup/models/User'; 
import { getSession } from '../../utils/auth';

export const runtime = 'nodejs';

export async function GET(req: NextRequest) {
  try {
    const session = await getSession(req);

    if (!session || !session.user) {
      return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
    }

    const email = session.user.email;

    await connectToDatabase();

    const user = await User.findOne({ email });  

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

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
