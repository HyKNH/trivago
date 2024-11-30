export default function bookings() {



    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
                <h1 className="text-2xl font-semibold text-center text-gray-800">Cancel Booking</h1>
                <form className="space-y-4">
                <label htmlFor="getInfo" className="block text-md font-medium text-gray-700">
                        Enter Confirmation Number
                    </label>
                    <input 
                    id="getInfo" 
                    type="text" 
                    className="border-1 rounded-lg border-black w-full placeholder-black text-sm p-1"
                    placeholder="ex: 75385"
                    name="confimNum"
                     />
                    
                    <input type="submit" value="Cancel" className="border-1 border-red-600 rounded-lg p-1"/>
                </form>
            </div>
        </div>
    );
} 