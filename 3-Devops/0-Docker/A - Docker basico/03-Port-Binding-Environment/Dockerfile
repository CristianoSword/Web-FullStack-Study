FROM node:22-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --omit=dev && npm cache clean --force

COPY src ./src
COPY config ./config

ENV PORT=3010
ENV HOST=0.0.0.0

EXPOSE 3010

CMD ["node", "src/server.mjs"]
