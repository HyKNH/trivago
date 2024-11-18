import {Popover, PopoverTrigger, PopoverContent, Button,RangeCalendar} from "@nextui-org/react"
import type {DateValue} from "@react-types/calendar";
import type {RangeValue} from "@react-types/shared";
import React from "react"



export default function Calendar () {
    const [val, setVal] = React.useState<RangeValue<DateValue> | null>(null);

    const formatDate = (date: DateValue) =>{
        return `${date.month}/${date.day}/${date.year}`;
     }

    const selectedRange = val ? `${formatDate(val.start)} - ${formatDate(val.end)}` : "Stay Duration";

    return (
        <Popover>
          <PopoverTrigger>
            <Button className="w-52  flex-initial border-amber-500 text-black " variant="bordered" color="warning">{selectedRange}</Button>
          </PopoverTrigger>
          <PopoverContent>
            <div className="flex gap-x-4">
              <RangeCalendar 
              visibleMonths={2}
              value={val} 
              onChange={setVal} 
            />
            </div>
          </PopoverContent>
        </Popover>
    );

}