# Skool MVP Web

Minimal React frontend for the Skool MVP project. Lists communities, creates new ones, shows posts, and lets you add posts against the existing `skool-mvp-api` backend.

## Quick start (local)

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
- Helm chart: `charts/skool-mvp-web`
- Exposes a Service (LoadBalancer by default) and injects `VITE_API_BASE_URL` via env.
- GitOps/ArgoCD wiring lives in `skool-mvp-gitops` under `applications/skool-mvp-web.yaml` and `environments/dev/skool-mvp-web/values.yaml`.
