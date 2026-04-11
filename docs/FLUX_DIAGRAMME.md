# Flux CD — Flux de Déploiement Automatique

## De Git Tag à Déploiement Kubernetes

```mermaid
flowchart TD
    DEV["👤 Développeur<br/>git tag v1.0.1<br/>git push origin v1.0.1"]

    subgraph GITHUB["🐙 GitHub.com (Cloud)"]
        GA["🔄 GitHub Actions Workflow"]
        CO["Checkout code"]
        BR["Build React app"]
        DB["Docker Build & Push"]
        GA --> CO --> BR --> DB

        GHCR["📦 GHCR<br/>Tags créés :<br/>• 1.0.1 (semver)<br/>• 1.0 (alias)<br/>• 1 (alias)<br/>• sha-a1b2c3d"]
        DB --> GHCR
    end

    DEV --> GITHUB

    subgraph RKE2["🖥️ Cluster RKE2 (On-Premises)"]
        subgraph FS["⚙️ Namespace: flux-system"]
            IR["🔍 ImageRepository<br/>Scan GHCR (toutes les 15 min)"]
            IP["📋 ImagePolicy<br/>Règle: semver 1.0.x<br/>✅ 1.0.1 match<br/>❌ 1.1.0 ignoré"]
            IU["✏️ ImageUpdateAutomation<br/>Mise à jour deployment.yaml<br/>Commit dans Git"]
            GR["📥 GitRepository<br/>Détecte nouveau commit"]
            KS["📝 Kustomization<br/>Applique les manifests"]
            IR --> IP --> IU --> GR --> KS
        end

        subgraph TP["🚀 Namespace: terangamath-prod"]
            DEP["Deployment terangamath<br/>Image: ghcr.io/.../terangamath-website:1.0.1"]
        end

        KS --> DEP
    end

    GITHUB -->|"🌐 Internet"| RKE2
```

## Rolling Update — Mise à jour progressive

```mermaid
flowchart TD
    S0["État INITIAL<br/>Pod-1 (v1.0.0) + Pod-2 (v1.0.0)"]
    S1["Étape 1 : Création Pod-3 (v1.0.1)<br/>3 pods — Pas de downtime"]
    S2["Étape 2 : Pod-3 Ready<br/>Suppression Pod-1"]
    S3["Étape 3 : Création Pod-1 (v1.0.1)<br/>Suppression Pod-2"]
    S4["✅ TOUS EN v1.0.1"]

    S0 --> S1 --> S2 --> S3 --> S4
```

## Vérifications automatiques

```mermaid
flowchart LR
    A["🔍 LivenessProbe<br/>HTTP GET / :8080"] --> OK["✅"]
    B["🔍 ReadinessProbe<br/>HTTP GET / :8080"] --> OK
    C["🔍 Service<br/>Traffic → pods v1.0.1"] --> OK
    D["🔍 Ingress<br/>www.terangamath.org"] --> OK
```

## Timing (Temps estimé)

| Étape | Composant | Délai |
|-------|-----------|-------|
| 1-2 | GitHub Actions | ~2-3 min |
| 3-4 | ImageRepository (scan GHCR) | ~0-15 min |
| 5 | ImageUpdateAutomation | ~1-2 min |
| 6-7 | GitRepository / Kustomize | ~1 min |
| 8-10 | Déploiement (rolling update) | ~1-2 min |
| **Total** | | **~5-18 min** (pire cas) |

## Commandes de monitoring

```bash
# Voir l'état de Flux
flux get all
flux get images all

# Voir les logs de Flux
flux logs --level=info --follow

# Voir les pods en temps réel
kubectl get pods -n terangamath-prod -w

# Voir l'historique de déploiement
git log --oneline --grep="update TerangaMath" -5

# Voir les commits de Flux dans GitHub
# https://github.com/terangamath/terangamath-website/commits/main
```

## Points clés

| Point | Détail |
|-------|--------|
| ✅ GitOps | Git = Source unique de vérité |
| ✅ Zéro downtime | Rolling update avec 2 réplicas |
| ✅ Sécurisé | Flux gère les mises à jour (pas de kubectl manuel) |
| ✅ Traçable | Chaque changement = commit Git signé "Flux Bot" |
| ✅ Automatique | Patch updates (1.0.x) sans intervention humaine |
| ⚠️ Manuel | Minor/Major updates (1.x.x) nécessitent changement de ImagePolicy |