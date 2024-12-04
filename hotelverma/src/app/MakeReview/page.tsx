'use client';
import React, {useEffect, useState} from "react";
import axios from "axios";
import {Button, Input, Spacer} from "@nextui-org/react";
import {MdPostAdd} from "react-icons/md";

export default function MakeReview() {
    const [reservation, setReservation] = useState<any>();
    const [review, setReview] = useState({
        hotelId: '',
        firstname: '',
        lastname: '',
        message: '',
    });
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const params = new URLSearchParams(window.location.search);
            const reservationid = params.get('reservation');

            const fetchroom = async () => {
                try {
                    if (reservationid) {
                        const response = await axios.get(`/MakeReview/api?reservation=${reservationid}`);
                        const data = response.data;
                        setReservation(data.reservation);
                        setReview({
                            hotelId: data.reservation.hotelId || '',
                            firstname: data.reservation.firstName || '',
                            lastname: data.reservation.lastName || '',
                            message: data.message || '',
                        });
                    } else {
                        console.error("Reservation ID not found in the URL");
                    }
                } catch (e) {
                    console.error("Error fetching hotels:", e);
                }
            };
            fetchroom();
        }
    }, []);

    const createReview = async (e:any) => {
        e.preventDefault()
        try {
            const send = await axios.post('/MakeReview/api', review);
        } catch (e) {
            console.error("Error posting review:", e);
        }
    }
    return (
        <div>
            <form onSubmit={createReview} style={{marginBottom: '20px'}}>
                <Input
                    type="text"
                    placeholder="message"
                    onChange={(e) => setReview({...review, message: e.target.value})}
                />
                <Spacer y={4}/>
                <Button type="submit" color="warning" variant="bordered" startContent={<MdPostAdd/>}>
                    Add Review
                </Button>
            </form>
        </div>
    )
}