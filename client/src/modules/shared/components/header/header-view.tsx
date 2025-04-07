'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Menu, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Packages", href: "/packages" },
  { label: "Contact", href: "/contact" },
];

export default function HeaderView() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 shadow ${
        scrolled ? "bg-[#051036]" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex">
          {/* Logo */}
          <Link href="/" className="text-xl font-bold mr-[30px] text-white">
            Logo
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="text-white  transition"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Desktop Button */}
        <div className="hidden md:block">
          <Button variant={"tour_button_light_outline"} size={"lg"}>
            Sign / Register
          </Button>
        </div>

        {/* Mobile Right: User Icon + Hamburger */}
        <div className="flex items-center gap-4 md:hidden transition">
          <User className="w-5 h-5 text-white" />
          <Sheet>
            <SheetTrigger asChild>
              <button aria-label="Open Menu">
                <Menu className="w-6 h-6 text-white" />
              </button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[250px] bg-white h-screen p-6 transition ease-in duration-400">
              <SheetTitle>
                <VisuallyHidden>Navigation Menu</VisuallyHidden>
              </SheetTitle>
              <div className="flex flex-col gap-4 mt-10">
                {navLinks.map(link => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-gray-800 hover:text-black text-base"
                  >
                    {link.label}
                  </Link>
                ))}
                <Button variant={"tour_button_primary"} size={"lg"}>
                  Sign / Register
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
