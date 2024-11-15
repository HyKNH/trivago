"use client";
import React from "react";
import {Button} from "@nextui-org/button";
import SearchSelect from "./autoComplete"
import Menu from "./dropdownMenu";
import Calendar from "./Calendar"

export default function SearchBar() {
  const colors = [
    "warning",
  ];

    return (
   
    <div className="border mx-40 rounded-lg pb-[12px] pt-[20px] mt-[50px] ">
    <center>
      <div className="flex flex-wrap gap-4 items-center justify-center w-full px-1">
        <h1 className="w-full text-xl font-bold flex-1">Quick Search</h1>
        <hr className="w-full border-t-2 border-gray-300 my-2 flex-initial"/>
        <SearchSelect/>
        <Calendar/>
        <Menu/>
        <Button className="flex-initial w-32 border mr-[20px]" radius="full" color="primary" size ="lg">Search</Button>
      </div>
    </center>
    </div>
  );
}
   

