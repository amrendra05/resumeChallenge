import { motion } from "framer-motion";
import { Calendar } from "lucide-react";
import { useState } from "react";
import { RangeSlider } from "./RangeSlider";

interface TimelineFilterProps {
  years: number[];
  selectedYear: number | null;
  onSelectYear: (year: number | null) => void;
}

export function TimelineFilter({ years, selectedYear, onSelectYear }: TimelineFilterProps) {
  const minYear = Math.min(...years);
  const maxYear = new Date().getFullYear();
  const [sliderRange, setSliderRange] = useState<number[]>([minYear, maxYear]);

  const handleSliderChange = (value: number[]) => {
    setSliderRange(value);
    const [startYear, endYear] = value;
    if (startYear === minYear && endYear === maxYear) {
      onSelectYear(null);
    } else {
      onSelectYear(endYear);
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
            {sliderRange[0]} - {sliderRange[1]}
          </div>
        </div>
        <p className="text-xs text-muted-foreground mb-4">Drag either handle to filter projects</p>
      </div>

      <div className="space-y-4">
        <RangeSlider
          min={minYear}
          max={maxYear}
          value={sliderRange}
          onChange={handleSliderChange}
        />
        
        <div className="flex justify-between text-xs text-muted-foreground px-1 font-semibold">
          <span>{minYear}</span>
          <span>{maxYear}</span>
        </div>

        {(sliderRange[0] !== minYear || sliderRange[1] !== maxYear) && (
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={() => {
              setSliderRange([minYear, maxYear]);
              onSelectYear(null);
            }}
            className="w-full py-2 text-sm font-medium text-primary hover:bg-primary/10 rounded-lg transition-colors"
          >
            Reset Timeline
          </motion.button>
        )}
      </div>
    </div>
  );
}
