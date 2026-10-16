FROM nginx:1.29-alpine

COPY app/index.html /usr/share/nginx/html/index.html
COPY app/health.txt /usr/share/nginx/html/health.txt

EXPOSE 8080

RUN sed -i 's/listen       80;/listen       8080;/' /etc/nginx/conf.d/default.conf
