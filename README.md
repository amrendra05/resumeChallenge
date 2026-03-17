Scalable Full-Stack Deployment | GCP Cloud Run & Cloud SQL

Engineered a containerized NodeJS application, designing a serverless architecture optimized for Google Cloud Run to achieve automatic scaling and cost-efficiency ($0 idle cost).

**Continuous Deployment Pipeline:** Implemented an automated CI/CD pipeline using Cloud Build triggered by commits to a specific GitHub branch.

**Build & Containerize:** The pipeline automatically builds the NodeJS application, uses a Dockerfile to create a Docker container image, and pushes this image to the Google Artifact Registry.

**Automated Deployment:** Upon successful image creation, the pipeline deploys the new image revision to Cloud Run, ensuring zero-downtime deployments.

**Database Connectivity:** Enabled secure, encrypted communication between Cloud Run and a managed Cloud SQL PostgreSQL/MySQL instance using Cloud SQL Auth Proxy and VPC Service Controls, routing database traffic over a private IP via a VPC Connector.

**Secrets Management:** Integrated Secret Manager to securely manage and access sensitive environment variables (e.g., database credentials) within the Cloud Run application.



