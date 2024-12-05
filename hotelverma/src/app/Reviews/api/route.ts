import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '../../lib/db'
import Review from "../../lib/models/Review";


export async function GET(req: NextRequest) {
    try {
        const url = new URL(req.url);
        const id = url.searchParams.get("id");
        await connectToDatabase();

        const reviews = await Review.find({ hotelId: id});
        return NextResponse.json({ reviews });
    } catch (error) {
        console.error('Error fetching hotels:', error);
        return NextResponse.json({ message: 'Error fetching hotels' }, { status: 500 });
    }
}
