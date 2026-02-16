import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { serveStatic } from "./static";
import { createServer } from "http";
import mongoose from 'mongoose';
import { PROFILE_SCHEMA_DEF, Profile } from '../shared/schema';
import 'dotenv/config';  // Add this to load .env
import { SecretManagerServiceClient } from '@google-cloud/secret-manager';
import { error } from "console";

//const { SecretManagerServiceClient } = require('@google-cloud/secret-manager');
// Only create the client when we actually need it
let client: SecretManagerServiceClient | null = null;

function getClient() {
  if (!client) client = new SecretManagerServiceClient();
  return client;
}

export async function getSecret(): Promise<string> {

  const client = new SecretManagerServiceClient();

  const projectId = await client.getProjectId();

  // If config is missing, skip GCP entirely
  if (!projectId) {
    return '';
  }

  const name = `projects/${projectId}/secrets/MONGODB_URI/versions/latest`;
  log(`Getting secret name: ${name}`);
  try {
    // Wrap the API call in a Promise.race with a timeout and full catch
    // This isolates any internal async failures from crashing Node
    const version = await (async () => {
      try {
        const [res] = await client.accessSecretVersion({ name });
        return res;
      } catch (error: any) {
        console.warn("Secret Manager call failed:", error.message || error);
        return null;
      }
    })();

    if (!version?.payload?.data) {
      return '';
    }

    return version.payload.data.toString("utf8");

  } catch (err) {
    // Catch anything that might escape (should be rare)
    console.warn("Unexpected error while getting secret:", err);
    return '';
  }
}

//getSecret();

const app = express();
const httpServer = createServer(app);

declare module "http" {
  interface IncomingMessage {
    rawBody: unknown;
  }
}
export function log(message: string, source = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  console.log(`${formattedTime} [${source}] ${message}`);
}
// Connect to MongoDB (add to .env: MONGODB_URI=your_connection_string)
// const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/resumeChallenge';

//mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/resumeChallenge')


// Define Profile schema (simple model for profile details)
const profileSchema = new mongoose.Schema<Profile>(PROFILE_SCHEMA_DEF, {collection: 'profiles'});
const Profile = mongoose.model('Profile', profileSchema);

// Add profile API route before registerRoutes
app.get('/api/profile/:id?', async (req: Request, res: Response) => {
  try {
    let { id } = req.params;

    if (!id) {
      id = '6956b7cd81a40bf30eb425e7';  // Replace with actual ObjectId
      log(`Using hardcoded id: ${id}`);
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      log(`Invalid ObjectId: ${id}`);
      return res.status(400).json({ message: 'Invalid ObjectId' });
    }
    const profile = await Profile.findById(id);
    log(`Profile found ****: ${!!profile}`);  // Debug log
    if (!profile) return res.status(404).json({ message: 'Profile not found' });
    res.json(profile);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

app.use(
  express.json({
    verify: (req, _res, buf) => {
      req.rawBody = buf;
    },
  }),
);

app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  await registerRoutes(httpServer, app);
  const mongoUri = await getSecret() || process.env.MONGODB_URI || 'mongodb://localhost:27017/resumeChallenge';
  log(`Connecting to MongoDB: ${mongoUri}`);

  mongoose.connect(mongoUri)
  .then(() => log('MongoDB connected'))
  .catch(err => log(`MongoDB connection error: ${err.message}`));

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (process.env.NODE_ENV === "production") {
    serveStatic(app);
  } else {
    const { setupVite } = await import("./vite");
    await setupVite(httpServer, app);
  }

  // ALWAYS serve the app on the port specified in the environment variable PORT
  // Other ports are firewalled. Default to 5000 if not specified.
  // this serves both the API and the client.
  // It is the only port that is not firewalled.
  const port = parseInt(process.env.PORT || "5000", 10);
  httpServer.listen(
    {
      port,
      host: "0.0.0.0",
    //  reusePort: true,
    },
    () => {
      log(`serving on port ${port}`);
    },
  );
})();
