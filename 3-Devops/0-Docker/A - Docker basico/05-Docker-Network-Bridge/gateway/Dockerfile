FROM python:3.12-alpine

WORKDIR /app

COPY gateway/src ./src
COPY config/gateway.json ./config/gateway.json

ENV APP_PORT=3030
ENV APP_HOST=0.0.0.0
ENV CATALOG_BASE_URL=http://catalog-service:3031

EXPOSE 3030

CMD ["python", "src/app.py"]
