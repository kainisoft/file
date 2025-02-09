# ---- Base Stage ----
FROM node:22.13.1 AS base
WORKDIR /app
COPY --chown=node:node package*.json ./

# ---- Development Stage ----
FROM base as development
ENV NODE_ENV=development
COPY --chown=node:node --from=base package*.json ./
RUN npm install
COPY . /app
CMD ["npm", "run", "start"]

# ---- Build Stage (for production) ----
FROM base as builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# ---- Production Stage ----
FROM nginx:1.25.0-alpine as production
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /app/dist/client/browser /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
