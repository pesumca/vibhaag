FROM oven/bun:1.3.5

WORKDIR /app

COPY package.json bun.lockb* ./
COPY packages ./packages
COPY apps/api ./apps/api

RUN bun install

WORKDIR /app/apps/api

EXPOSE 4000
CMD ["bun", "src/index.ts"]
