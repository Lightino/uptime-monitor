# STAGE 1: Build
FROM node:22.12.0 as build

# Installa curl e bun
RUN apt update && apt install -y curl && \
    curl -fsSL https://bun.sh/install | bash && \
    ln -s /root/.bun/bin/bun /usr/local/bin/bun

# Workdir
WORKDIR /app

# Copia e installazione dipendenze
COPY bun.lock ./bun.lock
COPY package.json ./
RUN bun install --frozen-lockfile

# Copia del codice sorgente
COPY . .

# Build
ARG NODE_ENV=production
ENV NODE_ENV ${NODE_ENV}
RUN bun run build

# STAGE 2: Runtime
FROM node:22.12.0

# Installa curl e bun
RUN apt update && apt install -y curl && \
    curl -fsSL https://bun.sh/install | bash && \
    ln -s /root/.bun/bin/bun /usr/local/bin/bun

WORKDIR /app

# Copia artefatti
COPY --from=build /app/dist ./dist
COPY --from=build /app/package.json ./
COPY --from=build /app/src/server ./src/server
COPY --from=build /app/bun.lock ./bun.lock

ARG NODE_ENV=production
ENV NODE_ENV ${NODE_ENV}

# Installa solo deps di produzione
RUN bun install --production --frozen-lockfile

# Esposizione porta
EXPOSE 3000

# Avvio del server
CMD ["bun", "src/server/index.js"]
