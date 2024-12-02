import { MongoClient, ObjectId } from "mongodb";
import {NextRequest, NextResponse} from "next/server";
import Reservation from "@/app/reservation/models/Reservation";
import {connectToDatabase} from "@/app/reservation/utils/db";
import Hotel from '../../hotels/models/Hotels'


// The GET function is now accepting an `id` as a parameter
export async function GET(req: Request) {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");  // Extract the hotel ID from the query string

    if (!id) {
        return new Response(JSON.stringify({ error: "Hotel ID is required" }), { status: 400 });
    }

    try {
        await connectToDatabase()
        const hotel = await Hotel.findById(id)

        return new Response(JSON.stringify({ hotel }), { status: 200 });
    } catch (error) {
        console.error("Error fetching hotel:", error);
        return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        await connectToDatabase()
        // const { db } = await connectToDatabase();
        // const body = await req.json();

        const body = await req.json();
        const { checkIn, checkOut, conFirNum, email, fname, lname, tel, title } = body;

        const newReservation = new Reservation({
            checkIn,
            checkOut,
            conFirNum,
            email,
            fname,
            lname,
            tel,
            title,
        });
        const savedReservation = await newReservation.save();
        return NextResponse.json({reservation: savedReservation}, {status: 201});
    } catch (e) {
        console.log('error: ', e);
    }
}