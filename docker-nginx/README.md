# Esercitazione Docker – webserver nginx

Deploy locale di un webserver con Docker: un Dockerfile basato su `nginx:alpine`
che copia e serve i file HTML della cartella `html/`.

**Plus:** la pagina contiene un form di login dinamico in JavaScript
(solo lato client, dimostrativo: utente `studente`, password `docker`).

## Struttura

```
docker-nginx/
├── Dockerfile
├── .dockerignore
└── html/
    ├── index.html
    ├── style.css
    └── app.js
```

## Build e avvio

```bash
cd docker-nginx
docker build -t webserver-esercitazione:1.1 .
docker run -d --name web-esercitazione -p 8080:80 webserver-esercitazione:1.1
```

Poi aprire <http://localhost:8080>.

## Comandi della CLI provati

```bash
# Container attivi / tutti (solo ID)
docker ps
docker ps -a -q

# Immagini
docker images
docker images -q
docker images -f dangling=true

# Comandi dentro il container
docker exec -it web-esercitazione sh
docker exec web-esercitazione ls /usr/share/nginx/html

# Log in tempo reale con timestamp
docker logs -f --tail 50 -t web-esercitazione

# Ispezione (da Docker 29 l'IP sta sotto .NetworkSettings.Networks)
docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' web-esercitazione
docker inspect -f '{{.State.Status}}' web-esercitazione

# Volumi
docker volume create esercitazione-vol
docker volume ls
docker run --rm -v esercitazione-vol:/data alpine sh -c 'echo ciao > /data/file.txt && cat /data/file.txt'
docker volume rm esercitazione-vol

# Stop / start / kill
docker stop -t 5 web-esercitazione
docker start web-esercitazione
docker kill web-esercitazione

# Pull di un'architettura specifica
docker pull --platform linux/amd64 hello-world

# Rimozione
docker rm web-esercitazione
docker rm -f web-esercitazione

# Tag e push su Docker Hub (Plus Plus)
docker login
docker tag webserver-esercitazione:1.1 <utente-dockerhub>/webserver-esercitazione:1.1
docker push <utente-dockerhub>/webserver-esercitazione:1.1
```

## Note

- `EXPOSE 80` nel Dockerfile è solo documentazione: la porta si apre con `-p 8080:80`.
- Il comando `docker inspect -f '{{.NetworkSettings.IPAddress}}'` delle slide
  non funziona più con Docker 29: quel campo è stato rimosso.
