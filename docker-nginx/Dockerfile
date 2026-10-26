# Immagine di base: webserver nginx su Alpine
FROM nginx:alpine

LABEL maintainer="NIKOHXD"
LABEL description="Esercitazione Docker - deploy locale di un webserver nginx"

# Cartella da cui nginx serve i file statici
WORKDIR /usr/share/nginx/html

# Rimuove la pagina di default e copia i nostri file
RUN rm -f index.html
COPY html/ .

# Solo documentazione: la porta va pubblicata con -p su docker run
EXPOSE 80

# Processo principale in foreground (stesso CMD dell'immagine base, reso esplicito)
CMD ["nginx", "-g", "daemon off;"]
