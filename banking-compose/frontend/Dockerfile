# -----------------------------
# Stage 1: clone del repository
# -----------------------------
FROM alpine:3.20 AS source
ARG REPO_URL=https://github.com/mmenapace/SomeBankingApp.git
ARG REPO_REF=main
RUN apk add --no-cache git \
 && git clone --depth 1 --branch "$REPO_REF" "$REPO_URL" /src

# -----------------------------
# Stage 2: build dell'app Angular
# -----------------------------
FROM node:22-alpine AS builder
WORKDIR /app
COPY --from=source /src/frontend/ .

# Dietro il reverse proxy l'API è sullo stesso host, sotto /api
RUN sed -i "s#http://127.0.0.1:8000#/api#" src/app/core/services/bank.services.ts \
 && npm ci \
 && npx ng build

# -----------------------------
# Stage 3: file statici serviti da nginx
# -----------------------------
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist/SomeBankingFrontend/browser /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
