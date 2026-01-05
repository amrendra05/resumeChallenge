import { ObjectId } from "mongodb";
import mongoose from 'mongoose';
//import { PROJECTS_SCHEMA_DEF, Project } from '../shared/schema';
import { CONTACT_SCHEMA_DEF, Contacts } from '../shared/schema';
//import { log } from "./index";

// Connect to MongoDB (add to .env: MONGODB_URI=your_connection_string)
//const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/resumeChallenge';

//console.log('MongoDB connected ${mongoUri}');

/*mongoose.connect(mongoUri)
.then(() => console.log('MongoDB connected'))
.catch(err => console.error(`MongoDB connection error: ${err.message}`));
*/
//const projectSchema = new mongoose.Schema<Project>(PROJECTS_SCHEMA_DEF, {collection: 'profileProjects'});
//const Projects = mongoose.model('Projects', projectSchema);

const contactSchema = new mongoose.Schema<Contacts>(CONTACT_SCHEMA_DEF, {collection: 'contacts'});
const Contacts = mongoose.model('Contacts', contactSchema);

export const dataprocessor = {
 /* getProjects: async () => {
    return await Projects.find();
  },
  createProject: async (data: any) => {
    return await Projects.create(data);
  },*/
  getContacts: async (profileId?: string) => {
    console.log(`Contact function found: in the data processor ${profileId}`); 
   if (profileId) {
     
       console.log(`Isnide condition ${profileId}`);
       return await Contacts.find({profileId: profileId});
       //console.log(`after db call ${profileId}`);
    }
   // return await Contacts.find();
    return '{ok: "from dataprocessore done"}';
  },

};