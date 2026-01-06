import { profile } from "console";
import { sql } from "drizzle-orm";
import { pgTable, text, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export interface Profile {
  id: string;
  fullName: string;
  designation: string;
  role: string;
  imageURL: string;
  introduction: string;
  skills: string[];
  linkedIn: string;
  githubLink: string;
  //description: string;
  //type: "Cloud Migration" | "DevOps" | "App Development" | "Security";
}

export interface Project{
  id: string;
  profileId: string;
  title: string;
  client: string;
  summary: string;
  description: string;
  roles: string[];
  skills: string[];
  beginYear: number;
  endYear: string;
  beginMonth: string;
  endMonth: string;
  type: string;
}

export interface Contacts {
  //id: Types.ObjectId;
  profileId: string;
  emailId: string;
  phone: string;
  address: string;
  //description: string;
  //type: "Cloud Migration" | "DevOps" | "App Development" | "Security";
}

export interface Achievement {
  id: string;
  profileId: string;
  title: string;
  issuer: string;
  year: string;
}

export interface Certification {
  id: string;
  profileId: string;
  name: string;
  icon: string;
  certLink: string;
  color: string;
}

export const PROFILE_SCHEMA_DEF = {
  fullName: String,
  designation: String, //"Senior Cloud Architect & DevOps Engineer",
  role: String, //"Specializing in scalable cloud infrastructure, serverless architectures, and automated delivery pipelines. I turn complex infrastructure problems into elegant, code-defined solutions.",
  email: String, //"alex.cloud@example.com",
  location: String, //"Nieuwegein, The Netherlands",
  githubLink: String, //"https://github.com",
  linkedIn: String, //"https://linkedin.com",
  imageURL: String, //"@assets/generated_images/professional_headshot_of_a_cloud_engineer.png"
  skills: [String]
};
export const CONTACT_SCHEMA_DEF = {
  //id: Types.ObjectId,
  profileId:  String, //"Senior Cloud Architect & DevOps Engineer",
  emailId: String, //"alex.cloud@example.com",
  phone: String, //"Nieuwegein, The Netherlands",
  address: String //"https://github.com",
};

export const PROJECT_SCHEMA_DEF = {
  id: String, // Unique identifier for the project
  profileId: String, //"Unique identifier for the profile",
  title: String, //"Lead consultant for Cloud Migration",
  client: String, //"Customer Inc ",
  summary: String, 
  roles: [String], //"Architect","Lead Developer"
  description: String, 
  skills: [String],
  beginYear: Number,
  beginMonth: String,
  endYear: String,
  endMonth: String,
  type: String //"Cloud Migration" | "DevOps" | "App Development" | "Security"
};

  export const ACHIEVEMENT_SCHEMA_DEF =   {
    id: String, //"1",
    profileId: String, //"Unique identifier for the profile",
    title: String, //"Enterprise Cloud Migration",
    issuer: String, //"Global FinTech Corp",
    year: String, //"Migrated legacy on-premise infrastructure to AWS, achieving 40% cost reduction.",
  };

    export const CERTIFICATION_SCHEMA_DEF =   {
    id: String, //"1",
    color: String, //"#FF5733",
    profileId: String, //"Unique identifier for the profile",
    name: String, //"Enterprise Cloud Migration",
    icon: String, //"Global FinTech Corp",
    certLink: String, //"Migrated legacy on-premise infrastructure to AWS, achieving 40% cost reduction.",
  };