FROM python:3.12-alpine

RUN addgroup -g 10001 appgroup && adduser -D -H -u 10001 -G appgroup appuser

WORKDIR /app

COPY app/src ./src
COPY config ./config

RUN chown -R appuser:appgroup /app

ENV APP_HOST=0.0.0.0
ENV APP_PORT=3070
ENV APP_NAME=secure-nonroot-audit
ENV APP_USER=appuser
ENV APP_UID=10001
ENV APP_GID=10001

USER appuser

EXPOSE 3070

CMD ["python", "src/server.py"]
