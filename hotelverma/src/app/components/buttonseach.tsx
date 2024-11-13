import {Button} from "@nextui-org/button"
import {Autocomplete, AutocompleteItem} from "@nextui-org/react";
import {destination} from "./locationData"

export default function Solution () {
    return (
       <div className="flex w -full flex-wrap md:flex-nowrap gap 4">
            <Autocomplete
            label="destination"
            className=" mt-20 max-w-xs pt-5 border border-purple-500 rounded-xl  "
            color="secondary"
            variant="bordered"
            
            >

            </Autocomplete>
       </div>
    );
}