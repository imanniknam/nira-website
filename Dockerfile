# syntax=docker/dockerfile:1
# نیرا — Next.js 16 standalone image. Small and self-contained: the CMS keeps
# all its data (content, uploads, messages) in /data, which is a mounted volume.
ARG NODE_IMAGE=node:22-bookworm-slim

FROM ${NODE_IMAGE} AS build
ARG NPM_REGISTRY=https://registry.npmjs.org/
ENV NEXT_TELEMETRY_DISABLED=1
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm config set registry "${NPM_REGISTRY}" \
 && (npm ci --no-audit --no-fund --loglevel=error || npm install --no-audit --no-fund --loglevel=error)
COPY . .
RUN NODE_OPTIONS=--max-old-space-size=2048 npm run build

FROM ${NODE_IMAGE} AS run
ENV NODE_ENV=production \
    PORT=3000 \
    HOSTNAME=0.0.0.0 \
    NEXT_TELEMETRY_DISABLED=1 \
    DATA_DIR=/data \
    MALLOC_ARENA_MAX=2
WORKDIR /app
COPY --from=build /app/public ./public
COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static
RUN mkdir -p /data && chown -R node:node /data /app
USER node
VOLUME ["/data"]
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:3000/api/health').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"
CMD ["node", "server.js"]
