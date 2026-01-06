import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Upload, X, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

interface CertificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  certName: string;
  certIconComponent: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  certColor: string;
}

export function CertificationModal({ isOpen, onClose, certName, certIconComponent: IconComponent, certColor }: CertificationModalProps) {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Certification Details</DialogTitle>
          <DialogDescription>Upload or view certification information</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <div
              className={`p-4 rounded-2xl shadow-md border-2 ${certColor}`}
              style={{
                background: certColor.includes('orange') ? 'linear-gradient(135deg, #f97316 0%, #fb923c 100%)' :
                            certColor.includes('blue-500') ? 'linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%)' :
                            certColor.includes('red') ? 'linear-gradient(135deg, #dc2626 0%, #ef4444 100%)' :
                            certColor.includes('blue-400') ? 'linear-gradient(135deg, #60a5fa 0%, #93c5fd 100%)' :
                            'linear-gradient(135deg, #6366f1 0%, #818cf8 100%)',
                borderColor: 'rgba(255,255,255,0.3)'
              }}
            >
              <IconComponent className="w-8 h-8 text-white" strokeWidth={1.5} />
            </div>
            <div>
              <h3 className="font-semibold text-lg">{certName}</h3>
              <p className="text-sm text-muted-foreground">Click icon to add/update</p>
            </div>
          </div>

          {uploadedImage && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative rounded-lg overflow-hidden border-2 border-primary/20"
            >
              <img
                src={uploadedImage}
                alt="Certification"
                className="w-full h-48 object-cover"
              />
              <button
                onClick={() => setUploadedImage(null)}
                className="absolute top-2 right-2 p-1 bg-destructive text-destructive-foreground rounded-full hover:bg-destructive/90"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          )}

          <div className="space-y-2">
            <label className="block text-sm font-semibold">Certification Badge/Certificate</label>
            <div className="relative">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="cert-upload"
              />
              <label
                htmlFor="cert-upload"
                className="flex items-center justify-center gap-2 w-full py-6 border-2 border-dashed border-primary/30 rounded-lg hover:border-primary/60 hover:bg-primary/5 cursor-pointer transition-colors"
              >
                <Upload className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-muted-foreground">
                  {uploadedImage ? "Change" : "Upload"} Certificate Image
                </span>
              </label>
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              className="flex-1 gap-2"
              onClick={() => {
                window.open("#", "_blank");
              }}
            >
              <ExternalLink className="w-4 h-4" />
              View Credential
            </Button>
            <Button
              onClick={onClose}
              className="flex-1"
            >
              Done
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}