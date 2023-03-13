FROM node:18
WORKDIR /app
RUN curl -f https://get.pnpm.io/v6.16.js | node - add --global pnpm
COPY --chown=node:node package.json pnpm-lock.yaml ./
RUN pnpm i
COPY . .
RUN pnpm run build

# Etape 2 : Servir l'application avec Nginx
FROM nginx:1.21-alpine

# Copier les fichiers de configuration Nginx
COPY nginx.conf /etc/nginx/nginx.conf
COPY default.conf /etc/nginx/conf.d/default.conf

# Copier les fichiers générés de l'étape 1
COPY --from=build /app/build /usr/share/nginx/html

# Exposer le port 80
EXPOSE 80

# Démarrer le serveur Nginx
CMD ["nginx", "-g", "daemon off;"]