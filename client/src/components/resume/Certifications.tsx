import { CERTIFICATIONS } from "@/lib/data";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { motion } from "framer-motion";

export function Certifications() {
  return (
    <div className="flex items-center gap-1">
      <span className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">Certified:</span>
      <TooltipProvider>
        <div className="flex gap-2">
          {CERTIFICATIONS.map((cert, index) => (
            <Tooltip key={index}>
              <TooltipTrigger asChild>
                <motion.a 
                  href={cert.link}
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.08, duration: 0.3 }}
                  whileHover={{ scale: 1.3, y: -3, rotate: 8 }}
                  whileTap={{ scale: 0.85 }}
                  className="p-2 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 border cursor-pointer group relative overflow-hidden"
                  style={{
                    background: cert.color.includes('orange') ? 'linear-gradient(135deg, #f97316 0%, #fb923c 100%)' :
                                cert.color.includes('blue-500') ? 'linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%)' :
                                cert.color.includes('red') ? 'linear-gradient(135deg, #dc2626 0%, #ef4444 100%)' :
                                cert.color.includes('blue-400') ? 'linear-gradient(135deg, #60a5fa 0%, #93c5fd 100%)' :
                                'linear-gradient(135deg, #6366f1 0%, #818cf8 100%)',
                    borderColor: 'rgba(255,255,255,0.3)'
                  }}
                >
                  <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                  <cert.icon className="w-5 h-5 text-white relative z-10" strokeWidth={1.5} />
                </motion.a>
              </TooltipTrigger>
              <TooltipContent className="max-w-xs text-xs">
                <p className="font-semibold">{cert.name}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      </TooltipProvider>
    </div>
  );
}
