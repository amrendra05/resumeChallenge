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
  //description: string;
  //type: "Cloud Migration" | "DevOps" | "App Development" | "Security";
}

export const PROFILE_SCHEMA_DEF = {
  fullName: String,
  designation: String, //"Senior Cloud Architect & DevOps Engineer",
  role: String, //"Specializing in scalable cloud infrastructure, serverless architectures, and automated delivery pipelines. I turn complex infrastructure problems into elegant, code-defined solutions.",
  email: String, //"alex.cloud@example.com",
  location: String, //"Nieuwegein, The Netherlands",
  github: String, //"https://github.com",
  linkedin: String, //"https://linkedin.com",
  imageURL: String, //"@assets/generated_images/professional_headshot_of_a_cloud_engineer.png"
  skills: [String]
};
