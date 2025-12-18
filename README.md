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

### Backend requirement
- Start the API locally on `http://localhost:8080` (default for `skool-mvp-api`).
- During local dev, Vite proxies API requests (`/communities`, `/healthz`, etc.) to `http://localhost:8080` so the browser stays same-origin and avoids CORS.

### Using a remote API (optional)
You can proxy to a remote API without changing frontend code:
```bash
VITE_API_PROXY_TARGET="https://api.skoo1.com" npm run dev
```

If you explicitly want the frontend to call a different base URL (not recommended unless the API allows CORS), set:
```bash
VITE_API_BASE_URL="https://api.skoo1.com" npm run dev
```
- Build for production: `npm run build`
- Preview build locally: `npm run preview`

## API client
- Uses `import.meta.env.VITE_API_BASE_URL` (optional). Default is same-origin (relative paths).
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
- Service is `ClusterIP` and exposed via ALB Ingress at `https://web.skoo1.com`.
- The ALB routes API paths to the backend so the frontend can use same-origin requests (no CORS).
