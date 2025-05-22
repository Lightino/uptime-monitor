FROM node:22.12.0 as build

# Creazione della directory di lavoro
RUN mkdir /app
WORKDIR /app

# Copia e installazione delle dipendenze
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Copia del codice sorgente
COPY . .

# Costruzione del progetto
ARG NODE_ENV=production
ENV NODE_ENV ${NODE_ENV}
RUN yarn run build

# ---------------

FROM node:22.12.0

# Creazione della directory per l'applicazione
RUN mkdir -p /app/dist
WORKDIR /app

# Copia degli artefatti della build
COPY --from=build /app/dist ./dist
COPY --from=build /app/package.json .
COPY --from=build /app/src/server ./src/server
COPY --from=build /app/.env.production ./.env.production

ARG NODE_ENV=production
ENV NODE_ENV ${NODE_ENV}

# Installazione delle dipendenze di produzione
RUN yarn install --production --frozen-lockfile

# Installazione di forever globalmente
RUN yarn global add forever

# Esposizione della porta
EXPOSE 3000

# Avvio del server
CMD ["forever", "src/server/index.js"]