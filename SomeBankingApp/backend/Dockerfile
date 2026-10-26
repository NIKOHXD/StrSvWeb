# -----------------------------
# Stage 1: creazione del venv con le dipendenze
# -----------------------------
FROM python:3.13-slim AS builder

RUN python -m venv /opt/venv
# Mettere il venv in testa al PATH equivale ad "attivarlo"
ENV PATH="/opt/venv/bin:$PATH"

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# -----------------------------
# Stage 2: runtime con solo il venv e il codice
# -----------------------------
FROM python:3.13-slim

COPY --from=builder /opt/venv /opt/venv
ENV PATH="/opt/venv/bin:$PATH"

WORKDIR /app
COPY main.py .

# Utente non root
RUN useradd -r -u 1001 appuser && chown -R appuser /app
USER appuser

EXPOSE 8000

# 0.0.0.0 per accettare connessioni dall'esterno del container
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
