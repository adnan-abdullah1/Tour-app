"use client";

import { Card } from "@/components/ui/card";
import Image from "next/image";

export default function HolidaysInspiration() {
  return (
    
    <section className="w-full px-4 sm:px-6 py-10 sm:py-12 flex flex-col gap-12">
      {/* Heading */}
      <div className="text-center max-w-3xl mx-auto flex flex-col gap-4">
        <h1 className="text-3xl sm:text-4xl font-bold">Holiday Inspiration</h1>
        <p className="text-lg sm:text-xl font-semibold">
          At icelolly.com, we compare a wide range of destinations, flights, and hotels to conjure up cheap holiday deals for you to enjoy, time and time again.
        </p>
        <p className="text-base sm:text-lg text-muted-foreground">
          Cheap <span className="text-blue-600 underline cursor-pointer">package holidays</span> offer holidaymakers the chance to get the most out of their next getaway.
          By saving money on the cost of the hotel and flights, you’ll have a lot more to spend on exploring and sightseeing while you&apos;re away.
          Slashing the cost of the journey and accommodation for your next holiday means that your cash can be spent on dining, water sports, and theme parks.
        </p>
      </div>

      {/* Card Section */}
      <Card className="flex flex-col md:flex-row overflow-hidden p-0 border-0 shadow-lg">
        {/* Image */}
        <div className="relative w-full md:w-1/2 h-60 sm:h-80 md:h-auto">
          <Image
            src="https://gotrip-appdir.vercel.app/img/masthead/1/bg.webp"
            alt="Holiday Destination"
            fill
            className="object-cover w-full h-full"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>

        {/* Text Content */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-center gap-4">
          <h2 className="text-2xl sm:text-3xl font-bold">Compare Cheap Holidays</h2>
          <p className="text-base sm:text-lg text-muted-foreground">
            Here at icelolly.com, we provide a fast and easy service, allowing you to compare the best deals from a range of leading holiday providers.
            All packages advertised by our providers are ATOL protected, giving you peace of mind along with an affordable deal.
          </p>
          <p className="text-base sm:text-lg text-muted-foreground">
            Offering a diverse range of sun, city, ski, and cruise holidays, icelolly.com gives customers the ability to search a huge choice of cheap holidays and find the one that&apos;s right for them.
            Whether you&apos;re looking for an all-inclusive beach holiday, a <span className="text-blue-600 underline cursor-pointer">city break</span>, or a last-minute deal, you&apos;re sure to find plenty of offers here.
          </p>
        </div>
      </Card>
      <Card className="flex flex-col-reverse md:flex-row overflow-hidden p-0 border-0 shadow-lg">
        {/* Text Content */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-center gap-4">
          <h2 className="text-2xl sm:text-3xl font-bold">The Best Package Holidays</h2>
          <p className="text-base sm:text-lg text-muted-foreground">
            Here at icelolly.com, we provide a fast and easy service, allowing you to compare the best deals from a range of leading holiday providers.
            All packages advertised by our providers are ATOL protected, giving you peace of mind along with an affordable deal.
          </p>
          <p className="text-base sm:text-lg text-muted-foreground">
            When there’s so much choice for cheap holidays abroad, which destination do you opt for? We always suggest choosing a sunny spot, offering not only glorious sunshine but a range of activities and sights to discover, and one which won’t cost you an arm and a leg when you arrive, either.

            Being one of Europe’s most popular holiday destinations, Spain is certainly a great choice for travellers looking to find cheap holidays on a budget. There are a host of locations to visit here, but many holidaymakers flock to Benidorm, for not only the crystal clear ocean waters and sizzling sunshine but the affordability factor.
          </p>
        </div>

        {/* Image */}
        <div className="relative w-full md:w-1/2 h-60 sm:h-80 md:h-auto">
          <Image
            src="https://gotrip-appdir.vercel.app/img/masthead/1/bg.webp"
            alt="Holiday Destination"
            fill
            className="object-cover w-full h-full"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>
      </Card>


    </section>
  );
}
