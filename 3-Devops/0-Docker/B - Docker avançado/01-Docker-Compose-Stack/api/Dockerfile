FROM python:3.12-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY app ./app

ENV APP_HOST=0.0.0.0
ENV APP_PORT=3040

EXPOSE 3040

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "3040"]
