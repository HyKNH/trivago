'use client'

import {DatePicker} from "@nextui-org/react";

export default function DatePickerOne() {
    return (
      <div className="item2">
          <DatePicker 
            label="Dates"
            className="max-w-[284px]"
            isRequired
          />
      </div>
    );
  }
