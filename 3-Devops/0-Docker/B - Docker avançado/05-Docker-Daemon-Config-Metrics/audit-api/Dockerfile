FROM python:3.12-alpine

WORKDIR /app

COPY src ./src
COPY data ./data

ENV APP_HOST=0.0.0.0
ENV APP_PORT=3080

EXPOSE 3080

CMD ["python", "src/server.py"]
