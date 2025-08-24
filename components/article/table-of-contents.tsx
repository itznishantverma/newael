"use client";

import { cn } from "@/lib/utils";

interface TableOfContentsProps {
  activeSection: string;
}

const sections = [
  { id: "introduction", title: "Introduction" },
  { id: "current-landscape", title: "The Current AI Landscape" },
  { id: "transforming-industries", title: "Transforming Industries" },
  { id: "challenges", title: "Challenges and Considerations" },
  { id: "future-predictions", title: "Future Predictions" },
  { id: "conclusion", title: "Conclusion" }
];

export default function TableOfContents({ activeSection }: TableOfContentsProps) {
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="bg-card p-6 rounded-lg">
      <h3 className="text-lg font-bold mb-4">Table of Contents</h3>
      <nav>
        <ul className="space-y-3">
          {sections.map((section) => (
            <li key={section.id}>
              <button
                onClick={() => scrollToSection(section.id)}
                className={cn(
                  "text-sm transition-colors hover:text-primary w-full text-left",
                  activeSection === section.id ? "text-primary font-medium" : "text-muted-foreground"
                )}
              >
                {section.title}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}