// app/components/PopularLinks.tsx
"use client";

type Section = {
  title: string;
  links: string[];
};

const sections: Section[] = [
  {
    title: "Popular package holiday destinations",
    links: ["Benidorm", "Majorca", "Algarve",  "Turkey"],
  },
  {
    title: "Popular all inclusive holidays",
    links: ["Tenerife", "Lanzarote", "Gran Canaria", "Fuerteventura", "Costa Del Sol"],
  },
];

export default function PopularDestinations() {
  return (
    <section className="w-full px-6 py-12">
      <div className="container space-y-12">
        {sections.map((section, idx) => (
          <div key={idx}>
            <h2 className="text-2xl font-bold mb-6">{section.title}</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {section.links.map((link, linkIdx) => (
                <a
                  key={linkIdx}
                  href="#"
                  className="text-primary border-b border-gray-300 pb-2 text-[var(--tour-color-primary)] transition-colors"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
