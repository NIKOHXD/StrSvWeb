# -----------------------------
# Stage 1: build dell'app Angular
# -----------------------------
FROM node:22-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npx ng build

# -----------------------------
# Stage 2: file statici serviti da nginx
# -----------------------------
FROM nginx:alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist/SomeBankingFrontend/browser /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
