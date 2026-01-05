import type { Express } from "express";
import { createServer, type Server } from "http";
import {dataprocessor} from "./dataprocessor";
import {log} from "../server/index";
import { ok } from "assert";

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
    log(`Contact function found: ${req.query.profileId}`); 
    const profileId = req.query.profileId as string | undefined;
    log(`Contact function 2nd step: ${profileId}`);
    const contacts = await dataprocessor.getContacts(profileId);
    log(`Profile found: ${!!contacts}`);  // Debug log
    if (!contacts) return res.status(404).json({ message: 'Contact not found' });
    else {
      res.json(contacts);
    }
    
    //res.json({ok: 'done'});
  });

  //log(`In the route: $`); 
  return httpServer;
}
