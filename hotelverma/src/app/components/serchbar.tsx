"use client";
import React from "react";
import {RangeCalendar} from "@nextui-org/react";
import type {DateValue} from "@react-types/calendar";
import type {RangeValue} from "@react-types/shared";
import {Button} from "@nextui-org/button";
import {Popover, PopoverTrigger, PopoverContent} from "@nextui-org/popover";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem} from "@nextui-org/react"
import type {Selection} from "@nextui-org/react";

export default function SearchBar() {
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(new Set(["Travelers"]));

  const selectedValue = React.useMemo(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys]
  );

  let [val, setVal] = React.useState<RangeValue<DateValue> | null>(null);
    
  const formatDate = (date: DateValue) =>
  `${date.month}/${date.day}/${date.year}`;

  const selectedRange = val ? `${formatDate(val.start)} - ${formatDate(val.end)}` : "Stay Duration";

    return (
    <main>
    <div className="border ml-[150px] mr-[150px] rounded-lg pb-[12px] pt-[20px] mt-[200px] ">
    <center>
      <div className="flex flex-wrap gap-4 items-center justify-center">
        <h1 className="w-full text-xl font-bold">Quick Search</h1>
        <hr className="w-full border-t-2 border-gray-300 my-2"/>
        <Popover placement="bottom">
          <PopoverTrigger>
            <Button className="ButtonSearch w-[280px] " color="secondary" variant="bordered">Where to?</Button>
          </PopoverTrigger>
          <PopoverContent>
            <p className="text-black">hell0</p>
          </PopoverContent>
        </Popover>
        <Popover placement="bottom">
          <PopoverTrigger>
            <Button className="ButtonSearch w-[280px]" variant="bordered" color="secondary">{selectedRange}</Button>
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
        <Dropdown>
          <DropdownTrigger>
            <Button className="ButtonSearch w-[280px]" color="secondary" variant="bordered">{selectedValue}</Button>
          </DropdownTrigger>
          <DropdownMenu
           variant="flat"
           disallowEmptySelection
           selectionMode="single"
           selectedKeys={selectedKeys}
           onSelectionChange={setSelectedKeys}
           color="secondary"
          >
            <DropdownItem key="Travelers: 1">Number of poeple: 1</DropdownItem>
            <DropdownItem key="Travelers: 2">Number of People: 2</DropdownItem>
            <DropdownItem key="Travelers: 3">Number of People: 3</DropdownItem>
            <DropdownItem key="Travelers: 4">Number of People: 4</DropdownItem>
          </DropdownMenu>
        </Dropdown>     
        <Button className="ButtonSearch w-[100px] border ml-[20px] w-[130px]" radius="full" color="primary">Search</Button>
      </div>
    </center>
    </div>
    </main>
  );
}
   
