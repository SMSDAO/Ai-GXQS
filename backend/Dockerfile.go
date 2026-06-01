# backend/Dockerfile.go
FROM golang:1.21-alpine AS builder

WORKDIR /app
COPY . .
RUN go mod init smartprompt && go mod tidy
RUN go build -o main .

FROM alpine:latest
WORKDIR /app
COPY --from=builder /app/main .
EXPOSE 8080
CMD ["./main"]
