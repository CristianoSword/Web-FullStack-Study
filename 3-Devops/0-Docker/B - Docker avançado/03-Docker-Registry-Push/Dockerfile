FROM python:3.12-alpine

WORKDIR /app

COPY app/src ./src
COPY app/data ./data

ENV APP_HOST=0.0.0.0
ENV APP_PORT=3060
ENV APP_NAME=inventory-release-api
ENV APP_VERSION=v1.0.0
ENV IMAGE_REPOSITORY=localhost:5001/study/inventory-release-api

EXPOSE 3060

CMD ["python", "src/server.py"]
