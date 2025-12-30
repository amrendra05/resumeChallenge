import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface TimelineFilterProps {
  years: number[];
  selectedYear: number | null;
  onSelectYear: (year: number | null) => void;
}

export function TimelineFilter({ years, selectedYear, onSelectYear }: TimelineFilterProps) {
  return (
    <div className="space-y-3 py-2">
      <h3 className="font-heading font-semibold text-lg">Timeline</h3>
      <div className="relative flex items-center justify-between w-full h-12 bg-muted/30 rounded-full px-2 border border-border/50">
        <button
          onClick={() => onSelectYear(null)}
          className={cn(
            "relative z-10 px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300",
            selectedYear === null 
              ? "text-primary-foreground" 
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          All Time
          {selectedYear === null && (
            <motion.div
              layoutId="timeline-active"
              className="absolute inset-0 bg-primary rounded-full -z-10 shadow-md"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          )}
        </button>

        {years.map((year) => (
          <button
            key={year}
            onClick={() => onSelectYear(year)}
            className={cn(
              "relative z-10 px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300",
              selectedYear === year 
                ? "text-primary-foreground" 
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {year}
            {selectedYear === year && (
              <motion.div
                layoutId="timeline-active"
                className="absolute inset-0 bg-primary rounded-full -z-10 shadow-md"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
