'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { CalendarIcon, Search, MapPin, Users, Minus, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

import { travelSearchSchema, TravelSearchFormData } from '@/lib/validation';

export default function HomeView() {
  const router = useRouter();

  const [formData, setFormData] = useState<TravelSearchFormData>({
    destination: '',
    date: new Date(),
    duration: '',
    guests: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof TravelSearchFormData, string>>>({});
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [childAges, setChildAges] = useState<number[]>([]);
  const [isGuestPopoverOpen, setIsGuestPopoverOpen] = useState(false);

  const maxGuests = 9;
  const totalGuests = adults + children;

  const handleChange = (field: keyof TravelSearchFormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
    setErrors(prev => ({ ...prev, [field]: undefined }));
  };

  const handleDateChange = (date: Date | undefined) => {
    setFormData(prev => ({
      ...prev,
      date: date ?? new Date(),
    }));
    setErrors(prev => ({ ...prev, date: undefined }));
  };

  const handleGuestDone = () => {
    const guestSummary = `${adults} adult${adults !== 1 ? 's' : ''}${children > 0 ? `, ${children} child${children !== 1 ? 'ren' : ''}` : ''}`;
    setFormData(prev => ({ ...prev, guests: guestSummary }));

    if (adults > 0) {
      setErrors(prev => ({ ...prev, guests: undefined }));
    }
  };

  const updateChildAge = (index: number, value: number) => {
    const newAges = [...childAges];
    newAges[index] = value;
    setChildAges(newAges);
  };

  const handleSearch = () => {
    const result = travelSearchSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors: Partial<Record<keyof TravelSearchFormData, string>> = {};
      result.error.errors.forEach(err => {
        const field = err.path[0] as keyof TravelSearchFormData;
        fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    const { destination, date, duration } = result.data;
    const startDateEpoch = Math.floor(date.getTime() / 1000);

    router.push(`/packages?location=${encodeURIComponent(destination.trim())}&date=${startDateEpoch}&duration=${duration}`);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <Image
        src="https://gotrip-appdir.vercel.app/img/masthead/1/bg.webp"
        alt="Background"
        fill
        className="object-cover"
        priority
      />

      <div className="absolute inset-0 bg-gradient-to-r from-[rgba(5,16,54,0.95)] to-[rgba(5,16,54,0.3)] z-[1]" />

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-center md:justify-between h-full px-4 py-8 space-y-8 md:space-y-0">
        <div className="flex flex-col gap-4 w-full max-w-lg md:max-w-md">
          <h3 className="text-white text-3xl md:text-4xl text-center md:text-left px-4 md:px-0">
            Compare millions of cheap holidays
          </h3>

          <div className="bg-white text-black rounded-3xl shadow-xl p-6 md:p-10 w-full flex flex-col space-y-8">
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
              {errors?.destination && <p className="text-red-500 text-sm">{errors?.destination}</p>}
            </div>

            <div className="flex flex-col md:flex-row gap-3">
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
                {errors?.date && <p className="text-red-500 text-sm">{errors?.date}</p>}
              </div>

              <div className="flex-1 space-y-1">
                <p className="text-sm text-gray-500">How long</p>
                <div className="relative">
                  <Input
                    placeholder="e.g., 7"
                    value={formData.duration}
                    onChange={handleChange('duration')}
                    className="h-12 md:h-14 px-5 border-gray-300 rounded-xl"
                  />
                  <span className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-500 text-sm">
                    nights
                  </span>
                </div>
                {errors?.duration && <p className="text-red-500 text-sm">{errors?.duration}</p>}
              </div>
            </div>

            <div className="space-y-1">
              <p className="text-sm text-gray-500">Who</p>
              <Popover open={isGuestPopoverOpen} onOpenChange={setIsGuestPopoverOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="h-12 md:h-14 w-full justify-start text-left pl-12 pr-5 border-gray-300 rounded-xl"
                  >
                    <Users className="mr-2 text-gray-400 w-5 h-5" />
                    {formData.guests || 'Select guests'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80 p-4 space-y-4 bg-white rounded-xl shadow-md border border-gray-200">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Adults</span>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="icon" disabled={adults <= 1 || totalGuests <= 1} onClick={() => setAdults(adults - 1)}><Minus className="w-4 h-4" /></Button>
                        <span>{adults}</span>
                        <Button variant="outline" size="icon" disabled={totalGuests >= maxGuests} onClick={() => setAdults(adults + 1)}><Plus className="w-4 h-4" /></Button>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Children</span>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="icon" disabled={children <= 0} onClick={() => { setChildren(children - 1); setChildAges(prev => prev.slice(0, -1)); }}><Minus className="w-4 h-4" /></Button>
                        <span>{children}</span>
                        <Button variant="outline" size="icon" disabled={totalGuests >= maxGuests} onClick={() => { setChildren(children + 1); setChildAges([...childAges, 0]); }}><Plus className="w-4 h-4" /></Button>
                      </div>
                    </div>
                    {children > 0 && (
                      <div className="space-y-2">
                        <p className="text-sm font-medium">Child Ages</p>
                        {Array.from({ length: children }).map((_, i) => (
                          <Input
                            key={i}
                            type="number"
                            placeholder={`Child ${i + 1} age`}
                            min={1}
                            max={17}
                            value={childAges[i] ?? ''}
                            onChange={e => updateChildAge(i, parseInt(e.target.value))}
                            className="w-full h-10 px-3 border-gray-300 rounded-md"
                          />
                        ))}
                      </div>
                    )}
                    <div className="flex justify-between mt-4">
                      <Button variant="ghost" onClick={() => { setAdults(2); setChildren(0); setChildAges([]); setFormData(prev => ({ ...prev, guests: '' })); setIsGuestPopoverOpen(false); }}>Reset</Button>
                      <Button className="bg-[#e6005c] text-white hover:bg-[#cc0052]" onClick={() => { handleGuestDone(); setIsGuestPopoverOpen(false); }}>Done</Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
              {errors?.guests && <p className="text-red-500 text-sm">{errors?.guests}</p>}
            </div>

            <Button
              className="h-14 md:h-16 w-full bg-[#e6005c] hover:bg-[#cc0052] text-white text-lg rounded-xl"
              onClick={handleSearch}
            >
              <Search className="w-5 h-5 mr-2" />
              Search
            </Button>
          </div>
        </div>

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
