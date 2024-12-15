import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export const getSession = async (req: any) => {
  try {
    const token = req.headers.get('Authorization')?.split(' ')[1];

    if (!token) {
      throw new Error('No token found');
    }

    const decoded = jwt.verify(token, JWT_SECRET) as { email: string; role: string; userId: string };

    return {
      user: {
        email: decoded.email,
        role: decoded.role,
        _id: decoded.userId,
      },
    };
  } catch (error) {
    console.error('Error getting session:', error);
    return null;
  }
};