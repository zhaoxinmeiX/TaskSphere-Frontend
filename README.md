# TaskSphere Frontend

TaskSphere frontend is built with Vite + React.

## Local Development

```bash
npm install
npm run dev
```

Default development URL: `http://localhost:5173`

The API base URL comes from `VITE_API_URL`. If it is not provided, the app falls back to `http://localhost:8000/api`.

## Docker Development Environment

- Based on `node:20-alpine`
- Starts the container with `npm run dev -- --host`
- Mounts the source code through `docker-compose.yml` to support hot reload
- Uses an anonymous volume for `/app/node_modules` so host dependencies do not overwrite container dependencies

### Start

```bash
docker compose up --build
```

After startup, open: `http://localhost:5173`

### Start in Detached Mode

```bash
docker compose up --build -d
```

### Stop

```bash
docker compose down
```

## Docker Files

- `Dockerfile`: development container image
- `docker-compose.yml`: port mapping, source code mounting, and dependency volume configuration
