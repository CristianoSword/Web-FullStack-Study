FROM node:20-alpine

WORKDIR /app

COPY app/package.json ./
RUN npm install --omit=dev

COPY app/server.js ./

ENV PORT=8080
EXPOSE 8080

CMD ["node", "server.js"]
