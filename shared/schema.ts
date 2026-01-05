import { sql } from "drizzle-orm";
import { pgTable, text, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { Types } from "mongoose";
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
  //id: string;
  title: string;
  client: string;
  summary: string;
  description: string;
  roles: string[];
  skills: string[];
  year: number;
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
  //id: Types.ObjectId;
  title: string;
  issuer: string;
  year: string;
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
  address: String, //"https://github.com",
};

export const PROJECTS_SCHEMA_DEF =   {
    //id: String, //"1",
    title: String, //"Enterprise Cloud Migration",
    client: String, //"Global FinTech Corp",
    summary: String, //"Migrated legacy on-premise infrastructure to AWS, achieving 40% cost reduction.",
    description: String, //"Led the migration of a mission-critical trading platform from on-premise data centers to AWS. Designed a multi-region architecture for high availability and disaster recovery.",
    type: String, //"Cloud Migration",
  };

  export const ACHIEVEMENTS_SCHEMA_DEF =   {
    //id: String, //"1",
    title: String, //"Enterprise Cloud Migration",
    issuer: String, //"Global FinTech Corp",
    year: String, //"Migrated legacy on-premise infrastructure to AWS, achieving 40% cost reduction.",
  };