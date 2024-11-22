// app/components/providers.tsx
'use client';

import React from "react";
import { Button, Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Link } from "@nextui-org/react";
import {Logo} from "./Logo";

export default function NavBar() {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const menuItems = [
        "Home",
        "Hotels",
        "History",
    ];

    return (
        <Navbar onMenuOpenChange={setIsMenuOpen}>
            <NavbarContent>
                <NavbarMenuToggle
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    className="sm:hidden"
            />
            <NavbarBrand>
                <Logo />
                <p className="font-bold text-inherit">Hotel Verma</p>
            </NavbarBrand>
            </NavbarContent>
            
            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                <NavbarItem>
                    <Link underline="active" color="warning" href="/">
                    Home
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link color="foreground" href="/hotels">
                    Hotels
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link color="foreground" href="/history">
                    History
                    </Link>
                </NavbarItem>
            </NavbarContent>
            <NavbarContent justify="end">
                <NavbarItem className="hidden lg:flex">
                    <Link href="/login" color="warning">Login</Link>
                </NavbarItem>
                <NavbarItem>
                    <Button as={Link} color="warning" href="/signup" variant="flat">
                        Sign Up
                    </Button>
                </NavbarItem>
            </NavbarContent>
            <NavbarMenu>
                {menuItems.map((item, index) => (
                <NavbarMenuItem key={`${item}-${index}`}>
                <Link
                className="w-full"
                href={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                size="lg"
                color="foreground"
                >
                {item}
                </Link>
                </NavbarMenuItem>
                ))}
            </NavbarMenu>
        </Navbar>
    );
}
