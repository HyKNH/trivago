import { IoCheckmarkCircleSharp } from "react-icons/io5";
import {Image} from "@nextui-org/image";


export default function confimation () {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
                <div className="flex flex-wrap">
                <h1 className="text-xl font-semibold text-center text-green-500 w-full">Thank You for using Hotel Verma!</h1>
                <IoCheckmarkCircleSharp className="text-3xl text-green-500 mt-2 w-full mb-1"/>
                <div className="w-full">
                <Image
                width={600}
                height={400}
                src="https://images.unsplash.com/photo-1622396481328-9b1b78cdd9fd?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Hotel Verma"
                />
                </div>
                <div className="w-full flex gap-4 mt-4 ">
                    <h2 className="">Confirmation Number:</h2>
                    <h2>ksksksksksksksk</h2>
                </div>
                </div>
            </div>
        </div>
    );
}