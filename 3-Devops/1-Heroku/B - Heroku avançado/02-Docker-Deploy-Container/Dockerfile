FROM python:3.12-alpine

WORKDIR /app

COPY runtime-app ./runtime-app

ENV PORT=8080
ENV APP_NAME=study-container-web
ENV APP_VERSION=v1.0.0

EXPOSE 8080

CMD ["python", "runtime-app/server.py"]
