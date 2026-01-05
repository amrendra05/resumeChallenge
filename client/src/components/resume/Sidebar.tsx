import { motion } from "framer-motion";
import { Mail, MapPin, Linkedin, Github, Trophy, ExternalLink, Camera, Contact } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
//import { AWARDS } from "@/lib/data";
import { useState, useRef, useEffect } from "react";
import headshotDefault from "/Apps/resumeChallenge/resumeChallenge/attached_assets/generated_images/IMG_3489.png"; // Updated path to match the alias
import { Achievement, Profile } from '../../../../shared/schema';
import { Contacts } from '../../../../shared/schema';
//import { log } from "../../../../server/index";

export function Sidebar() {
  const [headshot, setHeadshot] = useState(headshotDefault);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [contacts, setContacts] = useState<Contacts[]>([]);
  const [loading, setLoading] = useState(true);
  const handlePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setHeadshot(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
/*
  useEffect(() => {
    fetch('/api/profile')  // Or '/api/profile/your-id' if needed
      .then(res => res.json())
      .then(data => setProfile(data))
      .catch(err => console.error(err));
  }, []);
*/

useEffect(() => {
  async function loadData() {
    setLoading(true);
    try {
      const profileRes = await fetch('/api/profile');
      const profileData = await profileRes.json();
     // console.log(`Profile Data: ${profileData._id}`); // Debug log
      setProfile(profileData);

      //setAchievements(profileData.achievements || []);
      const contactsRes = await fetch(`/api/contacts?profileId=${profileData._id}`);
      setContacts(await contactsRes.json());
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  loadData();
}, []);

  if (!profile || contacts.length === 0 ) { 
      return (<div className="min-h-screen bg-background text-foreground font-sans p-4 md:p-8 lg:p-12 flex items-center justify-center">
        Loading...
      </div>); }
  return (
    <motion.aside 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      {/* Profile Section */}
      <div className="flex flex-col items-center text-center space-y-4">
        <div className="relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
          <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-blue-600 rounded-full opacity-75 group-hover:opacity-100 transition duration-500 blur-sm"></div>
          <Avatar className="w-48 h-48 border-4 border-background relative shadow-xl">
            <AvatarImage src={headshot} alt="Profile Picture" className="object-cover" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Camera className="w-8 h-8 text-white" />
          </div>
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handlePictureChange} 
            accept="image/*" 
            className="hidden" 
          />
        </div>
      </div>

      {/* Contact Info */}
      <Card className="overflow-hidden border-none shadow-md bg-card/50 backdrop-blur-sm">
        <CardContent className="p-6 space-y-4">
          <h3 className="font-heading font-semibold text-lg mb-4 text-foreground/80">Contact</h3>
   {
          <div className="space-y-3 text-sm">
            <a href={`mailto:${contacts[0].emailId}`} className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors group">
              <div className="p-2 rounded-md bg-primary/10 group-hover:bg-primary/20 transition-colors">
                <Mail className="w-4 h-4 text-primary" />
              </div>
              <span>{contacts[0].emailId}</span>
            </a>
            
            <div className="flex items-center gap-3 text-muted-foreground group">
              <div className="p-2 rounded-md bg-primary/10 transition-colors">
                <MapPin className="w-4 h-4 text-primary" />
              </div>
              <span>{contacts[0].address}</span>
            </div>

            <Separator className="my-4" />
            
            <div className="flex gap-2 justify-center">
              <Button variant="outline" size="icon" asChild className="rounded-full hover:bg-primary hover:text-primary-foreground transition-all">
                <a href={profile.linkedIn} target="_blank" rel="noopener noreferrer"><Linkedin className="w-4 h-4" /></a>
              </Button>
              <Button variant="outline" size="icon" asChild className="rounded-full hover:bg-primary hover:text-primary-foreground transition-all">
                <a href={profile.githubLink} target="_blank" rel="noopener noreferrer"><Github className="w-4 h-4" /></a>
              </Button>
            </div>
          </div>}
        </CardContent>
      </Card>

      {/* Awards Section */}
      <div className="space-y-4">
        <h3 className="font-heading font-semibold text-lg flex items-center gap-2 px-2">
          <div className="p-1.5 rounded-lg bg-amber-500/20">
            <Trophy className="w-6 h-6 text-amber-500" />
          </div>
          <span>Awards & Recognition</span>
        </h3>
        
        <div className="grid gap-3">
          {achievements.map((award, index) => (
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
