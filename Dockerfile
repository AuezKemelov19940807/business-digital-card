# syntax=docker/dockerfile:1

ARG NODE_VERSION=24.19.0

FROM node:${NODE_VERSION}-slim AS base

LABEL fly_launch_runtime="NestJS/Prisma"

WORKDIR /app

ENV NODE_ENV=production


# -------------------------
# Build
# -------------------------
FROM base AS build

RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y \
    build-essential \
    node-gyp \
    openssl \
    pkg-config \
    python-is-python3 && \
    rm -rf /var/lib/apt/lists/*

# Dependencies
COPY package.json package-lock.json ./

RUN npm ci --include=dev

# Prisma schema + config
COPY prisma ./prisma
COPY prisma7.config.ts ./

# Generate Prisma Client
RUN npx prisma generate

# Application source
COPY . .

# Build NestJS
RUN npm run build


# -------------------------
# Production
# -------------------------
FROM base AS production

RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y openssl && \
    rm -rf /var/lib/apt/lists/* /var/cache/apt/archives/*

COPY --from=build /app /app

EXPOSE 3000

CMD ["npm", "run", "start"]