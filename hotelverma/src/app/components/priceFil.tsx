import {Slider} from "@nextui-org/react";

export default function PriceSlider () {
    const handleonchange = (value: number | number[])=> {
        console.log(value) // [0, 450] prints like this
    }
    return (
        <div className="flex justify-center">
            <Slider
            label="Price"
            step={50}
            minValue={0}
            maxValue={1000}
            defaultValue={[0, 500]}
            formatOptions={{style: "currency", currency: "USD"}}
            className="w-3/4 pr-2"
            onChange={handleonchange}
            />
        </div>
    );
}