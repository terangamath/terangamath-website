# ─────────────────────────────────────────
# Stage 1 : Build de l'application React
# ─────────────────────────────────────────
FROM node:22-alpine AS builder

WORKDIR /app

# Copier les fichiers de dépendances en premier (cache Docker optimal)
COPY package*.json ./

RUN npm ci

# Copier le reste du code source
COPY . .

RUN npm run build

# ─────────────────────────────────────────
# Stage 2 : Serveur Nginx de production
# ─────────────────────────────────────────
FROM nginx:1.27-alpine AS production

# Supprimer la config par défaut de Nginx
RUN rm /etc/nginx/conf.d/default.conf

# Copier notre configuration personnalisée
COPY nginx.conf /etc/nginx/conf.d/app.conf

# Copier le build React depuis le stage précédent
COPY --from=builder /app/dist /usr/share/nginx/html

# Nginx écoute sur le port 8080 (non-root friendly en K8s)
EXPOSE 8080

# Démarrage de Nginx en foreground (requis pour Docker)
CMD ["nginx", "-g", "daemon off;"]
