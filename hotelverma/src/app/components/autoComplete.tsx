import {Autocomplete, AutocompleteItem} from "@nextui-org/react"


export default function SeachSelect() {
    return (
        <Autocomplete
            label = "Destiantion"
            color="warning"
            variant="bordered"
            className="w-72 flex-initial"
        >
            <AutocompleteItem>hello</AutocompleteItem>

        </Autocomplete>
    );
}