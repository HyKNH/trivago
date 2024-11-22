import {Autocomplete, AutocompleteItem} from "@nextui-org/react"


export default function SeachSelect() {
    return (
        // Autocomplete is used to get the component to render 
        <Autocomplete
            label = "Destiantion"
           
            variant="bordered"
            className="w-52 h-11 border-amber-500 border rounded-2xl border-2"
        >
            {/*AutocompleteItem is used to add the content that will be rendered by Autocomplete which can be used 
            in two way one is to add items manually which means writting a AutocompleteItem for each item and assigning 
            a unique key or to add item dynamically through the use of some fucntion that would add items based off a data.js file
            */}
            <AutocompleteItem key = "1">hello</AutocompleteItem>
        </Autocomplete>
    );
}