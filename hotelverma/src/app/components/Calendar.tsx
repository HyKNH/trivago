import {Popover, PopoverTrigger, PopoverContent, Button,RangeCalendar} from "@nextui-org/react"
import type {DateValue} from "@react-types/calendar";
import type {RangeValue} from "@react-types/shared";
import React from "react"



export default function Calendar () {
    // creating a useState hook that will be used for assigning a date val 
    const [val, setVal] = React.useState<RangeValue<DateValue> | null>(null);
   // fucntion for taking in val  and convert them to string using string interpolation
    const formatDate = (date: DateValue) =>{
        return `${date.month}/${date.day}/${date.year}`;
     }
  //if true call formatDate on val if false then set val to string "stay duration"
    const selectedRange = val ? `${formatDate(val.start)} - ${formatDate(val.end)}` : "Stay Duration";

    return (
        //Popover used for redering component
        <Popover>
          {/* used to set the item used to make menu popup*/}
          <PopoverTrigger>
            <Button className="w-52  flex-initial border-amber-500 text-black " variant="bordered" color="warning">{selectedRange}</Button>
          </PopoverTrigger>
            {/* this is were the content for popup goes*/}
          <PopoverContent>
              <RangeCalendar 
              visibleMonths={2}
              value={val} 
              onChange={setVal} 
            />
          </PopoverContent>
        </Popover>
    );

}