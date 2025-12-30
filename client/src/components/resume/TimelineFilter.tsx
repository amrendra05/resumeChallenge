import { Slider } from "@/components/ui/slider";
import { motion } from "framer-motion";
import { Calendar } from "lucide-react";
import { useState } from "react";

interface TimelineFilterProps {
  years: number[];
  selectedYear: number | null;
  onSelectYear: (year: number | null) => void;
}

export function TimelineFilter({ years, selectedYear, onSelectYear }: TimelineFilterProps) {
  const minYear = Math.min(...years);
  const maxYear = new Date().getFullYear();
  const [sliderValue, setSliderValue] = useState<number[]>(selectedYear ? [selectedYear] : [minYear]);

  const handleSliderChange = (value: number[]) => {
    setSliderValue(value);
    if (value[0] === minYear) {
      onSelectYear(null);
    } else {
      onSelectYear(value[0]);
    }
  };

  return (
    <div className="space-y-6 py-4">
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-primary" />
            <h3 className="font-heading font-semibold text-lg">Filter by Timeline</h3>
          </div>
          <div className="text-sm font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
            {selectedYear ? selectedYear : `${minYear} - ${maxYear}`}
          </div>
        </div>
        <p className="text-xs text-muted-foreground mb-4">Drag to narrow down projects by year</p>
      </div>

      <div className="space-y-4">
        <Slider
          value={sliderValue}
          onValueChange={handleSliderChange}
          min={minYear}
          max={maxYear}
          step={1}
        />
        
        <div className="flex justify-between text-xs text-muted-foreground px-1">
          <span>{minYear}</span>
          <span>{maxYear}</span>
        </div>

        {selectedYear && (
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={() => {
              setSliderValue([minYear]);
              onSelectYear(null);
            }}
            className="w-full py-2 text-sm font-medium text-primary hover:bg-primary/10 rounded-lg transition-colors"
          >
            Clear Filter
          </motion.button>
        )}
      </div>
    </div>
  );
}
