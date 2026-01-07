import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface RangeSliderProps {
  min: number;
  max: number;
  value: number[];
  onChange: (value: number[]) => void;
}

export function RangeSlider({ min, max, value, onChange }: RangeSliderProps) {
  const [startVal, endVal] = value;
  const [activeThumb, setActiveThumb] = useState<"start" | "end" | null>(null);

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
    <div className="relative h-12 pt-6">
      {/* Track Background */}
      <div className="absolute w-full h-2 top-1/2 -translate-y-1/2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
        <div className="absolute inset-0 bg-grid-slate-100/50 [mask-image:linear-gradient(0deg,#fff,rgba(255,255,255,0.6))] dark:bg-grid-slate-700/50" />
      </div>
      
      {/* Active Range Highlight */}
      <motion.div
        initial={false}
        animate={{
          left: `${percentStart}%`,
          right: `${100 - percentEnd}%`
        }}
        className="absolute h-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-primary to-blue-600 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.5)] z-10"
      >
        <div className="absolute inset-0 bg-white/20 animate-pulse" />
      </motion.div>

      {/* Start Year Tooltip */}
      <AnimatePresence>
        {activeThumb === "start" && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.5 }}
            animate={{ opacity: 1, y: -35, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.5 }}
            className="absolute z-30 px-2 py-1 bg-primary text-primary-foreground text-[10px] font-bold rounded-md shadow-lg pointer-events-none whitespace-nowrap"
            style={{ left: `${percentStart}%`, transform: 'translateX(-50%)' }}
          >
            {startVal}
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-primary rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* End Year Tooltip */}
      <AnimatePresence>
        {activeThumb === "end" && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.5 }}
            animate={{ opacity: 1, y: -35, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.5 }}
            className="absolute z-30 px-2 py-1 bg-primary text-primary-foreground text-[10px] font-bold rounded-md shadow-lg pointer-events-none whitespace-nowrap"
            style={{ left: `${percentEnd}%`, transform: 'translateX(-50%)' }}
          >
            {endVal}
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-primary rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Invisible inputs for range control */}
      <input
        type="range"
        min={min}
        max={max}
        value={startVal}
        onChange={handleStartChange}
        onMouseDown={() => setActiveThumb("start")}
        onMouseUp={() => setActiveThumb(null)}
        onTouchStart={() => setActiveThumb("start")}
        onTouchEnd={() => setActiveThumb(null)}
        className="absolute w-full h-2 top-1/2 -translate-y-1/2 appearance-none bg-transparent pointer-events-none z-20
          [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 
          [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-primary [&::-webkit-slider-thumb]:rounded-full 
          [&::-webkit-slider-thumb]:shadow-xl [&::-webkit-slider-thumb]:cursor-grab active:[&::-webkit-slider-thumb]:cursor-grabbing
          [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:w-6 [&::-moz-range-thumb]:h-6 
          [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-primary [&::-moz-range-thumb]:rounded-full 
          [&::-moz-range-thumb]:shadow-xl [&::-moz-range-thumb]:cursor-grab active:[&::-moz-range-thumb]:cursor-grabbing"
      />

      <input
        type="range"
        min={min}
        max={max}
        value={endVal}
        onChange={handleEndChange}
        onMouseDown={() => setActiveThumb("end")}
        onMouseUp={() => setActiveThumb(null)}
        onTouchStart={() => setActiveThumb("end")}
        onTouchEnd={() => setActiveThumb(null)}
        className="absolute w-full h-2 top-1/2 -translate-y-1/2 appearance-none bg-transparent pointer-events-none z-20
          [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 
          [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-primary [&::-webkit-slider-thumb]:rounded-full 
          [&::-webkit-slider-thumb]:shadow-xl [&::-webkit-slider-thumb]:cursor-grab active:[&::-webkit-slider-thumb]:cursor-grabbing
          [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:w-6 [&::-moz-range-thumb]:h-6 
          [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-primary [&::-moz-range-thumb]:rounded-full 
          [&::-moz-range-thumb]:shadow-xl [&::-moz-range-thumb]:cursor-grab active:[&::-moz-range-thumb]:cursor-grabbing"
      />
    </div>
  );
}
