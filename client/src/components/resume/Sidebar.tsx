import { motion } from "framer-motion";
import { Mail, MapPin, Linkedin, Github, Trophy, ExternalLink } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { AWARDS } from "@/lib/data";
import headshot from "@assets/generated_images/professional_headshot_of_a_cloud_engineer.png";

export function Sidebar() {
  return (
    <motion.aside 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      {/* Profile Section */}
      <div className="flex flex-col items-center text-center space-y-4">
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-blue-600 rounded-full opacity-75 group-hover:opacity-100 transition duration-500 blur-sm"></div>
          <Avatar className="w-48 h-48 border-4 border-background relative shadow-xl">
            <AvatarImage src={headshot} alt="Profile Picture" className="object-cover" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
        </div>
      </div>

      {/* Contact Info */}
      <Card className="overflow-hidden border-none shadow-md bg-card/50 backdrop-blur-sm">
        <CardContent className="p-6 space-y-4">
          <h3 className="font-heading font-semibold text-lg mb-4 text-foreground/80">Contact</h3>
          
          <div className="space-y-3 text-sm">
            <a href="mailto:alex.cloud@example.com" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors group">
              <div className="p-2 rounded-md bg-primary/10 group-hover:bg-primary/20 transition-colors">
                <Mail className="w-4 h-4 text-primary" />
              </div>
              <span>alex.cloud@example.com</span>
            </a>
            
            <div className="flex items-center gap-3 text-muted-foreground group">
              <div className="p-2 rounded-md bg-primary/10 transition-colors">
                <MapPin className="w-4 h-4 text-primary" />
              </div>
              <span>San Francisco, CA</span>
            </div>
            
            <Separator className="my-4" />
            
            <div className="flex gap-2 justify-center">
              <Button variant="outline" size="icon" className="rounded-full hover:bg-primary hover:text-primary-foreground transition-all">
                <Linkedin className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="icon" className="rounded-full hover:bg-primary hover:text-primary-foreground transition-all">
                <Github className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="icon" className="rounded-full hover:bg-primary hover:text-primary-foreground transition-all">
                <ExternalLink className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Awards Section */}
      <div className="space-y-4">
        <h3 className="font-heading font-semibold text-lg flex items-center gap-2 px-2">
          <Trophy className="w-5 h-5 text-amber-500" />
          <span>Awards & Recognition</span>
        </h3>
        
        <div className="grid gap-3">
          {AWARDS.map((award, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + (index * 0.1) }}
              whileHover={{ x: 4 }}
            >
              <Card className="border-l-4 border-l-amber-500 shadow-sm hover:shadow-md transition-all bg-gradient-to-r from-amber-50/50 to-transparent dark:from-amber-950/20 dark:to-transparent">
                <CardContent className="p-4">
                  <div className="flex items-start gap-2">
                    <Trophy className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <div className="font-semibold text-foreground">{award.title}</div>
                      <div className="text-sm text-muted-foreground mt-1 flex justify-between">
                        <span>{award.issuer}</span>
                        <Badge className="bg-amber-500/20 text-amber-700 dark:text-amber-400 text-xs font-normal">{award.year}</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.aside>
  );
}
