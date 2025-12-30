import { motion } from "framer-motion";

interface RangeSliderProps {
  min: number;
  max: number;
  value: number[];
  onChange: (value: number[]) => void;
}

export function RangeSlider({ min, max, value, onChange }: RangeSliderProps) {
  const [startVal, endVal] = value;

  const handleStartChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newStart = Math.min(Number(e.target.value), endVal - 1);
    onChange([newStart, endVal]);
  };

  const handleEndChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEnd = Math.max(Number(e.target.value), startVal + 1);
    onChange([startVal, newEnd]);
  };

  const percentStart = ((startVal - min) / (max - min)) * 100;
  const percentEnd = ((endVal - min) / (max - min)) * 100;

  return (
    <div className="relative h-8">
      <div className="absolute w-full h-1.5 top-1/2 -translate-y-1/2 bg-primary/20 rounded-full" />
      
      <motion.div
        animate={{
          left: `${percentStart}%`,
          right: `${100 - percentEnd}%`
        }}
        className="absolute h-1.5 top-1/2 -translate-y-1/2 bg-primary rounded-full pointer-events-none"
      />

      <input
        type="range"
        min={min}
        max={max}
        value={startVal}
        onChange={handleStartChange}
        className="absolute w-full h-1.5 top-1/2 -translate-y-1/2 pointer-events-none appearance-none bg-transparent rounded-full cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:border [&::-webkit-slider-thumb]:border-primary-foreground [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:bg-primary [&::-moz-range-thumb]:border [&::-moz-range-thumb]:border-primary-foreground [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:shadow-lg [&::-moz-range-thumb]:cursor-pointer"
        style={{ zIndex: startVal > max - 100 ? 5 : 3 }}
      />

      <input
        type="range"
        min={min}
        max={max}
        value={endVal}
        onChange={handleEndChange}
        className="absolute w-full h-1.5 top-1/2 -translate-y-1/2 pointer-events-none appearance-none bg-transparent rounded-full cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:border [&::-webkit-slider-thumb]:border-primary-foreground [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:bg-primary [&::-moz-range-thumb]:border [&::-moz-range-thumb]:border-primary-foreground [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:shadow-lg [&::-moz-range-thumb]:cursor-pointer"
        style={{ zIndex: endVal < min + 100 ? 5 : 4 }}
      />
    </div>
  );
}
