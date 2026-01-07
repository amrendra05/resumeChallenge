import { ProjectCard } from "./ProjectCard";
//import { Project } from "@/lib/data";
//import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Project } from '../../../../shared/schema';

interface ProjectListProps {
 projects: Project[];

}


export function ProjectList({ projects }: ProjectListProps) {
  if (projects.length === 0) {
    return (
      <div className="text-center py-12 border-2 border-dashed rounded-lg bg-muted/30">
        <p className="text-muted-foreground">No projects found matching your criteria.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <AnimatePresence mode="popLayout">
        {projects.map((project: Project) => (
          <ProjectCard key={project._id} projects={[project]} />
        ))}
      </AnimatePresence>
    </div>
  );
}
