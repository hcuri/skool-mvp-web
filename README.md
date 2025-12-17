# Skool MVP Web

Built by **Hector Curi** as a personal project to demonstrate end-to-end DevOps/SRE skills (React, Docker, Kubernetes, Helm, AWS).

Minimal React frontend for the Skool MVP project. Lists communities, creates new ones, shows posts, and lets you add posts against the existing `skool-mvp-api` backend.

## Architecture / Project structure
- `src/` – React app (App, components, API client, styles).
- `charts/skool-mvp-web/` – Helm chart for Deployment/Service/env injection.
- `Dockerfile` – Node build → Nginx static serving.
- `.github/workflows/ci.yaml` – CI/CD (build, push image, bump GitOps).

## How this fits into the Skool MVP
- Frontend code + Helm chart live here.
- API lives in `skool-mvp-api` (https://github.com/hcuri/skool-mvp-api).
- AWS infra (VPC, EKS, RDS) is provisioned from `skool-mvp-infra` (https://github.com/hcuri/skool-mvp-infra).
- GitOps/ArgoCD config and environment values live in `skool-mvp-gitops` (https://github.com/hcuri/skool-mvp-gitops).
- Images are tagged with Git SHAs; ArgoCD rolls deployments by updating values in the GitOps repo.

## Local development / running locally
```bash
npm install
npm run dev
```
- API base URL defaults to `http://localhost:8080`. Override with `VITE_API_BASE_URL`:
  ```bash
  VITE_API_BASE_URL="http://your-api" npm run dev
  ```
- Build for production: `npm run build`
- Preview build locally: `npm run preview`

## API client
- Uses `import.meta.env.VITE_API_BASE_URL` with a fallback to `http://localhost:8080`.
- Calls:
  - `GET /communities`
  - `POST /communities`
  - `GET /communities/{id}/posts`
  - `POST /communities/{id}/posts`

## Docker
Multi-stage build (Node → Nginx):
```bash
docker build -t skool-mvp-web:local .
docker run -p 8081:80 skool-mvp-web:local
```

## Deployment
- Packaged as a Helm chart (`charts/skool-mvp-web`).
- In EKS, ArgoCD pulls the chart from this repo and applies environment-specific values from the GitOps repo: https://github.com/hcuri/skool-mvp-gitops
- Service is `LoadBalancer` by default; `VITE_API_BASE_URL` is injected via chart values.
