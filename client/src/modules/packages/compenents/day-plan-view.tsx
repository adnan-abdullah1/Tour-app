"use client"

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const daysPlan = [
  {
    title: "Sri Vijaya Puram (Port Blair)",
    description: `Arrive in Port Blair, report to the coach and proceed to hotel. In the evening visit Cellular Museum and Cellular Jail, which stood mute witness to the torture meted out to the freedom fighters, who were incarcerated in this Jail. History awakens as we visit 'Veer Savarkar' Smarak and see the light and sound show.`,
    topping: "Tea at Cellular Jail",
    meal: "Dinner",
  },
  {
    title: "Sri Vijaya Puram (Port Blair) – Swaraj Dweep (Havelock)",
  },
  {
    title: "Swaraj Dweep (Havelock)",
  },
  {
    title: "Swaraj Dweep (Havelock) – Shaheed Dweeep (Neil Island)",
  },
  {
    title: "Shaheed Dweep (Neil Island) - Sri Vijaya Puram (Port Blair)",
  },
  {
    title:
      "Sri Vijaya Puram (Port Blair) – Netaji Subhas Chandra Dweep (Ross Island)",
  },
];

export default function PackageDayPlan() {
  const [openIndex, setOpenIndex] = useState<number[]>([0]);

  const toggleDay = (index: number) => {
    setOpenIndex((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const collapseAll = () => setOpenIndex([]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-900">Days Plan</h2>
        <button
          onClick={collapseAll}
          className="text-[var(--tour-color-primary)] font-medium hover:underline"
        >
          Collapse All
        </button>
      </div>

      {/* Days */}
      {daysPlan.map((day, idx) => {
        const isOpen = openIndex.includes(idx);
        return (
          <div
            key={idx}
            className="border-b py-4 flex flex-col sm:flex-row sm:items-start gap-4"
          >
            {/* Left Circle */}
            <div className="flex items-center justify-center sm:w-24">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-[var(--tour-bg-color-primary)] text-white rounded-full flex items-center justify-center text-xl font-bold">
                  {idx + 1}
                </div>
                <span className="text-xs font-bold text-[var(--tour-color-primary)] mt-1 tracking-widest">
                  DAY
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1">
              <button
                onClick={() => toggleDay(idx)}
                className="flex items-center justify-between w-full text-left"
              >
                <span className="text-base font-semibold text-gray-800">
                  {day.title}
                </span>
                {isOpen ? (
                  <ChevronUp className="w-5 h-5 text-gray-600" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-600" />
                )}
              </button>

              {isOpen && (
                <div className="mt-2 text-sm text-gray-700 space-y-2">
                  {day.description && <p>{day.description}</p>}
                  {day.topping && (
                    <p>
                      <span className="font-bold">Extra Topping: </span>
                      {day.topping}
                    </p>
                  )}
                  {day.meal && (
                    <div className="flex items-center gap-2 mt-2">
                      <img
                        src="https://cdn-icons-png.flaticon.com/512/1046/1046784.png"
                        alt="meal"
                        className="w-5 h-5"
                      />
                      <span className="text-sm font-medium">{day.meal}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

