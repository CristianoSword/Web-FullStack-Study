FROM python:3.12-alpine

WORKDIR /app

COPY src ./src
COPY config ./config
COPY models ./models
COPY seed ./seed

ENV APP_PORT=3020
ENV DB_PATH=/data/inventory.db
ENV DATA_DIR=/data

VOLUME ["/data"]

EXPOSE 3020

CMD ["python", "src/app.py"]
