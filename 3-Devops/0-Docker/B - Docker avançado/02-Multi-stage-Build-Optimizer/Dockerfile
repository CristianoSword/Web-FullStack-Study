# syntax=docker/dockerfile:1.7

FROM golang:1.26-alpine AS deps
WORKDIR /src
COPY go.mod ./
RUN go mod download

FROM deps AS test
COPY cmd ./cmd
COPY internal ./internal
COPY web ./web
RUN go test ./...

FROM deps AS builder
COPY cmd ./cmd
COPY internal ./internal
COPY web ./web
RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -trimpath -ldflags="-s -w" -o /out/multi-stage-server ./cmd/server

FROM scratch AS runtime
COPY --from=builder /out/multi-stage-server /multi-stage-server
EXPOSE 3050
ENTRYPOINT ["/multi-stage-server"]
