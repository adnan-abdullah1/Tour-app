// app/components/FeaturesSlider.tsx
"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import { Card } from "@/components/ui/card";
import { Tag, ShieldCheck, Handshake } from "lucide-react";

const features = [
  {
    icon: <Tag className="text-white size-7" />,
    title: "Compare cheap package holidays",
    description: "Find your perfect getaway",
  },
  {
    icon: <ShieldCheck className="text-white size-7" />,
    title: "ATOL protected",
    description: "Book your break with confidence",
  },
  {
    icon: <Handshake className="text-white size-7" />,
    title: "Partnered with 20+ trusted brands",
    description: "Search from the UK’s top travel providers",
  },
];

export default function FeaturesSlider() {
  return (
    <section className="w-full bg-[#f9f7f6] py-12">
      <div className="container">
        {/* Desktop View */}
        <div className="hidden md:flex justify-center items-center gap-8">
          {features.map((feature, idx) => (
            <FeatureCard key={idx} {...feature} />
          ))}
        </div>

        {/* Mobile View */}
        <div className="block md:hidden">
          <Swiper
            slidesPerView={1}
            pagination={{ clickable: true }}
            modules={[Pagination]}
            className="w-4/5 mx-auto"
          >
            {features.map((feature, idx) => (
              <SwiperSlide key={idx}>
                <FeatureCard {...feature} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <Card className="flex flex-row items-center gap-4 p-4 w-full max-w-md shadow-none border-0 bg-transparent">
      <div className="bg-[#db0054] p-3 rounded-full flex items-center justify-center shrink-0">
        {icon}
      </div>
      <div className="flex-1 text-start">
        <h4 className="text-lg font-semibold">{title}</h4>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </Card>
  );
}
