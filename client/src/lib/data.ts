import { Cloud, Shield, Server, Database, Code, Layout, Globe, Cpu } from "lucide-react";

export interface Project {
  id: string;
  title: string;
  client: string;
  clientLogo?: string; // We'll use a placeholder or initials if not provided
  summary: string;
  description: string;
  roles: string[];
  skills: string[];
  year: number;
  type: "Cloud Migration" | "DevOps" | "App Development" | "Security";
}

export const PROJECTS: Project[] = [
  {
    id: "1",
    title: "Enterprise Cloud Migration",
    client: "Global FinTech Corp",
    summary: "Migrated legacy on-premise infrastructure to AWS, achieving 40% cost reduction.",
    description: "Led the migration of a mission-critical trading platform from on-premise data centers to AWS. Designed a multi-region architecture for high availability and disaster recovery.",
    roles: [
      "Designed Landing Zone architecture",
      "Implemented CI/CD pipelines using GitLab CI",
      "Managed cutover strategy and stakeholder communication"
    ],
    skills: ["AWS", "Terraform", "Docker", "Python"],
    year: 2024,
    type: "Cloud Migration"
  },
  {
    id: "2",
    title: "Serverless Microservices API",
    client: "HealthPlus",
    summary: "Built a scalable patient data API using Azure Functions and Cosmos DB.",
    description: "Architected and developed a HIPAA-compliant REST API for handling sensitive patient records. Utilized serverless computing to scale automatically based on traffic spikes.",
    roles: [
      "API Design (OpenAPI/Swagger)",
      "Implemented OAuth2.0 authentication",
      "Optimized database queries for performance"
    ],
    skills: ["Azure", "Node.js", "Cosmos DB", "TypeScript"],
    year: 2023,
    type: "App Development"
  },
  {
    id: "3",
    title: "Kubernetes Cluster Hardening",
    client: "SecureBank",
    summary: "Audited and secured EKS clusters, implementing stricter network policies and IAM roles.",
    description: "Conducted a comprehensive security audit of existing Kubernetes clusters. Implemented OPA Gatekeeper for policy enforcement and hardened container images.",
    roles: [
      "Security Auditing",
      "Implementation of Network Policies",
      "configured IAM integration for Service Accounts"
    ],
    skills: ["Kubernetes", "AWS", "Security", "Go"],
    year: 2023,
    type: "Security"
  },
  {
    id: "4",
    title: "DevOps Pipeline Modernization",
    client: "RetailGiant",
    summary: "Revamped Jenkins pipelines to GitHub Actions, reducing build times by 60%.",
    description: "Modernized the CI/CD infrastructure by migrating from legacy Jenkins servers to GitHub Actions. Introduced caching strategies and parallel execution.",
    roles: [
      "Pipeline Migration",
      "Developer Training",
      "Infrastructure as Code implementation"
    ],
    skills: ["DevOps", "GitHub Actions", "Ansible"],
    year: 2022,
    type: "DevOps"
  },
  {
    id: "5",
    title: "Data Lake Implementation",
    client: "MediaStream",
    summary: "Established a centralized data lake on GCP for analytics and reporting.",
    description: "Designed a data ingestion pipeline using Cloud Pub/Sub and Dataflow. Created a structured data lake in BigQuery for business intelligence dashboards.",
    roles: [
      "Data Architecture",
      "ETL Pipeline Development",
      "Dashboard creation in Looker"
    ],
    skills: ["GCP", "BigQuery", "Python", "Data Engineering"],
    year: 2022,
    type: "Cloud Migration"
  },
  {
    id: "6",
    title: "IoT Fleet Management System",
    client: "LogisticsCo",
    summary: "Developed backend services for tracking 5000+ delivery vehicles in real-time.",
    description: "Built a high-throughput event processing system to handle GPS telemetry data. utilized AWS IoT Core and Kinesis for real-time data streaming.",
    roles: [
      "Backend Development",
      "Real-time System Design",
      "Database Optimization"
    ],
    skills: ["AWS", "IoT", "DynamoDB", "Rust"],
    year: 2021,
    type: "App Development"
  }
];

export const SKILLS = Array.from(new Set(PROJECTS.flatMap(p => p.skills)));

export const YEARS = Array.from(new Set(PROJECTS.map(p => p.year))).sort((a, b) => b - a);

export const CERTIFICATIONS = [
  { name: "AWS Solutions Architect Professional", icon: Cloud, color: "text-orange-500", link: "#" },
  { name: "Azure DevOps Engineer Expert", icon: Server, color: "text-blue-500", link: "#" },
  { name: "Google Professional Cloud Architect", icon: Globe, color: "text-red-500", link: "#" },
  { name: "CKA: Certified Kubernetes Administrator", icon: Cpu, color: "text-blue-400", link: "#" }
];

export const AWARDS = [
  { title: "Cloud Architect of the Year", issuer: "TechCorp Global", year: 2023 },
  { title: "Best Innovation", issuer: "DevOps Summit", year: 2022 }
];
