import { CERTIFICATIONS } from "@/lib/data";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { motion } from "framer-motion";

export function Certifications() {
  return (
    <div className="flex gap-4 items-center">
      <TooltipProvider>
        {CERTIFICATIONS.map((cert, index) => (
          <Tooltip key={index}>
            <TooltipTrigger asChild>
              <motion.a 
                href={cert.link}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className={`p-2.5 rounded-xl bg-background border shadow-sm hover:shadow-md transition-all ${cert.color} bg-opacity-10`}
              >
                <cert.icon className={`w-6 h-6 ${cert.color}`} />
              </motion.a>
            </TooltipTrigger>
            <TooltipContent>
              <p className="font-semibold">{cert.name}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </TooltipProvider>
    </div>
  );
}
