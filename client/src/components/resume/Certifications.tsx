import { useState } from "react";
import { CERTIFICATIONS } from "@/lib/data";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { CertificationModal } from "./CertificationModal";
import { motion } from "framer-motion";

export function Certifications() {
  const [selectedCert, setSelectedCert] = useState<number | null>(null);

  return (
    <>
      <div className="flex items-center gap-2">
        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">Certified:</span>
        <TooltipProvider>
          <div className="flex gap-3">
            {CERTIFICATIONS.map((cert, index) => (
              <Tooltip key={index}>
                <TooltipTrigger asChild>
                  <motion.button 
                    onClick={() => setSelectedCert(index)}
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.08, duration: 0.3 }}
                    whileHover={{ scale: 1.25, y: -4, rotate: 10 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 border cursor-pointer group relative overflow-hidden hover:z-10"
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
                    <cert.icon className="w-10 h-10 text-white relative z-10" strokeWidth={1.5} />
                  </motion.button>
                </TooltipTrigger>
                <TooltipContent className="max-w-xs text-xs">
                  <p className="font-semibold">{cert.name}</p>
                  <p className="text-xs opacity-80">Click to view/upload details</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </div>
        </TooltipProvider>
      </div>

      {selectedCert !== null && CERTIFICATIONS[selectedCert] && (
        <CertificationModal
          isOpen={true}
          onClose={() => setSelectedCert(null)}
          certName={CERTIFICATIONS[selectedCert].name}
          certIconComponent={CERTIFICATIONS[selectedCert].icon}
          certColor={CERTIFICATIONS[selectedCert].color}
        />
      )}
    </>
  );
}
