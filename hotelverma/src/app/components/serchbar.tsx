"use client";
import {RangeCalendar} from "@nextui-org/react";
import {Button} from "@nextui-org/button";
import {Popover, PopoverTrigger, PopoverContent} from "@nextui-org/popover";
import React from "react";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem} from "@nextui-org/react"
import type {Selection} from "@nextui-org/react";import { CalendarDate, getLocalTimeZone, today } from '@internationalized/date';


export default function SearchBar() {
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(new Set(["Travelers"]));

  const selectedValue = React.useMemo(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys]
  );

    const [dateRange, setDateRange] = React.useState(null);

    const handelChange = (range: any) => {
      setDateRange(range);
    };

    const formatDate = (range: any) => {
      if (!range || !range.start || !range.end) {return "Stay Duration"}
      return `${range.start.toDate(getLocalTimeZone()).toLocaleDateString()} - ${range.end.toDate(getLocalTimeZone()).toLocaleDateString()}`
    }

    return (
    <main>
    <div className="border ml-[150px] mr-[150px] rounded-lg pb-[12px] pt-[20px] mt-[200px] ">
    <center>
        <div className="flex flex-wrap gap-4 items-center justify-center">
          <h1 className="w-full text-xl font-bold">Quick Search</h1>
          <hr className="w-full border-t-2 border-gray-300 my-2"/>
        <Popover placement="bottom">
          <PopoverTrigger>
          <Button className="w-[280px] " color="secondary" variant="bordered">Where to?</Button>
          </PopoverTrigger>
          <PopoverContent>
            <p className="text-black">hello</p>
          </PopoverContent>
        </Popover>
          
      <Popover placement="bottom">
        <PopoverTrigger>
        <Button className="w-[280px]" variant="bordered" color="secondary">{formatDate(dateRange)}</Button>
        </PopoverTrigger>
        <PopoverContent>
          <RangeCalendar value={dateRange} onChange={handelChange}

          />
        </PopoverContent>
      </Popover>
        <Dropdown>
          <DropdownTrigger>
            <Button className="w-[280px]" color="secondary" variant="bordered">{selectedValue}</Button>
          </DropdownTrigger>
          <DropdownMenu
           aria-label="Single selection example"
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
          <Button className="w-[100px] border ml-[20px] w-[130px]" radius="full" color="primary">Search</Button>
        </div>
    </center>
    </div>
    </main>
    );
}
   
