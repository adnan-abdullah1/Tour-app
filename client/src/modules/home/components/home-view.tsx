'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { CalendarIcon, Search, MapPin, Users } from 'lucide-react';

export default function HomeView() {
  const router = useRouter();

  const [destination, setDestination] = useState('');
  const [date, setDate] = useState<Date>();
  const [duration, setDuration] = useState('7 nights');
  const [guests, setGuests] = useState('2 adults, 0 children');

  const handleSearch = () => {
    const trimmedDestination = destination.trim();
    if (trimmedDestination) {
      router.push(`/packages?location=${encodeURIComponent(trimmedDestination)}`);
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background Image */}
      <Image
        src="https://gotrip-appdir.vercel.app/img/masthead/1/bg.webp"
        alt="Background"
        fill
        className="object-cover"
        priority
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[rgba(5,16,54,0.95)] to-[rgba(5,16,54,0.3)] z-[1]" />

      {/* Main Content */}
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-center md:justify-between h-full px-4 py-8 space-y-8 md:space-y-0">
        {/* Left Card */}
        <div className="flex flex-col gap-4 w-full max-w-lg md:max-w-md">
          <h3 className="text-white text-3xl md:text-4xl text-center md:text-left px-4 md:px-0">
            Compare millions of cheap holidays
          </h3>

          <div className="bg-white text-black rounded-3xl shadow-xl p-6 md:p-10 w-full flex flex-col justify-between space-y-8">
            {/* Where to */}
            <div className="space-y-1 relative">
              <p className="text-sm text-gray-500">Where to</p>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 text-gray-400 transform -translate-y-1/2 w-5 h-5" />
                <Input
                  placeholder="Find destinations"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="h-12 md:h-14 text-base pl-12 pr-5 border border-gray-300 rounded-xl"
                />
              </div>
            </div>

            {/* When and How long */}
            <div className="flex flex-col md:flex-row gap-3">
              {/* When */}
              <div className="flex-1 space-y-1">
                <p className="text-sm text-gray-500">When</p>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "h-12 md:h-14 w-full justify-start text-left text-base font-normal px-5 border border-gray-300 rounded-xl",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-5 w-5" />
                      {date ? format(date, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-white rounded-xl shadow-md border border-gray-200">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* How long */}
              <div className="flex-1 space-y-1">
                <p className="text-sm text-gray-500">How long</p>
                <Input
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="h-12 md:h-14 text-base px-5 border border-gray-300 rounded-xl"
                />
              </div>
            </div>

            {/* Who */}
            <div className="space-y-1 relative">
              <p className="text-sm text-gray-500">Who</p>
              <div className="relative">
                <Users className="absolute left-4 top-1/2 text-gray-400 transform -translate-y-1/2 w-5 h-5" />
                <Input
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  className="h-12 md:h-14 text-base pl-12 pr-5 border border-gray-300 rounded-xl"
                />
              </div>
            </div>

            {/* Search Button */}
            <Button
              className="h-14 md:h-16 w-full bg-[#e6005c] hover:bg-[#cc0052] text-white text-lg rounded-xl"
              onClick={handleSearch}
            >
              <Search className="w-5 h-5 mr-2" />
              Search
            </Button>
          </div>
        </div>

        {/* Right Ad Card - hidden on small screens */}
        <div className="hidden md:flex flex-col items-center justify-center bg-pink-100 text-pink-600 rounded-3xl shadow-xl p-10 ml-0 md:ml-10 max-w-sm">
          <p className="uppercase text-xs font-bold tracking-widest mb-2">Visit Kashmir</p>
          <h2 className="text-2xl font-bold mb-4 text-center leading-snug">
            Say yes to a <span className="text-pink-700">Kashmir Adventure!</span>
          </h2>
          <Button className="bg-orange-400 hover:bg-orange-500 text-white px-8 py-4 rounded-full mt-4">
            Check Now!
          </Button>
        </div>
      </div>
    </div>
  );
}
