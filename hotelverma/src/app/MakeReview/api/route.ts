import { connectToDatabase } from "@/app/reservation/utils/db";
import Reservation from '../../reservation/models/Reservations';
import {NextRequest, NextResponse} from "next/server";
import Review from '../../Reviews/models/Review';

export async function GET(req: Request) {
    const url = new URL(req.url);
    const id = url.searchParams.get("reservation");

    if (!id) {
        return new Response(JSON.stringify({ error: "reservation ID is required" }), {
            status: 400,
        });
    }

    try {
        await connectToDatabase();
        const reservation = await Reservation.findById(id);

        return new Response(JSON.stringify({ reservation }), { status: 200 });
    } catch (error) {
        console.error("Error fetching hotel:", error);
        return new Response(
            JSON.stringify({ error: "Internal Server Error" }),
            { status: 500 }
        );
    }
}

export async function POST(req: NextRequest) {
    try {
        await connectToDatabase();
        const body = await req.json();
        const {hotelId, firstname, lastname, message} = body;
        if (!hotelId || !firstname || !lastname || !message) {
            return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
        }

        const newReview = new Review({
            hotelId,
            firstname,
            lastname,
            message
        })

        const savedReview = await newReview.save();
        return NextResponse.json({review: savedReview}, {status: 200})
    } catch (error) {
        console.error("Error submitting:", error);
    }
}