# Déploiement — Terangamath Website

## Vue d'ensemble

L'application est une SPA (Single Page Application) React, servie par Nginx, déployée sur un cluster Kubernetes via une pipeline CI/CD GitHub Actions et Flux CD pour le GitOps.

```
Code source (GitHub)
       │
       ▼
GitHub Actions (CI/CD)
  ├── Build React (npm)
  └── Build + Push image Docker → GHCR
                                    │
                                    ▼
                              Flux CD (GitOps)
                         détecte nouvelle image
                                    │
                                    ▼
                           Cluster Kubernetes (RKE2)
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
| Orchestration | Kubernetes RKE2 |
| GitOps | Flux CD |
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

| Événement | Résultat |
|-----------|----------|
| Push ou merge sur `main` | Build + push image taguée `latest` + `sha-*` |
| Push d'un tag `v1.0.0` | Build + push image taguée `1.0.0`, `1.0`, `1`, `sha-*` |
| Commit sur une branche de PR | Build React uniquement (vérification) |
| Modification de `docs/`, `k8s/`, fichiers `.md` | Aucun build déclenché |

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
     Tags produits sur push de tag Git (ex: v1.0.0) :
       • 1.0.0
       • 1.0
       • 1
       • sha-<commit_court>
     Tags produits sur push sur main :
       • latest
       • sha-<commit_court>
```

### Image Docker

```
Registry   : ghcr.io
Image      : ghcr.io/terangamath/terangamath-website
Visibilité : Publique
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

## GitOps avec Flux CD

Flux CD tourne sur le cluster et surveille GHCR toutes les **15 minutes**.

Dès qu'une nouvelle image correspondant à la policy `1.0.x` est détectée, Flux met à jour automatiquement le déploiement — sans intervention manuelle.

```
git tag v1.0.1 && git push origin v1.0.1
        │
        ▼
GitHub Actions builde et pushe ghcr.io/.../terangamath-website:1.0.1
        │
        ▼
Flux CD détecte 1.0.1 (dans les 15 minutes)
        │
        ▼
Déploiement automatique sur le cluster
        │
        ▼
www.terangamath.org → nouvelle version en ligne
```

---

## Workflow de développement

### Développement quotidien

```bash
# 1. Créer une branche
git checkout -b feature/ma-fonctionnalite

# 2. Développer et commiter
git add .
git commit -m "feat: description"

# 3. Pousser et ouvrir une Pull Request
git push origin feature/ma-fonctionnalite

# 4. Merger la PR sur main après review
#    → build automatique + push image :latest sur GHCR
```

### Publier une nouvelle version (release)

```bash
# Après merge sur main, créer et pousser un tag semver
git checkout main
git pull origin main
git tag v1.0.1
git push origin v1.0.1
# → build automatique + image :1.0.1 publiée + Flux déploie automatiquement
```

### Convention de versioning

| Tag | Usage |
|-----|-------|
| `v1.0.1` | Correction de bug (patch) |
| `v1.1.0` | Nouvelle fonctionnalité (minor) |
| `v2.0.0` | Changement majeur (major) |

---

## Protection de la branche main

La branche `main` est protégée :
- Push direct interdit — tout passe par une Pull Request
- Le build GitHub Actions doit réussir avant de merger
- Force push interdit

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

### Suivre un déploiement en temps réel
```bash
kubectl rollout status deployment/terangamath -n <namespace>
```

### Consulter les logs des pods
```bash
kubectl logs -l app=terangamath -n <namespace> --tail=100
```

### Vérifier Flux CD
```bash
flux get images all -n <namespace>
flux get helmreleases -n <namespace>
```

### Tester l'image Docker en local
```bash
docker pull ghcr.io/terangamath/terangamath-website:latest
docker run --rm -p 8080:8080 ghcr.io/terangamath/terangamath-website:latest
# Ouvrir http://localhost:8080
```
