import { Navbar,   NavbarBrand,   NavbarContent,   NavbarItem } from "@nextui-org/navbar";
import { Link } from "@nextui-org/link";
import { Button } from "@nextui-org/button";
import {Logo} from "./Logo";

export default function NavBar({ children }: { children: React.ReactNode }) {
    return (
        <Navbar>
            <NavbarBrand>
                <Logo />
                <p className="font-bold text-inherit">Hotel Verma</p>
            </NavbarBrand>
            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                <NavbarItem>
                    <Link underline="active" href="/pages/index">
                    Home
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link color="foreground" href="/pages/Hotels">
                    Hotels
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link color="foreground" href="/pages/History">
                    History
                    </Link>
                </NavbarItem>
            </NavbarContent>
            <NavbarContent justify="end">
                <NavbarItem className="hidden lg:flex">
                    <Link href="#">Login</Link>
                </NavbarItem>
                <NavbarItem>
                    <Button as={Link} color="primary" href="#" variant="flat">
                        Sign Up
                    </Button>
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    )
}