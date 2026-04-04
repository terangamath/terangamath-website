# Déploiement — Terangamath Website

## Vue d'ensemble

L'application est une SPA (Single Page Application) React, servie par Nginx, déployée sur un cluster Kubernetes via une pipeline CI/CD GitHub Actions.

```
Code source (GitHub)
       │
       ▼
GitHub Actions (CI/CD)
  ├── Build React (npm)
  └── Build + Push image Docker → GHCR
                                    │
                                    ▼
                           Cluster Kubernetes
                        ┌──────────────────────┐
                        │  Ingress (nginx)      │
                        │  www.terangamath.org  │
                        │         │             │
                        │  Service (ClusterIP)  │
                        │         │             │
                        │  Deployment (2 pods)  │
                        │  Nginx + React build  │
                        └──────────────────────┘
```

---

## Stack technique

| Composant | Technologie |
|-----------|-------------|
| Framework | React 19 + Vite |
| Styles | Tailwind CSS 4 |
| Serveur web | Nginx 1.27 Alpine |
| Conteneurisation | Docker (multi-stage) |
| Registry d'images | GitHub Container Registry (GHCR) |
| Orchestration | Kubernetes |
| CI/CD | GitHub Actions |
| DNS | IONOS |
| TLS | cert-manager + Let's Encrypt |

---

## Structure des fichiers de déploiement

```
terangamath-website/
├── Dockerfile                        # Build multi-stage React → Nginx
├── nginx.conf                        # Config Nginx (SPA, cache, sécurité)
├── .dockerignore                     # Exclusions du contexte Docker
├── .github/
│   └── workflows/
│       └── deploy.yml                # Pipeline CI/CD GitHub Actions
└── k8s/
    ├── deployment.yaml               # Déploiement Kubernetes (2 replicas)
    ├── service.yaml                  # Service ClusterIP
    └── ingress.yaml                  # Exposition HTTPS via nginx ingress
```

---

## Pipeline CI/CD

### Déclenchement

La pipeline se déclenche automatiquement à chaque **push ou merge sur la branche `main`**.

```
git push origin main
        ou
Merge d'une Pull Request → main
```

### Étapes de la pipeline

```
Job 1 — Build React
  1. Checkout du code
  2. Installation des dépendances (npm ci)
  3. Build de l'application (npm run build)

       ↓ (si succès)

Job 2 — Build & Push Docker
  1. Connexion à GHCR
  2. Build de l'image Docker (multi-stage)
  3. Push vers ghcr.io/terangamath/terangamath-website
     Tags produits :
       • latest
       • sha-<commit_court>  (ex: sha-a1b2c3d)
```

### Image Docker

```
Registry  : ghcr.io
Image     : ghcr.io/terangamath/terangamath-website
Visibilité: Publique
```

---

## Dockerfile — Build multi-stage

```
Stage 1 (builder)         Stage 2 (production)
  node:22-alpine    ──►     nginx:1.27-alpine
  npm ci                    ~30 MB image finale
  npm run build
  /app/dist         ──►    /usr/share/nginx/html
```

L'image finale contient uniquement Nginx et les fichiers statiques compilés.  
Aucun Node.js, aucun code source, aucun `node_modules` en production.

---

## Configuration Nginx

| Fonctionnalité | Détail |
|----------------|--------|
| Port d'écoute | 8080 (compatible non-root Kubernetes) |
| SPA fallback | `try_files $uri $uri/ /index.html` — toutes les routes React retournent 200 |
| Compression | Gzip activé sur JS, CSS, JSON, SVG |
| Cache assets | `Cache-Control: public, immutable` — 1 an (fichiers hashés par Vite) |
| Cache index.html | `no-cache` — toujours servi frais |
| Sécurité | `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy` |

---

## Déploiement Kubernetes

### Ressources déployées

**Deployment** (`k8s/deployment.yaml`)
- 2 replicas pour la haute disponibilité
- Image : `ghcr.io/terangamath/terangamath-website:latest`
- Liveness probe : `GET /` toutes les 10s
- Readiness probe : `GET /` toutes les 5s
- Limites : 200m CPU / 128Mi RAM

**Service** (`k8s/service.yaml`)
- Type : ClusterIP
- Port interne : 80 → 8080 (conteneur)

**Ingress** (`k8s/ingress.yaml`)
- Domaine : `www.terangamath.org`
- TLS : cert-manager + Let's Encrypt (`letsencrypt-prod`)
- Ingress class : nginx

### DNS

| Type | Nom | Valeur |
|------|-----|--------|
| CNAME | www | hostname du cluster |
| Redirection | terangamath.org | → https://www.terangamath.org (301) |

---

## Workflow de développement

```
1. Créer une branche
   git checkout -b feature/ma-fonctionnalite

2. Développer et commiter
   git add .
   git commit -m "feat: description"

3. Pousser et ouvrir une Pull Request
   git push origin feature/ma-fonctionnalite

4. Faire reviewer et merger la PR sur main
   → déclenche automatiquement la pipeline CI/CD
   → nouvelle image buildée et pushée sur GHCR

5. Redémarrer les pods pour prendre en compte la nouvelle image
   kubectl rollout restart deployment/terangamath -n <namespace>
```

> **Note :** Le redémarrage automatique des pods (étape 5) est en cours d'automatisation via GitHub Actions.

---

## Secrets GitHub configurés

| Secret | Usage |
|--------|-------|
| `GITHUB_TOKEN` | Intégré automatiquement — authentification GHCR |

Aucun secret supplémentaire n'est requis pour le build et le push de l'image.

---

## Commandes utiles

### Vérifier l'état du déploiement
```bash
kubectl get pods -n <namespace>
kubectl get svc -n <namespace>
kubectl get ingress -n <namespace>
```

### Appliquer les manifestes Kubernetes
```bash
kubectl apply -f k8s/
```

### Redémarrer les pods après une nouvelle image
```bash
kubectl rollout restart deployment/terangamath -n <namespace>
```

### Suivre le déploiement en temps réel
```bash
kubectl rollout status deployment/terangamath -n <namespace>
```

### Consulter les logs des pods
```bash
kubectl logs -l app=terangamath -n <namespace> --tail=100
```

### Tester l'image Docker en local
```bash
docker pull ghcr.io/terangamath/terangamath-website:latest
docker run --rm -p 8080:8080 ghcr.io/terangamath/terangamath-website:latest
# Ouvrir http://localhost:8080
```
