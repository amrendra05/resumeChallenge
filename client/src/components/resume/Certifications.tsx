//import { useState } from "react";
//import { CERTIFICATIONS } from "@/lib/data";
import { useEffect, useState } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { CertificationModal } from "./CertificationModal";
import { motion } from "framer-motion";
import { Certification } from "../../../../shared/schema";
import { Cloud, Server } from "lucide-react";

/* ----------------------------------
   ICON MAP (single source of truth)
----------------------------------- */
const ICONS_MAP = {
  Cloud,
  Server,
} as const;

type IconName = keyof typeof ICONS_MAP;

/* ----------------------------------
   TYPE GUARD (this fixes the error)
----------------------------------- */
function isIconName(icon: string): icon is IconName {
  return icon in ICONS_MAP;
}

export function Certifications() {
  const [selectedCert, setSelectedCert] = useState<number | null>(null);
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const profileRes = await fetch("/api/profile");
        const profileData = await profileRes.json();

        const certsRes = await fetch(
          `/api/certifications?profileId=${profileData._id}`
        );
        const certsData: Certification[] = await certsRes.json();

        if (Array.isArray(certsData)) {
          setCertifications(certsData);
        }
      } catch (err) {
        console.error("Error fetching certifications:", err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  if (loading) return <div>Loading Certifications...</div>;

  return (
    <>
      <div className="flex items-center gap-2">
        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
          Certified:
        </span>

        <TooltipProvider>
          <div className="flex gap-3">
            {certifications.map((cert, index) => {
              const IconComponent =
                cert.icon && isIconName(cert.icon)
                  ? ICONS_MAP[cert.icon]
                  : null;
              return (
                <Tooltip key={cert._id}>
                  <TooltipTrigger asChild>
                    <motion.button
                      onClick={() => setSelectedCert(index)}
                      initial={{ opacity: 0, scale: 0.6 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.08, duration: 0.3 }}
                      whileHover={{ scale: 1.25, y: -4, rotate: 10 }}
                      whileTap={{ scale: 0.9 }}
                      className={`p-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 border cursor-pointer group relative overflow-hidden hover:z-10 ${
                        cert.color || "bg-gray-500"
                      }`}
                    >
                      <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                      <img src={cert.certLink} alt={cert.name} className="w-20 h-20" />
                     {/*IconComponent ? (
                        <IconComponent
                          size={24}
                          strokeWidth={2}
                          className={`${cert.icon}`} // Tailwind color works!
                        />) : <img src={cert.certLink} alt={cert.name} className="w-6 h-6" />*/}
                    </motion.button>
                  </TooltipTrigger>

                  <TooltipContent className="max-w-xs text-xs">
                    <p className="font-semibold">{cert.name}</p>
                    <p className="text-xs opacity-80">
                      Click to view/upload details
                    </p>
                  </TooltipContent>
                </Tooltip>
              );
            })}
          </div>
        </TooltipProvider>
      </div>

      {selectedCert !== null && certifications[selectedCert] && (
        <CertificationModal
          isOpen={true}
          onClose={() => setSelectedCert(null)}
          certName={certifications[selectedCert].name}
          certIconComponent={
            isIconName(certifications[selectedCert].icon)
              ? ICONS_MAP[certifications[selectedCert].icon]
              : Cloud
          }
          certColor={certifications[selectedCert].color}
        />
      )}
    </>
  );
}
