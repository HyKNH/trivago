"use client";
import React from "react";
import {RangeCalendar} from "@nextui-org/react";
import type {DateValue} from "@react-types/calendar";
import type {RangeValue} from "@react-types/shared";
import {Button} from "@nextui-org/button";
import {Popover, PopoverTrigger, PopoverContent} from "@nextui-org/popover";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Selection} from "@nextui-org/react";
import {Autocomplete,AutocompleteItem} from "@nextui-org/autocomplete";
import {destination} from "./locationData";



export default function SearchBar() {
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(new Set(["Travelers"]));

  const selectedValue = React.useMemo(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys]
  );

  let [val, setVal] = React.useState<RangeValue<DateValue> | null>(null);
    
  const formatDate = (date: DateValue) =>{
     return `${date.month}/${date.day}/${date.year}`;
  }

  const selectedRange = val ? `${formatDate(val.start)} - ${formatDate(val.end)}` : "Stay Duration";

  const autoColor = ["secondary"];

    return (
   
    <div className="border mx-40 rounded-lg pb-[12px] pt-[20px] mt-[50px] ">
    <center>
      <div className="flex flex-wrap gap-4 items-center justify-center w-full px-1">
        <h1 className="w-full text-xl font-bold flex-1">Quick Search</h1>
        <hr className="w-full border-t-2 border-gray-300 my-2 flex-initial"/>
        
             {autoColor.map((color) =>(
             <Autocomplete 
              className="text-purple-700 flex-initial ms-1 w-80" 
              color = {color}
              key = {color}
              placeholder=""
              label="Destination"
              variant="faded"
              defultItems={destination}
              size="sm"
            >
            {destination.map((location) => (
            <AutocompleteItem 
            className="text-black mt-2"
            key={location.value} 
            value={location.value}>
            {location.label}
            </AutocompleteItem>
          ))}
          </Autocomplete>
        ))}
             
        
        <Popover placement="bottom">
          <PopoverTrigger>
            <Button className="w-[280px]" variant="bordered" color="secondary">{selectedRange}</Button>
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
            <Button className="w-[280px]"  variant="bordered">{selectedValue}</Button>
          </DropdownTrigger>
          <DropdownMenu
           variant="flat"
           disallowEmptySelection
           selectionMode="single"
           selectedKeys={selectedKeys}
           onSelectionChange={setSelectedKeys}
           color="secondary"
           className="text-black"
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
  );
}
   

