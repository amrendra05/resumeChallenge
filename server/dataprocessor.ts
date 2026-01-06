import mongoose from 'mongoose';
import { CONTACT_SCHEMA_DEF, PROJECT_SCHEMA_DEF, Contacts, Project} from '../shared/schema';
import { ACHIEVEMENT_SCHEMA_DEF, CERTIFICATION_SCHEMA_DEF, Achievement, Certification} from '../shared/schema';


// Connect to MongoDB (add to .env: MONGODB_URI=your_connection_string)
//const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/resumeChallenge';

//console.log('MongoDB connected ${mongoUri}');

/*mongoose.connect(mongoUri)
.then(() => console.log('MongoDB connected'))
.catch(err => console.error(`MongoDB connection error: ${err.message}`));
*/
//const projectSchema = new mongoose.Schema<Project>(PROJECTS_SCHEMA_DEF, {collection: 'profileProjects'});
//const Projects = mongoose.model('Projects', projectSchema);

// Connection to MongoDB already established in server/index.ts. If needed, we can reuse that connection here.

const contactSchema = new mongoose.Schema<Contacts>(CONTACT_SCHEMA_DEF, {collection: 'contacts'});
const Contacts = mongoose.model('Contacts', contactSchema);

const projectSchema = new mongoose.Schema<Project>(PROJECT_SCHEMA_DEF, {collection: 'profileProjects'});
const Projects = mongoose.model('Projects', projectSchema);

const achievementSchema = new mongoose.Schema<Achievement>(ACHIEVEMENT_SCHEMA_DEF, {collection: 'achievements'});
const Achievements = mongoose.model('Achievements', achievementSchema);

const certificationSchema = new mongoose.Schema<Certification>(CERTIFICATION_SCHEMA_DEF, {collection: 'certifications'});
const Certifications = mongoose.model('Certifications', certificationSchema);

export const dataprocessor = {
 /* getProjects: async () => {
    return await Projects.find();
  },
  createProject: async (data: any) => {
    return await Projects.create(data);
  },*/
  getContacts: async (profileId?: string) => {
    //console.log(`Contact function found: in the data processor ${profileId}`); 
   if (profileId) {
     
       //console.log(`Isnide condition ${profileId}`);
       return await Contacts.find({profileId: profileId});
       //console.log(`after db call ${profileId}`);
    }
   // return await Contacts.find();
    return '{ok: "from dataprocessore Contact done"}';
  },

  getProjects: async (profileId?: string) => {
    //console.log(`Contact function found: in the data processor ${profileId}`); 
   if (profileId) {
     
       //console.log(`Isnide condition ${profileId}`);
       return await Projects.find({profileId: profileId});
       //console.log(`after db call ${profileId}`);
    }
   // return await Contacts.find();
    return '{ok: "from dataprocessore Project done"}';
  },

  getAchievements: async (profileId?: string) => {
    //console.log(`Contact function found: in the data processor ${profileId}`); 
   if (profileId) {
     
       //console.log(`Isnide condition ${profileId}`);
       return await Achievements.find({profileId: profileId});
       //console.log(`after db call ${profileId}`);
    }
   // return await Contacts.find();
    return '{ok: "from dataprocessore Achievement done"}';
  },

  getCertification: async (profileId?: string) => {
    //console.log(`Contact function found: in the data processor ${profileId}`); 
   if (profileId) {
     
       //console.log(`Isnide condition ${profileId}`);
       return await Certifications.find({profileId: profileId});
       //console.log(`after db call ${profileId}`);
    }
   // return await Contacts.find();
    return '{ok: "from dataprocessore Certification done"}';
  },

};