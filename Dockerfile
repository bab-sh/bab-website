# syntax=docker/dockerfile:1

# Stage 1: Base image with pnpm
FROM node:22-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
WORKDIR /app

# Stage 2: Install dependencies
FROM base AS deps
COPY package.json pnpm-lock.yaml ./
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

# Stage 3: Build the application
FROM base AS build
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm build

# Stage 4: Production image
FROM node:22-alpine AS production

# Create non-root user for security
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nuxt

WORKDIR /app

# Copy only the built output
COPY --from=build --chown=nuxt:nodejs /app/.output ./

# Switch to non-root user
USER nuxt

# Set environment variables
ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3000

# Expose the port (informational)
EXPOSE ${PORT}

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=10s --retries=3 \
    CMD wget --spider -q http://localhost:${PORT} || exit 1

# Start the application
CMD ["node", "server/index.mjs"]
