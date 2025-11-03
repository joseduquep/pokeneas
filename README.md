# Pokeneas Pokedex

![CI](https://github.com/joseduquep/pokeneas/actions/workflows/docker-publish.yml/badge.svg)

Aplicación Express que expone una Pokédex de Pokeneas (Pokémon paisas) con énfasis en prácticas de contenedores y CI/CD. Incluye rutas JSON y HTML, empaquetado Docker y workflow de GitHub Actions listo para publicar imágenes en DockerHub.

## Requisitos

- Node.js 20+
- npm 10+
- Docker Engine 27+
- Docker Compose v2.39+

## Instalación y uso local

```bash
npm install
npm run dev
# o
npm start
```

Rutas disponibles:

- `GET /pokenea/random`: devuelve un Pokenea aleatorio en JSON con `id`, `name`, `height`, `ability` y `containerId` (`os.hostname()`).
- `GET /pokenea/random/image`: renderiza una tarjeta HTML con la imagen, frase filosófica y `containerId`.
- `GET /health`: endpoint básico para verificaciones de vida.

Los datos se mantienen en memoria (`src/data/pokeneas.js`) con URLs públicas de imágenes alojadas en Google Cloud Storage.

## Contenerización

```bash
docker build -t usuario/pokeneas:local .
docker run --rm -p 3000:3000 usuario/pokeneas:local

# usando docker compose
docker compose up --build
```

La imagen usa Node.js 20 Alpine, instala sólo dependencias de producción y se ejecuta con el usuario no privilegiado `node`.

## GitHub Actions → DockerHub

Workflow: `.github/workflows/docker-publish.yml`

1. Crear secretos en el repositorio:
   - `DOCKERHUB_USERNAME`: usuario de DockerHub.
   - `DOCKERHUB_TOKEN`: token o PAT con permiso para publicar.
2. Ajustar `IMAGE_NAME` si se desea un nombre distinto.
3. Cada `push` a `main` (o ejecución manual `workflow_dispatch`) construirá y publicará la imagen etiquetada con `latest`, `main` y el `SHA` del commit.

## Despliegue en Docker Swarm (GCP)

1. Crear 4 instancias con Docker instalado (una líder + tres managers) siguiendo la guía de la presentación 18.
2. En la líder ejecutar `docker swarm init` y compartir el token manager.
3. En las otras instancias correr el comando `docker swarm join --token <token_manager> <ip_lider>:2377`.
4. Desde la líder desplegar:

```bash
docker service create \
  --name pokeneas-service \
  --replicas 10 \
  --publish published=3000,target=3000 \
  --with-registry-auth \
  dockerhub_usuario/pokeneas:latest
```

5. Verificar réplicas `docker service ps pokeneas-service` y probar rutas en la IP pública.

## Estructura del proyecto

```
src/
  app.js
  server.js
  controllers/
  routes/
  data/
  utils/
views/
public/
Dockerfile
docker-compose.yml
.github/workflows/docker-publish.yml
```

## Buenas prácticas

- Sin `console.log` en código de producción.
- Respuestas HTML y JSON incluyen `containerId` para facilitar la verificación en entornos con múltiples réplicas.
- Documentación y archivos de configuración listos para replicar en GitHub y DockerHub.


