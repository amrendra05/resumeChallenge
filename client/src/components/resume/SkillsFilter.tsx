import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface SkillsFilterProps {
  allSkills: string[];
  selectedSkills: string[];
  onToggleSkill: (skill: string) => void;
}

export function SkillsFilter({ allSkills, selectedSkills, onToggleSkill }: SkillsFilterProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="font-heading font-semibold text-lg">Filter by Skills</h3>
        {selectedSkills.length > 0 && (
          <button 
            onClick={() => selectedSkills.forEach(s => onToggleSkill(s))}
            className="text-xs text-primary hover:underline"
          >
            Clear all
          </button>
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        {allSkills.map((skill) => {
          const isSelected = selectedSkills.includes(skill);
          return (
            <motion.button
              key={skill}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onToggleSkill(skill)}
              className={cn(
                "inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                isSelected 
                  ? "border-transparent bg-primary text-primary-foreground hover:bg-primary/80" 
                  : "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80"
              )}
            >
              {skill}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
