FROM python:3.12-alpine

WORKDIR /app

COPY catalog/src ./src
COPY config/catalog.json ./config/catalog.json

ENV APP_PORT=3031
ENV APP_HOST=0.0.0.0

EXPOSE 3031

CMD ["python", "src/app.py"]
