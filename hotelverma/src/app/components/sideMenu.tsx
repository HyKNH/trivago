'use client';
import {Card, CardBody} from "@nextui-org/card"
import {Divider} from "@nextui-org/divider";
import {Image} from "@nextui-org/image";
import axios from "axios";
import {useEffect, useState} from "react";

export default function SideMenu(){
    const [data, setData] = useState([])
    useEffect(() => {
        axios.get('http://localhost:8080/Hotel_Manage/room/getAll')
            .then(res => setData(res.data))
            .catch(err => console.log(err))
    }, [])
    return (
        <div className="flex gap-4 mt-12">
            <div
                className="ml-5 w-1/4 h-screen mb-52 shadow-xl "
            >
                filter menu
            </div>
            <Divider orientation="vertical"/>
            <div className="w-3/4 pr-52">
                {data.map((room, index) => {
                    return (
                        <Card key={index}>
                            <CardBody>
                                <div className="flex gap-x-4 h-auto">
                                    <div className="w-2/5">
                                        <Image
                                            width={400}
                                            src={room.pictures}
                                        />
                                    </div>
                                    <div className="w-3/5 relative">
                                        <h1 className="font-semibold">Title</h1>
                                        <h2>{room.location}</h2>
                                        <h3>ameninites</h3>
                                        <button className="absolute bottom-0 right-0 py-2 px-4 border border-soloid rounded-lg border-red-300 text-red-300">Book Now</button>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
}