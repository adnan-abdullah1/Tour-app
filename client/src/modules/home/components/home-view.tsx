'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { CalendarIcon, Search, MapPin, Users } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

export default function HomeView() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    destination: '',
    date: undefined as Date | undefined,
    duration: '7 nights',
    guests: '2 adults, 0 children',
  });

  const handleChange = (field: keyof typeof formData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
  };

  const handleDateChange = (date: Date | undefined) => {
    setFormData(prev => ({ ...prev, date }));
  };

  const handleSearch = () => {
    const { destination, date, duration } = formData;

    // const trimmedDestination = destination.trim();
    const startDateEpoch = date ? Math.floor(date.getTime() / 1000) : null; // Date as epoch seconds

    // console.log('Destination:', trimmedDestination);
    // console.log('Start Date (Epoch):', startDateEpoch);
    // console.log('Duration:', duration);
  
    // Example to route with query params:
    router.push(`/packages?location=${encodeURIComponent(destination.trim())}&date=${startDateEpoch}&duration=${encodeURIComponent(duration)}`);
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
        {/* Left Form Card */}
        <div className="flex flex-col gap-4 w-full max-w-lg md:max-w-md">
          <h3 className="text-white text-3xl md:text-4xl text-center md:text-left px-4 md:px-0">
            Compare millions of cheap holidays
          </h3>

          <div className="bg-white text-black rounded-3xl shadow-xl p-6 md:p-10 w-full flex flex-col space-y-8">
            {/* Destination */}
            <div className="space-y-1">
              <p className="text-sm text-gray-500">Where to</p>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Find destinations"
                  value={formData.destination}
                  onChange={handleChange('destination')}
                  className="h-12 md:h-14 pl-12 pr-5 border-gray-300 rounded-xl"
                />
              </div>
            </div>

            {/* Date and Duration */}
            <div className="flex flex-col md:flex-row gap-3">
              {/* Date */}
              <div className="flex-1 space-y-1">
                <p className="text-sm text-gray-500">When</p>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "h-12 md:h-14 w-full justify-start text-left px-5 border-gray-300 rounded-xl",
                        !formData.date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-5 w-5" />
                      {formData.date ? format(formData.date, 'PPP') : 'Select date'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-white rounded-xl shadow-md border border-gray-200">
                    <Calendar
                      mode="single"
                      selected={formData.date}
                      onSelect={handleDateChange}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Duration */}
              <div className="flex-1 space-y-1">
                <p className="text-sm text-gray-500">How long</p>
                <Input
                  value={formData.duration}
                  onChange={handleChange('duration')}
                  className="h-12 md:h-14 px-5 border-gray-300 rounded-xl"
                />
              </div>
            </div>

            {/* Guests */}
            <div className="space-y-1">
              <p className="text-sm text-gray-500">Who</p>
              <div className="relative">
                <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  value={formData.guests}
                  onChange={handleChange('guests')}
                  className="h-12 md:h-14 pl-12 pr-5 border-gray-300 rounded-xl"
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

        {/* Right Ad Card */}
        <div className="hidden md:flex flex-col items-center justify-center bg-pink-100 text-pink-600 rounded-3xl shadow-xl p-10 ml-10 max-w-sm">
          <p className="uppercase text-xs font-bold tracking-widest mb-2">Visit Kashmir</p>
          <h2 className="text-2xl font-bold mb-4 text-center">
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
