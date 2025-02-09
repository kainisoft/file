# ---- Base Stage ----
FROM node:22.13.1 AS base
WORKDIR /app
COPY --chown=node:node package*.json ./

# ---- Development Stage ----
FROM base as development
RUN apt-get update && apt-get install -y ffmpeg
ENV NODE_ENV=development
RUN npm install
COPY . /app
CMD ["npm", "run", "dev"]

# ---- Build Stage (for production) ----
FROM base as builder
ENV NODE_ENV=production
RUN npm install --only=production
COPY --chown=node:node . .

# ---- Production Stage ----
FROM node:22.13.1-slim as production

ARG PM2_PUBLIC_KEY
ARG PM2_SECRET_KEY

RUN apt-get update && apt-get install -y ffmpeg

WORKDIR /app

COPY --chown=node:node --from=builder /app/node_modules ./node_modules
COPY --chown=node:node --from=builder /app .

ENV NODE_ENV=production
ENV PM2_PUBLIC_KEY ${PM2_PUBLIC_KEY}
ENV PM2_SECRET_KEY ${PM2_SECRET_KEY}

RUN npm install pm2 -g
CMD ["pm2-runtime", "start", "ecosystem.config.cjs"]
