'use client';

import { useState, useRef } from 'react';
import { Menu, ChevronDown, ChevronUp, ChevronRight, ArrowLeft } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { DialogTitle } from '@radix-ui/react-dialog';

const navItems = [
  {
    label: 'Holidays',
    submenu: ['Beach Holidays', 'Mountain Trips', 'City Breaks', 'Safari Adventures', 'Cruise Holidays', 'Wildlife Tours', 'Island Getaways']
  },
  {
    label: 'Top Deals',
    submenu: ['International Flights', 'Domestic Flights', 'Charter Flights']
  },
  {
    label: 'Destinations',
    submenu: ['Adventure Tours', 'Luxury Tours', 'Historical Tours']
  },
  {
    label: 'Travel Info',
    submenu: ['Our Story', 'Our Team', 'Careers']
  }
];

export default function HeaderView() {
  const [openMobileSubmenu, setOpenMobileSubmenu] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<number | null>(null);
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = (index: number) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveSubmenu(index);
    setHoveredItem(index);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveSubmenu(null);
      setHoveredItem(null);
    }, 200);
  };

  return (
    <nav className="w-full bg-[var(--tour-bg-color-primary)] text-white p-4 shadow-md relative z-20">
      <div className="flex justify-between items-center max-w-[1400px] mx-auto relative">

        {/* Logo */}
        <div className="text-xl font-bold">YourLogo</div>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex gap-8 items-center">
          {navItems.map((item, index) => (
            <li
              key={index}
              className="cursor-pointer relative flex items-center"
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              {item.label}
              <span className="ml-2">
                {hoveredItem === index ? <ChevronUp /> : <ChevronDown />}
              </span>
            </li>
          ))}
        </ul>

        {/* Desktop Dropdown */}
        {activeSubmenu !== null && (
          <div
            className="absolute left-0 right-0 bg-white text-black shadow-lg z-30 hidden md:block"
            style={{ top: 'calc(100% + 16px)' }}
            onMouseEnter={() => timeoutRef.current && clearTimeout(timeoutRef.current)}
            onMouseLeave={handleMouseLeave}
          >
            <div className="max-w-[1400px] mx-auto p-6" style={{ minHeight: '350px' }}>
              
              {/* Dropdown Header */}
              <div className="w-full py-2 px-4 text-lg font-bold text-[var(--tour-color-primary)]">
                {navItems[activeSubmenu]?.label}
              </div>

              {/* Submenu Items in Columns */}
              <div 
                className="px-4 mt-6 flex flex-wrap gap-x-8 gap-y-4"
              >
                {navItems[activeSubmenu]?.submenu.map((subItem, idx) => (
                  <p
                    key={idx}
                    className="text-[var(--tour-color-primary)] cursor-pointer w-1/4 min-w-[150px] hover:underline transition"
                  >
                    {subItem}
                  </p>
                ))}
              </div>

            </div>
          </div>
        )}

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="text-white" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="bg-white text-black z-50">
              <DialogTitle className="sr-only">Navigation Menu</DialogTitle>

              {/* Mobile Navigation */}
              {!openMobileSubmenu && (
                <div className="flex flex-col gap-4 mt-[60px]">
                  {navItems.map((item, idx) => (
                    <button
                      key={idx}
                      className="flex justify-between items-center w-full text-[var(--tour-color-primary)] py-3 px-4 rounded"
                      onClick={() => {
                        setOpenMobileSubmenu(true);
                        setActiveSubmenu(idx);
                      }}
                    >
                      {item.label} <ChevronRight />
                    </button>
                  ))}
                </div>
              )}

              {/* Mobile Submenu */}
              {openMobileSubmenu && activeSubmenu !== null && (
                <div className="flex flex-col gap-2 mt-6">
                  <button
                    className="flex items-center gap-2 text-black py-2 px-4"
                    onClick={() => {
                      setOpenMobileSubmenu(false);
                      setActiveSubmenu(null);
                    }}
                  >
                    <ArrowLeft /> Back
                  </button>
                  <div className="mt-4 flex flex-col gap-3">
                    <div className="py-2 px-4 text-lg font-bold text-[var(--tour-color-primary)] bg-gray-100">
                      {navItems[activeSubmenu]?.label}
                    </div>
                    {navItems[activeSubmenu]?.submenu.map((subItem, idx) => (
                      <span
                        key={idx}
                        className="py-2 px-4 text-[var(--tour-color-primary)] rounded hover:bg-gray-100 hover:underline transition"
                      >
                        {subItem}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </SheetContent>
          </Sheet>
        </div>

      </div>
    </nav>
  );
}
