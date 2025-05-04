"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";
import { apiEndpoints } from "../../../../../api/api-endpoints";
import apiInstance from "../../../../../api/api-instance";

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

export default function PackagesView({
  location,
  date,
  duration,
}: PackagesViewProps) {
  const [selectedBoards, setSelectedBoards] = useState<boolean[]>(
    Array(boardOptions.length).fill(false)
  );
  const [selectedStars, setSelectedStars] = useState<boolean[]>(
    Array(starOptions.length).fill(false)
  );
  const [sortOption, setSortOption] = useState("recommendation");
  const [filteredData, setFilteredData] = useState<any[]>([]);

  const fetchPackages = async () => {
    try {
      const boardFilters = boardOptions
        .filter((_, idx) => selectedBoards[idx])
        .map((b) => b.label);

      const starFilters = starOptions
        .filter((_, idx) => selectedStars[idx])
        .map((s) => s.stars);

      const query: Record<string, string> = {
        location,
      };

      if (boardFilters.length > 0) {
        query.boards = boardFilters.join(",");
      }

      if (starFilters.length > 0) {
        query.stars = starFilters.join(",");
      }

      const endpoint = apiEndpoints.packageList(query);
    
      const res = await apiInstance.get(endpoint);
      setFilteredData(res.data);
    } catch (error) {
      console.error("Error fetching packages:", error);
    }
  };

  useEffect(() => {
    fetchPackages();
  }, [location, selectedBoards, selectedStars]);

  const toggleAll = (
    current: boolean[],
    setter: React.Dispatch<React.SetStateAction<boolean[]>>
  ) => {
    const allSelected = current.every(Boolean);
    setter(current.map(() => !allSelected));
  };

  const handleCheckboxChange = (
    index: number,
    current: boolean[],
    setter: React.Dispatch<React.SetStateAction<boolean[]>>
  ) => {
    const updated = [...current];
    updated[index] = !updated[index];
    setter(updated);
  };

  return (
    <div className="flex flex-col md:flex-row gap-8 p-6 min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-full md:w-1/4 space-y-8">
        <h3 className="text-xl font-semibold">Filters</h3>
        <div className="bg-white rounded-lg shadow-lg p-4">
          <Accordion type="multiple" defaultValue={["board", "star"]}>
            {/* Board Filter */}
            <AccordionItem value="board">
              <AccordionTrigger>Board Basis</AccordionTrigger>
              <AccordionContent>
                <Button
                  variant="link"
                  className="text-pink-600 text-sm p-0"
                  onClick={() => toggleAll(selectedBoards, setSelectedBoards)}
                >
                  {selectedBoards.every(Boolean) ? "Deselect all" : "Select all"}
                </Button>
                <div className="space-y-3 mt-3">
                  {boardOptions.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Checkbox
                          checked={selectedBoards[idx]}
                          onCheckedChange={() =>
                            handleCheckboxChange(idx, selectedBoards, setSelectedBoards)
                          }
                        />
                        <label className="text-sm">{item.label}</label>
                      </div>
                      <span className="text-xs text-muted-foreground">{item.price}</span>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Star Filter */}
            <AccordionItem value="star">
              <AccordionTrigger>Star Rating</AccordionTrigger>
              <AccordionContent>
                <Button
                  variant="link"
                  className="text-pink-600 text-sm p-0"
                  onClick={() => toggleAll(selectedStars, setSelectedStars)}
                >
                  {selectedStars.every(Boolean) ? "Deselect all" : "Select all"}
                </Button>
                <div className="space-y-3 mt-3">
                  {starOptions.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Checkbox
                          checked={selectedStars[idx]}
                          onCheckedChange={() =>
                            handleCheckboxChange(idx, selectedStars, setSelectedStars)
                          }
                        />
                        <div className="flex">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <span
                              key={i}
                              className={`text-xl ${i < item.stars ? "text-yellow-400" : "text-gray-300"
                                }`}
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
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </aside>

      {/* Main Section */}
      <section className="flex-1 space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="font-bold">
            We found {filteredData?.length ?? 0} packages
          </h1>
          <Select value={sortOption} onValueChange={setSortOption}>
            <SelectTrigger className="w-[220px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recommendation">Our Recommendation</SelectItem>
              <SelectItem value="low-to-high">Price Low to High</SelectItem>
              <SelectItem value="high-to-low">Price High to Low</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Package Cards */}
        {filteredData.map((card: any) => (
          <Card key={card._id} className="bg-white p-0 overflow-hidden">
            <div className="md:flex">
              {/* Image */}
              <div className="md:w-1/3 relative min-h-[250px]">
                <Image
                  src={
                    card.imageUrl ||
                    "https://gotrip-appdir.vercel.app/img/masthead/1/bg.webp"
                  }
                  alt={card.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Details */}
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
                    <Badge className="bg-green-600 text-white">
                      {card.reviewScore || "9.0"} Excellent
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-1">
                      {card.reviews || "1,540 reviews"}
                    </p>
                    <button className="text-pink-600 text-sm mt-2">Share ↗</button>
                  </div>
                </div>

                {/* Offer */}
                <Card className="bg-[#f9f7f6] p-4 shadow-none">
                  <div className="flex flex-wrap justify-between items-center">
                    <div className="text-sm">
                      <p className="text-muted-foreground">Board basis</p>
                      <p className="font-medium">{card.boardBasis || "Bed & breakfast"}</p>
                    </div>
                    <div className="text-sm">
                      <p className="text-muted-foreground">Dates</p>
                      <p className="font-medium">
                        {formatDate(card.startDate)} - {formatDate(card.endDate)}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-right">
                        <p className="text-muted-foreground text-xs">Price</p>
                        <p className="text-xl font-bold">{card.price}</p>
                      </div>
                      <Button className="bg-pink-600 hover:bg-pink-700">
                        View deal
                      </Button>
                    </div>
                  </div>
                </Card>

                {/* Facilities */}
                <div className="flex flex-wrap gap-2 pt-4">
                  {card.facilities?.map((facility: string, idx: number) => (
                    <Badge
                      key={idx}
                      variant="secondary"
                      className="bg-green-100 text-green-700"
                    >
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

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
}
