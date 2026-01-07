import type { Express } from "express";
import { createServer, type Server } from "http";
import {dataprocessor} from "./dataprocessor";
import { log } from "server";


export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // put application routes here
  // prefix all routes with /api

  // use storage to perform CRUD operations on the storage interface
  // e.g. storage.insertUser(user) or storage.getUserByUsername(username)
 /* app.get("/api/projects", async (req, res) => {
    const projects = await dataprocessor.getProjects();
    res.json(projects);
  });
   */
    app.get("/api/contacts/:profileId?", async (req, res) => {
    //log(`Contact function found: ${req.query.profileId}`); 
    const profileId = req.query.profileId as string | undefined;
    //log(`Contact function 2nd step: ${profileId}`);
    const contacts = await dataprocessor.getContacts(profileId);
    //log(`Profile found: ${!!contacts}`);  // Debug log
    if (!contacts) return res.status(404).json({ message: 'Contact not found' });
    else {
     // HTTP response got to calling TSX   
     res.json(contacts);
    }
        //res.json({ok: 'done'});
  });

    app.get("/api/projects/:profileId?", async (req, res) => {
          //log(`Contact function found: ${req.query.profileId}`); 
       const profileId = req.query.profileId as string | undefined;
          //log(`Contact function 2nd step: ${profileId}`);
      const projects = await dataprocessor.getProjects(profileId);
    //log(`Profile found: ${!!projects}`);  // Debug log
       if (!projects) return res.status(404).json({ message: 'Project not found' });
       else {
        // HTTP response got to calling TSX  res.json(projects);
        res.json(projects);
       }
        //res.json({ok: 'done'});
  });

    app.get("/api/achievements/:profileId?", async (req, res) => {
          //log(`Contact function found: ${req.query.profileId}`); 
       const profileId = req.query.profileId as string | undefined;
          //log(`Contact function 2nd step: ${profileId}`);
      const achievements = await dataprocessor.getAchievements(profileId);
    //log(`Profile found: ${!!achievements}`);  // Debug log
       if (!achievements) return res.status(404).json({ message: 'Achievement not found' });
       else {
         // HTTP response got to calling TSX   
         res.json(achievements);
       }
        //res.json({ok: 'done'});
  });

    app.get("/api/certifications/:profileId?", async (req, res) => {
          log(`Contact function found: ${req.query.profileId}`); 
       const profileId = req.query.profileId as string | undefined;
          log(`Contact function 2nd step: ${profileId}`);
      const certifications = await dataprocessor.getCertification(profileId);
    //log(`Profile found: ${!!certifications}`);  // Debug log
       if (!certifications) return res.status(404).json({ message: 'Certification not found' });
       else {
        // HTTP response got to calling TSX    res.json(certifications);
        res.json(certifications);
       }
        //res.json({ok: 'done for certitication'});
  });

     app.get("/id/:profileId?", async (req, res) => {
          log(`Contact function found: ${req.query.id}`); 
       let profileId = req.query.profileId as string | undefined;
          log(`Contact function 2nd step: ${profileId}`);
       if (!profileId) {
            profileId = '6956b7cd81a40bf30eb425e7';  // Replace with actual ObjectId
            log(`Using hardcoded id: ${profileId}`);
          }
         const profile = await dataprocessor.getProfile(profileId);
         //log(`Profile found: ${!!profile}`);  // Debug log
       if (!profile) return res.status(404).json({ message: 'Profile not found' });
       else {
        // HTTP response got to calling TSX    res.json(certifications);
        res.json(profile);  
       }
        //res.json({ok: 'done for certitication'});
  }); 
  //log(`In the route: $`); 
  return httpServer;
}
