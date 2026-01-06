//import { Project } from "@/lib/data";
import { Project } from '../../../../shared/schema';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Briefcase, Calendar } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { motion } from "framer-motion";

interface ProjectCardProps {
  projects: Project[];
}

export function ProjectCard({ projects }: ProjectCardProps) {
  
  return (
    projects.map((project: Project) => (
    <motion.div
      key={project.id}
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="h-full hover:shadow-lg transition-all duration-300 border-muted bg-white dark:bg-card/50 group overflow-hidden">
        <CardHeader className="p-5 pb-3">
          <div className="flex justify-between items-start mb-2">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
              {project.client.substring(0, 2).toUpperCase()}
            </div>
            <Badge variant="outline" className="font-mono text-xs">{project.beginYear}</Badge>
          </div>
          <CardTitle className="text-lg font-heading leading-tight group-hover:text-primary transition-colors">
            {project.title}
          </CardTitle>
          <CardDescription className="flex items-center gap-1 text-xs mt-1">
            <Briefcase className="w-3 h-3" />
            {project.client}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="p-5 pt-0">
          <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
            {project.summary}
          </p>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {project.skills.slice(0, 3).map(skill => (
              <Badge key={skill} variant="secondary" className="text-[10px] px-1.5 py-0.5 h-5">
                {skill}
              </Badge>
            ))}
            {project.skills.length > 3 && (
              <span className="text-[10px] text-muted-foreground flex items-center">+{project.skills.length - 3} more</span>
            )}
          </div>

          <Dialog>
            <DialogTrigger asChild>
              <Button className="w-full gap-2 group-hover:bg-primary group-hover:text-primary-foreground transition-all" variant="outline" size="sm">
                <Eye className="w-4 h-4" /> View Details
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <div className="flex items-center gap-3 mb-2">
                   <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold text-xl">
                    {project.client.substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <DialogTitle className="text-2xl font-heading">{project.title}</DialogTitle>
                    <DialogDescription className="flex items-center gap-2 mt-1">
                      <Briefcase className="w-4 h-4" /> {project.client} 
                      <span className="mx-1">•</span>
                      <Calendar className="w-4 h-4" /> {project.beginYear}
                    </DialogDescription>
                  </div>
                </div>
              </DialogHeader>
              
              <div className="space-y-6 py-4">
                <div>
                  <h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-2">Project Overview</h4>
                  <p className="leading-relaxed">{project.description}</p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-2">Key Roles & Responsibilities</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      {project.roles.map((role, i) => (
                        <li key={i}>{role}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-2">Tech Stack</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.skills.map((skill) => (
                        <Badge key={skill} variant="secondary">{skill}</Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>
    </motion.div>
    ))
  );
}

