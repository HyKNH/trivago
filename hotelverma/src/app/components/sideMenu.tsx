'use client';
import {Card, CardBody} from "@nextui-org/card"
import {Image} from "@nextui-org/image";

export default function SideMenu(){
    return (
         //div for putting filter menu and card listing into flex
        <div className="flex gap-4 mt-12">
         {/* Div for the filter menu*/}
            <div
            className="ml-5 w-1/4 h-screen mb-52 shadow-xl "
            >
                filter menu
            </div>
            {/* div for the card listing*/}
            <div className="w-3/4 pr-52">
                {/* <Card> </Card> is for redering in the component*/}
                <Card >
                    {/*CardBody is for adding the content that will be displayed in Card*/}
                    <CardBody>
                        {/* Div for the items inside of the card*/}
                        <div className="flex gap-x-4 h-auto">
                            {/* div for the imgage*/}
                            <div className="w-2/5">
                                <Image
                                    width={400}
                                    src="https://plus.unsplash.com/premium_photo-1661964402307-02267d1423f5?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aG90ZWwlMjByb29tfGVufDB8fDB8fHww"
                                />
                            </div>
                            {/* div for items on the right side of the card items like title, location, bookbutton, etc..*/}
                            <div className="w-3/5 relative">
                                <h1 className="font-semibold">Title</h1>
                                <h2>location</h2>
                                <h3>ameninites</h3>
                                <a href="http://localhost:3000/reservation">
                                <button className="absolute bottom-0 right-0 py-2 px-4 border border-soloid rounded-lg border-red-300 text-red-300">Book Now</button>
                                </a>
                            </div>
                        </div>

                    </CardBody>
                </Card>
            </div>
        </div>

    );
}