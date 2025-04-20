'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search } from 'lucide-react';

export default function HomeView() {
  const [location, setLocation] = useState('');
  const router = useRouter();

  const handleSearch = () => {
    const trimmedLocation = location.trim();
    if (trimmedLocation) {
      router.push(`/packages?location=${encodeURIComponent(trimmedLocation)}`);
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background Image */}
      <Image
        src="https://gotrip-appdir.vercel.app/img/masthead/1/bg.webp"
        alt="home"
        fill
        className="object-cover"
        priority
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[rgba(5,16,54,0.95)] to-[rgba(5,16,54,0.3)] z-[1]" />

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-white text-center">
        <h1 className="text-3xl md:text-5xl font-bold mb-2">Find Next Place To Visit</h1>
        <p className="text-sm md:text-base mb-6">Discover amazing places at exclusive deals</p>

        {/* Tabs */}
        {/* <Tabs defaultValue="hotel" className="mb-6">
          <TabsList className="bg-transparent flex-wrap justify-center gap-2">
            {["Packages", "Car", "Cruise", "Flights"].map((tab) => (
              <TabsTrigger
                key={tab}
                value={tab.toLowerCase().replace(/\s+/g, '-')}
                className="text-white/80 hover:text-white data-[state=active]:border-b-2 border-white px-2 text-sm"
              >
                {tab}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs> */}

        {/* Search Form */}
        <div className="w-full max-w-5xl bg-white/10 backdrop-blur-xl rounded-2xl p-4 md:p-6 grid gap-4 md:grid-cols-4 md:items-center shadow-lg border border-white/20 text-white">
          {/* Location */}
          <div className="text-left">
            <p className="text-sm font-semibold">Location</p>
            <Input
              placeholder="Where are you going?"
              className="mt-1 text-white placeholder-white/60 bg-transparent border-white/30 focus:ring-white"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSearch();
              }}
            />
          </div>

          {/* Dates */}
          <div className="text-left">
            <p className="text-sm font-semibold">Check in - Check out</p>
            <p className="mt-1 text-sm text-white/70">April 05 ~ May 14</p>
          </div>

          {/* Guest */}
          <div className="text-left">
            <p className="text-sm font-semibold">Guest</p>
            <p className="mt-1 text-sm text-white/70">2 adults · 1 children · 1 room</p>
          </div>

          {/* Search Button */}
          <div className="flex justify-center md:justify-end">
            <Button
              variant="ghost"
              className="w-full md:w-auto text-white border border-white/30 hover:bg-white/10"
              onClick={handleSearch}
            >
              <Search className="w-4 h-4 mr-2" />
              Search
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
