import {Slider} from "@nextui-org/react";



export default function PriceSlider () {
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
        />
      </div>
    
    );
}