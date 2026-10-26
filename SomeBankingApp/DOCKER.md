# SomeBankingApp – esecuzione con Docker

Clone di <https://github.com/mmenapace/SomeBankingApp> con un Dockerfile per il
backend (FastAPI) e uno per il frontend (Angular servito da nginx).

## File aggiunti

```
backend/Dockerfile       # multi-stage: dipendenze in un venv (/opt/venv), uvicorn sulla porta 8000
backend/.dockerignore
frontend/Dockerfile      # multi-stage: build con node, file statici con nginx
frontend/nginx.conf
frontend/.dockerignore
```

In `backend/requirements.txt` è stato aggiunto `fastapi`, che mancava.

## Build delle immagini

```bash
docker build -t banking-backend:1.0 backend
docker build -t banking-frontend:1.0 frontend
```

## Rete e container

```bash
docker network create bank-net
docker run -d --name backend  --network bank-net -p 8000:8000 banking-backend:1.0
docker run -d --name frontend --network bank-net -p 4200:80   banking-frontend:1.0
```

- Frontend: <http://localhost:4200>
- Documentazione API: <http://127.0.0.1:8000/docs>

Le porte sono quelle che l'app si aspetta: il frontend chiama l'API su
`http://127.0.0.1:8000` e il backend accetta richieste CORS solo da
`http://localhost:4200`.

## Note sulla rete Docker

Angular è un'app CSR: il codice gira nel **browser**, quindi le chiamate all'API
partono dall'host e arrivano al backend tramite la porta pubblicata `8000`.
La rete `bank-net` permette comunque ai container di parlarsi per nome:

```bash
docker exec frontend wget -qO- http://backend:8000/transactions/audit
docker network inspect bank-net
```

## Pulizia

```bash
docker rm -f frontend backend
docker network rm bank-net
```
