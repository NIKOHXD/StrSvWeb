# -----------------------------
# Stage 1: clone del repository
# -----------------------------
FROM alpine:3.20 AS source
ARG REPO_URL=https://github.com/mmenapace/SomeBankingApp.git
ARG REPO_REF=main
RUN apk add --no-cache git \
 && git clone --depth 1 --branch "$REPO_REF" "$REPO_URL" /src

# -----------------------------
# Stage 2: venv con le dipendenze
# -----------------------------
FROM python:3.13-slim AS builder
RUN python -m venv /opt/venv
ENV PATH="/opt/venv/bin:$PATH"
COPY --from=source /src/backend/requirements.txt .
# fastapi manca nel requirements.txt del repo
RUN pip install --no-cache-dir -r requirements.txt fastapi==0.162.0

# -----------------------------
# Stage 3: runtime
# -----------------------------
FROM python:3.13-slim
COPY --from=builder /opt/venv /opt/venv
ENV PATH="/opt/venv/bin:$PATH"

WORKDIR /app
COPY --from=source /src/backend/main.py .

# Database SQLite spostato in /app/data, così può stare in un volume
RUN sed -i 's#sqlite:///./bank.db#sqlite:////app/data/bank.db#' main.py \
 && useradd -r -u 1001 appuser \
 && mkdir -p /app/data \
 && chown -R appuser /app
USER appuser

EXPOSE 8000

# --root-path: dietro il proxy l'API è servita sotto /api (serve per /api/docs)
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--root-path", "/api"]
