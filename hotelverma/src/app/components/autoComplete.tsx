import {Autocomplete, AutocompleteItem} from "@nextui-org/react"


export default function SeachSelect() {
    return (
        <Autocomplete
            label = "Destiantion"
            color="warning"
            variant="bordered"
            className="w-52 h-11 border-amber-500 border rounded-2xl border-2"
        >
            <AutocompleteItem key = "1">hello</AutocompleteItem>

        </Autocomplete>
    );
}