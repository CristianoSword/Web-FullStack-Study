FROM node:20-alpine

WORKDIR /usr/src/app

COPY app/server.js ./server.js

ENV NODE_ENV=production
ENV PORT=8080

EXPOSE 8080

CMD ["node", "server.js"]
