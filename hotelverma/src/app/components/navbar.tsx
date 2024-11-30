'use client';

import React, { useState, useEffect } from "react";
import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
} from "@nextui-org/react";
import { Logo } from "./Logo";

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = () => {
      const token = localStorage.getItem("authToken");
      setIsLoggedIn(!!token);
    };

    checkLoginStatus();

    window.addEventListener("storage", checkLoginStatus);

    return () => {
      window.removeEventListener("storage", checkLoginStatus);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken"); 
    setIsLoggedIn(false);
    window.location.href = "/";
    window.location.reload();
  };

  const menuItems = ["Home", "Hotels", "Bookings"];

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

      {/* Navbar links visible on medium and larger screens */}
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {menuItems.map((item) => (
          <NavbarItem key={item}>
            <Link
              underline="active"
              color={item === "Home" ? "warning" : "foreground"}
              href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
            >
              {item}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      {/* Navbar content for login/logout and user actions */}
      <NavbarContent justify="end">
        {isLoggedIn ? (
          <>
            <NavbarItem className="hidden lg:flex">
              <Button as={Link} href="/profile" color="warning" variant="flat">
                Profile
              </Button>
            </NavbarItem>
            <NavbarItem>
              <Button color="danger" onClick={handleLogout} variant="flat">
                Logout
              </Button>
            </NavbarItem>
          </>
        ) : (
          <>
            <NavbarItem className="hidden lg:flex">
              <Link href="/login" color="warning">
                Login
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Button as={Link} color="warning" href="/signup" variant="flat">
                Sign Up
              </Button>
            </NavbarItem>
          </>
        )}
      </NavbarContent>

      {/* Hamburger menu for smaller screens */}
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className="w-full"
              href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
              size="lg"
              color="foreground"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
        {isLoggedIn ? (
          <>
            <NavbarMenuItem>
              <Link className="w-full" href="/profile" size="lg" color="foreground">
                Profile
              </Link>
            </NavbarMenuItem>
            <NavbarMenuItem>
              <Button color="warning" onClick={handleLogout} className="w-full">
                Logout
              </Button>
            </NavbarMenuItem>
          </>
        ) : (
          <>
            <NavbarMenuItem>
              <Link className="w-full" href="/login" size="lg" color="foreground">
                Login
              </Link>
            </NavbarMenuItem>
            <NavbarMenuItem>
              <Link className="w-full" href="/signup" size="lg" color="foreground">
                Sign Up
              </Link>
            </NavbarMenuItem>
          </>
        )}
      </NavbarMenu>
    </Navbar>
  );
}
