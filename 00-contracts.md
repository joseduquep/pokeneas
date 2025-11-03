# 00_contracts.md — Contracts & Conventions for Pokeneas (Express)

## 1) Context and Scope
- Domain: Pokeneas is a **simple Pokédex simulation project** featuring Pokeneas (Pokémon born in Antioquia). Each Pokenea has: `id`, `name`, `height`, `ability`, `image` (GCP Bucket URL), and `philosophicalPhrase`.
- **Project Focus**: This is a deployment/DevOps practice project. Priority is on Docker containerization and CI/CD pipeline, not complex business logic.
- Stack: Node.js 20+, Express 4+, TypeScript (optional, JavaScript is acceptable for simplicity).
- Deployment: Docker + DockerHub with GitHub Actions CI/CD pipeline.
- Inspired by: [Pokémon Pokédex](https://www.pokemon.com/el/pokedex) (but kept simple).
- All code must align with the documented conventions in this file and Git & GitHub Conventions.

## 2) Git & GitHub Conventions (Mandatory)
- Commit message format:  `<type>(<scope>): <description>`

- Allowed types: feat, fix, docs, style, refactor, test, chore, other, automation
- Description must be in imperative, first letter capitalized, no period at the end, maximum 50 characters
- Branch names: feature/..., fix/..., hotfix/..., docs/...
- PR titles follow commit message format
- PRs require at least one architect reviewer. No direct push to main. CI / tests must pass
- Branch flow:  
   • feature/* branches from develop → PR to develop  
   • Release: merge develop → main  
   • hotfix/* branches from main, merge back to main and develop

## 3) Code Style & Format (Node.js / Express)
- **Keep it simple**: TypeScript is optional. Plain JavaScript is acceptable.
- If using TypeScript: basic types are enough, no need for strict mode.
- Clean code: consistent indentation (2 spaces), LF line endings.
- Remove unused imports and console.log statements before committing.
- Optional linting/formatting: ESLint + Prettier (not mandatory for this simple project).

## 4) Controllers, Models, Routes Rules
Controllers

- Keep controllers simple: handle request/response logic only.
- Basic error handling is enough (try/catch with simple error messages).
- No console.log debug in committed code.
- Hardcoding the Pokenea array is acceptable for this project.

Models / Data Access
- No database required. Use an in-memory array of Pokeneas (7-10 items).
- Simple object structure or class for Pokenea is enough.
- Access properties directly or via simple getters (no complex ORM patterns needed).

Routes
- Required routes:
  - `GET /pokenea/random` → Returns JSON with id, name, height, ability + container ID.
  - `GET /pokenea/random/image` → Returns HTML page with image, philosophicalPhrase + container ID.
- Keep route definitions simple and clean.

## 5) Architectural Pattern
- **Simple separation of concerns**: Separate routes, logic, and data.
- Suggested structure: `routes → controllers → service/data`.
- No complex validation or middleware required (GET-only routes).
- Keep it simple and maintainable.

## 6) Naming Conventions
- Files: kebab-case or camelCase (whatever is simpler for you).
- Consistent naming: use descriptive names for functions and variables.
- Array/data: `pokeneas` (plural, camelCase).

## 7) Data Access
- Access Pokenea properties directly (e.g., `pokenea.name`, `pokenea.image`).
- No complex getter/setter patterns required for this simple project.

## 8) API/Frontend Requirements
- Use simple HTML template engine (EJS or plain HTML) for `/pokenea/random/image` route.
- Display: image (from GCP Bucket URL), philosophicalPhrase, and container ID.
- JSON route (`/pokenea/random`): return object with id, name, height, ability, and container ID.
- Get container ID using `os.hostname()` in Node.js.

## 9) Docker & Environment
- Dockerize the application. Create `Dockerfile` and `docker-compose.yml` if not present.
- Use Node.js 20+ Alpine base image.
- Images stored in GCP Buckets (URLs hardcoded in Pokenea array).
- Container ID must be retrievable at runtime (use `os.hostname()` in Node.js).
- Development environment assumptions: Ubuntu 24.04.3 LTS; Docker Engine 27.5.1; Docker Compose v2.39.1

## 10) Validation
- No user input validation required for this project (GET-only routes).
- Ensure random selection logic is robust and does not fail if the Pokenea array is empty.

## 11) Example Controller Structure
```javascript
// Simple controller example (JavaScript or TypeScript)

// GET /pokenea/random → JSON with id, name, height, ability + container ID
function getRandom(req, res) {
  // Logic here
}

// GET /pokenea/random/image → HTML page with image, philosophicalPhrase + container ID
function getRandomImage(req, res) {
  // Logic here
}

module.exports = { getRandom, getRandomImage };
```

## 12) Data Structure Guide
- Pokenea model/interface with fields:
  - `id: number` (unique identifier)
  - `name: string` (Pokenea name)
  - `height: number` (height in meters or cm)
  - `ability: string` (ability/skill)
  - `image: string` (GCP Bucket URL)
  - `philosophicalPhrase: string` (philosophical phrase)
- Create 7-10 Pokeneas in a hardcoded array.
- No relationships needed (single entity project).

## 13) PR / Merge Checklist
- Commit messages follow format: `<type>(<scope>): <description>`.
- Code is clean and readable.
- No console.log or debug code.
- Both routes working correctly.
- Docker container builds and runs successfully.
- GitHub Actions workflow configured for DockerHub.

## 14) Explicit DO NOTs
- Do not introduce new frontend frameworks/libraries (keep it simple).
- Do not overcomplicate the architecture (this is a deployment practice project).
- Do not add unnecessary dependencies.

## 15) Suggested Project Structure (Simple)
```
src/
  routes/
    pokeneaRoutes.js
  controllers/
    pokeneaController.js
  data/
    pokeneas.js  (hardcoded array of 7-10 Pokeneas)
  utils/
    container.js  (helper to get container ID)
  app.js
  server.js
views/
  pokenea-image.ejs  (or .html)
public/
  css/
    style.css  (optional)
Dockerfile
docker-compose.yml
.dockerignore
.github/
  workflows/
    docker-publish.yml
package.json
README.md
```

**Note**: This is a minimal structure. You can organize differently as long as it's clean and maintainable.

## Acceptance Criteria
- **Primary Goal**: Docker deployment and CI/CD pipeline working correctly.
- Both routes (`/pokenea/random` and `/pokenea/random/image`) functional.
- Each route returns the container ID.
- 7-10 Pokeneas with GCP Bucket image URLs.
- Dockerfile builds successfully.
- GitHub Actions workflow pushes image to DockerHub.
- Clean code: readable, no debug statements.
- README with setup and deployment instructions.
