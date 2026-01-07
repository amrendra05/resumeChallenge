import { useState, useMemo } from "react";
import { Sidebar } from "@/components/resume/Sidebar";
import { SkillsFilter } from "@/components/resume/SkillsFilter";
import { TimelineFilter } from "@/components/resume/TimelineFilter";
import { ProjectList } from "@/components/resume/ProjectList";
import { Certifications } from "@/components/resume/Certifications";
import { YEARS } from "@/lib/data";
import { downloadResumePDF } from "@/lib/pdfExport";
import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect } from 'react';
import { Profile, Certification, Project } from '../../../shared/schema';

/*
interface Profile {
  fullName: String,
  designation: String,
  role: String,
  imageURL: String,
  introduction: String,
  skills: {
    type: [String],
    default: []
  }
}*/

export default function Home() {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedYearRange, setSelectedYearRange] = useState<[number, number] | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [certification, setCertification] = useState<Certification | null>(null);
  const [loading, setLoading] = useState(true);
  // Add useEffect to fetch profile (if not already present)
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

      const projectsRes = await fetch(`/api/projects?profileId=${profileData._id}`);
      setProjects(await projectsRes.json());

      //const certificationsRes = await fetch(`/api/certifications?profileId=${profileData._id}`);
      //setCertification(await certificationsRes.json());

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  loadData();
}, []);
  const toggleSkill = (skill: string) => {
    setSelectedSkills(prev => 
      prev.includes(skill) 
        ? prev.filter(s => s !== skill) 
        : [...prev, skill]
    );
  };

  const filteredProjects = useMemo(() => {
    return projects?.filter((project: Project) => {
      const matchesYear = selectedYearRange 
        ? project.beginYear >= selectedYearRange[0] && project.beginYear <= selectedYearRange[1]
        : true;
      const matchesSkills = selectedSkills.length > 0 
        ? selectedSkills.every(skill => project.skills.includes(skill))
        : true;
      return matchesYear && matchesSkills;
    });
  }, [projects, selectedYearRange, selectedSkills]);
  // Add loading check to prevent null access
  if (!profile ) { 
      return (<div className="min-h-screen bg-background text-foreground font-sans p-4 md:p-8 lg:p-12 flex items-center justify-center">
        Loading...
      </div>); }

  return (
    <div className="min-h-screen bg-background text-foreground font-sans p-4 md:p-8 lg:p-12">
      <div className="max-w-7xl mx-auto">
        {/* Download Button - Top Right */}
        <div className="flex justify-end mb-6">
          <Button 
            onClick={downloadResumePDF}
            variant="outline"
            className="gap-2 hover:bg-primary hover:text-primary-foreground transition-colors"
            data-testid="button-download-pdf"
          >
            <Download className="w-4 h-4" />
            Download PDF
          </Button>
        </div>

        <div id="resume-content" className="grid lg:grid-cols-[300px_1fr] gap-8 lg:gap-16">
        
          {/* Left Column - Fixed on desktop, scrollable on mobile */}
          <div className="lg:sticky lg:top-12 lg:h-[calc(100vh-6rem)]">
            <Sidebar />
          </div>

          {/* Right Column - Main Content */}
          <motion.main 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-10"
          >
          {/* Section 1: Header */}
          <section className="space-y-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-heading font-bold tracking-tight text-foreground">
                {profile.fullName}
              </h1>
              <h2 className="text-xl md:text-2xl text-muted-foreground font-medium mt-2">
                {profile.designation}
              </h2>
            </div>
            
            <p className="text-lg leading-relaxed text-foreground/80 max-w-2xl">
              {profile.introduction}
            </p>

           <Certifications />
          </section>

          {/* Section 2: Skills Filter */}
          <section>
            <SkillsFilter 
              allSkills={profile.skills} 
              selectedSkills={selectedSkills} 
              onToggleSkill={toggleSkill} 
            />
          </section>

          {/* Section 3: Timeline Filter */}
          <section>
            <TimelineFilter 
              years={YEARS} 
              onSelectRange={setSelectedYearRange} 
            />
          </section>

          {/* Section 4: Projects List */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-heading font-semibold text-2xl">Projects</h3>
              <span className="text-sm text-muted-foreground">
                Showing {filteredProjects.length} projects
              </span>
            </div>
            <ProjectList projects={filteredProjects} />
          </section>

        </motion.main>
        </div>
      </div>
    </div>
  );
 
}
  
