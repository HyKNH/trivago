// app/page.tsx
import * as React from "react";
import Image from "next/image";
import DatePickerOne from "./components/datepicker";
import {Button} from "@nextui-org/react";

export default function Page() {
  return (
    <div className="">
      <main className="">
        <div className="container">
          <h2 className="header">Quick Search</h2>
          <Button className="item1">Where to?</Button> 
          <DatePickerOne />
          <Button className="item3">Travelers</Button>
          <Button className="item5">Search</Button>
        </div>
      </main>
    </div>
  );
}