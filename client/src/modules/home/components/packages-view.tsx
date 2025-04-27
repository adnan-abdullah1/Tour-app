"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Image from "next/image";

const boardOptions = [
  { label: "All-inclusive", price: "from £429" },
  { label: "Bed & breakfast", price: "from £336" },
  { label: "Full board", price: "from £601" },
  { label: "Half board", price: "from £370" },
  { label: "Room only", price: "from £318" },
  { label: "Self-catering", price: "from £307" },
];

const starOptions = [
  { stars: 5, price: "from £728" },
  { stars: 4, price: "from £336" },
  { stars: 3, price: "from £337" },
  { stars: 2, price: "from £307" },
];

type PackagesViewProps = {
  location: string;
  date: string;
  duration: string;
};

export default function PackagesView({ location, date, duration }: PackagesViewProps) {
  const [selectedBoards, setSelectedBoards] = useState<boolean[]>(Array(boardOptions.length).fill(false));
  const [selectedStars, setSelectedStars] = useState<boolean[]>(Array(starOptions.length).fill(false));
  const [sortOption, setSortOption] = useState("recommendation");
  const [filteredData, setFilteredData] = useState<any[]>([]);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/package?location=${encodeURIComponent(location)}`);
        const data = await res.json();
        console.log('Fetched packages:', data);
        setFilteredData(data); // <-- set the fetched data
      } catch (error) {
        console.error('Error fetching packages:', error);
      }
    };

    fetchPackages();
  }, [location]);

  const toggleAllBoards = () => {
    const allSelected = selectedBoards.every(Boolean);
    setSelectedBoards(Array(boardOptions.length).fill(!allSelected));
  };

  const toggleAllStars = () => {
    const allSelected = selectedStars.every(Boolean);
    setSelectedStars(Array(starOptions.length).fill(!allSelected));
  };

  return (
    <div className="flex flex-col md:flex-row gap-8 p-6 min-h-screen bg-gray-50">

      {/* Sidebar Filters */}
      <aside className="w-full md:w-1/4 space-y-8">
        <h3 className="text-xl font-semibold">Filters</h3>

        <div className="rounded-lg shadow-lg bg-white border-none p-4 space-y-6">
          <Accordion type="multiple" defaultValue={["board", "star"]} className="space-y-4">

            {/* Board Basis */}
            <AccordionItem value="board">
              <AccordionTrigger>Board Basis</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <Button variant="link" className="text-pink-600 text-sm p-0" onClick={toggleAllBoards}>
                    {selectedBoards.every(Boolean) ? "Deselect all" : "Select all"}
                  </Button>
                  <div className="space-y-3">
                    {boardOptions.map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <Checkbox
                            id={`board-${idx}`}
                            checked={selectedBoards[idx]}
                            onCheckedChange={(checked) => {
                              const newSelected = [...selectedBoards];
                              newSelected[idx] = !!checked;
                              setSelectedBoards(newSelected);
                            }}
                          />
                          <label htmlFor={`board-${idx}`} className="text-sm">{item.label}</label>
                        </div>
                        <span className="text-xs text-muted-foreground">{item.price}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Star Rating */}
            <AccordionItem value="star">
              <AccordionTrigger>Star Rating</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <Button variant="link" className="text-pink-600 text-sm p-0" onClick={toggleAllStars}>
                    {selectedStars.every(Boolean) ? "Deselect all" : "Select all"}
                  </Button>
                  <div className="space-y-3">
                    {starOptions.map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <Checkbox
                            id={`star-${idx}`}
                            checked={selectedStars[idx]}
                            onCheckedChange={(checked) => {
                              const newSelected = [...selectedStars];
                              newSelected[idx] = !!checked;
                              setSelectedStars(newSelected);
                            }}
                          />
                          <div className="flex">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <span
                                key={i}
                                className={`text-xl ${i < item.stars ? "text-yellow-400" : "text-gray-300"}`}
                              >
                                ★
                              </span>
                            ))}
                          </div>
                        </div>
                        <span className="text-xs text-muted-foreground">{item.price}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

          </Accordion>
        </div>
      </aside>

      {/* Results Section */}
      <section className="flex-1 space-y-8">

        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="font-bold">We found {filteredData?.length} packages</h1>
          <Select value={sortOption} onValueChange={setSortOption}>
            <SelectTrigger className="w-[220px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recommendation">Our Recommendation</SelectItem>
              <SelectItem value="low-to-high">Price Low to High</SelectItem>
              <SelectItem value="high-to-low">Price High to Low</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Hotel Card */}
        {filteredData.map((card: any) => (
          <Card key={card._id} className="overflow-hidden border-none bg-white p-0">
            <div className="md:flex h-full">

              {/* Hotel Image */}
              <div className="md:w-1/3 relative">
                <div className="relative h-full min-h-[250px]">
                  <Image
                    src={card.imageUrl || "https://gotrip-appdir.vercel.app/img/masthead/1/bg.webp"}
                    alt={card.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Hotel Details */}
              <div className="md:w-2/3 p-6 space-y-6 flex flex-col justify-between">
                <div className="flex justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">{card.title}</h3>
                    <div className="flex gap-1">
                      {Array.from({ length: card.rating || 0 }).map((_, i) => (
                        <span key={i} className="text-yellow-400">★</span>
                      ))}
                    </div>
                    <p className="text-muted-foreground text-sm">{card.location}</p>
                  </div>
                  <div className="flex flex-col items-end">
                    <Badge variant="outline" className="bg-green-600 text-white">
                      {card.reviewScore || "9.0"} Excellent
                    </Badge>
                    <p className="text-xs mt-1 text-muted-foreground">{card.reviews || "1,540 reviews"}</p>
                    <button className="text-pink-600 text-sm mt-2">Share ↗</button>
                  </div>
                </div>

                {/* Offers */}
                <div className="space-y-4">
                
                    <Card  className="bg-[#f9f7f6] p-4 shadow-none">
                      <div className="flex flex-wrap items-center justify-between">
                        <div className="text-sm">
                          <p className="text-muted-foreground">Board basis</p>
                          <p className="font-medium">{card.boardBasis || "Bed & breakfast"}</p>
                        </div>
                        <div className="text-sm">
                          <p className="text-muted-foreground">Dates</p>
                          <p className="font-medium">{formatDate(card?.startDate)} - {formatDate(card?.endDate)}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="text-right">
                            <p className="text-muted-foreground text-xs">Price</p>
                            <p className="text-xl font-bold">{card?.price}</p>
                          </div>
                          <Button className="bg-pink-600 hover:bg-pink-700">
                            View deal
                          </Button>
                        </div>
                      </div>
                    </Card>
                 
                </div>

                {/* Facilities */}
                <div className="flex flex-wrap gap-2 pt-4">
                  {card.facilities?.map((facility: string, idx: number) => (
                    <Badge key={idx} variant="secondary" className="bg-green-100 text-green-700">
                      {facility}
                    </Badge>
                  ))}
                </div>

              </div>

            </div>
          </Card>
        ))}

      </section>
    </div>
  );
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
};