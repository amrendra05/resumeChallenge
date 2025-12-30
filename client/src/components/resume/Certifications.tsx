import { CERTIFICATIONS } from "@/lib/data";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { motion } from "framer-motion";

export function Certifications() {
  return (
    <div className="w-full py-6 px-4 rounded-lg bg-gradient-to-r from-primary/5 via-blue-500/5 to-primary/5 border border-primary/20 backdrop-blur-sm">
      <div className="text-center mb-4">
        <h3 className="font-heading font-semibold text-sm uppercase tracking-widest text-muted-foreground">Professional Certifications</h3>
      </div>
      <div className="flex flex-wrap gap-3 justify-center">
        <TooltipProvider>
          {CERTIFICATIONS.map((cert, index) => (
            <Tooltip key={index}>
              <TooltipTrigger asChild>
                <motion.a 
                  href={cert.link}
                  initial={{ opacity: 0, scale: 0.8, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                  whileHover={{ scale: 1.2, y: -4, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className={`p-4 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border-2 cursor-pointer group relative overflow-hidden`}
                  style={{
                    background: cert.color.includes('orange') ? 'linear-gradient(135deg, #f97316 0%, #fb923c 100%)' :
                                cert.color.includes('blue-500') ? 'linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%)' :
                                cert.color.includes('red') ? 'linear-gradient(135deg, #dc2626 0%, #ef4444 100%)' :
                                cert.color.includes('blue-400') ? 'linear-gradient(135deg, #60a5fa 0%, #93c5fd 100%)' :
                                'linear-gradient(135deg, #6366f1 0%, #818cf8 100%)',
                    borderColor: 'rgba(255,255,255,0.3)'
                  }}
                >
                  <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <cert.icon className="w-8 h-8 text-white relative z-10" strokeWidth={1.5} />
                </motion.a>
              </TooltipTrigger>
              <TooltipContent className="max-w-xs">
                <p className="font-semibold text-sm">{cert.name}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </TooltipProvider>
      </div>
    </div>
  );
}
