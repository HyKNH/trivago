import React from "react"
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@nextui-org/react";


export default function Menu (){
    return (


        <Dropdown closeOnSelect>
        <DropdownTrigger>
          <Button 
            variant="bordered" 
            className="w-52 text-black"
            color="warning"
          >
            Travelers
          </Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Static Actions">
          <DropdownItem key="1">1 Traveler</DropdownItem>
          <DropdownItem key="2">2 Travelers</DropdownItem>
          <DropdownItem key="3">3 Travelers</DropdownItem>
        </DropdownMenu>
      </Dropdown>

    );
}