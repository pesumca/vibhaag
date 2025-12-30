FROM oven/bun:1.3.5

WORKDIR /app

COPY package.json bun.lockb* ./
COPY packages ./packages
COPY apps/web ./apps/web

RUN bun install

WORKDIR /app/apps/web

EXPOSE 5173
CMD ["bun", "run", "dev", "--", "--host", "0.0.0.0"]
