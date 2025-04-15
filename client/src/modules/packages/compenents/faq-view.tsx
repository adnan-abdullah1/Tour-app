"use client"
import { useState } from 'react';

const faqs = [
  "What do I need to hire a car?",
  "How old do I have to be to rent a car?",
  "Can I book a hire car for someone else?",
  "How do I find the cheapest car hire deal?",
  "What should I look for when I'm choosing a car?"
];

export default function PackageFaqs() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Heading */}
        <div className="lg:w-1/3">
          <h2 className="text-2xl font-semibold text-gray-900">
            FAQs about <br />
            <span className="text-blue-900 font-bold">The Crown Hotel</span>
          </h2>
        </div>

        {/* Right FAQs */}
        <div className="lg:w-2/3 space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border rounded-md shadow-sm overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between px-4 py-4 text-left text-sm font-medium text-gray-900 bg-white hover:bg-gray-50"
              >
                <span>{faq}</span>
                <span className="text-xl font-bold">
                  {openIndex === index ? '-' : '+'}
                </span>
              </button>
              {openIndex === index && (
                <div className="px-4 pb-4 text-gray-600 text-sm">
                  {/* Replace with actual answer */}
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
