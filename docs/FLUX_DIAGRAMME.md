# Flux CD - Flux de Déploiement Automatique
## De Git Tag à Déploiement Kubernetes

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                              👤 DÉVELOPPEUR                              │
│                                                                                   │
│  ┌─────────────────────────────────────────────────────────────────────────────┐│
│  │  1. git tag v1.0.1                                                          ││
│  │  2. git push origin v1.0.1                                                  ││
│  └─────────────────────────────────────────────────────────────────────────────┘│
└──────────────────────────────────────────┬──────────────────────────────────────┘
                                           │
                                           ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                              🐙 GITHUB.COM (Cloud)                                │
│                                                                                   │
│  ┌─────────────────────────────────────────────────────────────────────────────┐│
│  │  🔄 GitHub Actions Workflow (.github/workflows/deploy.yml)                  ││
│  │                                                                             ││
│  │  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐                     ││
│  │  │ Checkout    │───▶│ Build React │───▶│ Docker Build│                     ││
│  │  │ code        │    │ app         │    │ & Push      │                     ││
│  │  └─────────────┘    └─────────────┘    └──────┬──────┘                     ││
│  │                                               │                           ││
│  │                                               ▼                           ││
│  │  ┌──────────────────────────────────────────────────────────────┐        ││
│  │  │                    📦 GHCR (GitHub Container Registry)         │        ││
│  │  │                                                               │        ││
│  │  │   🏷️ Nouveaux tags créés :                                   │        ││
│  │  │   • ghcr.io/terangamath/terangamath-website:1.0.1  ← SEMVER  │        ││
│  │  │   • ghcr.io/terangamath/terangamath-website:1.0    (alias)   │        ││
│  │  │   • ghcr.io/terangamath/terangamath-website:1      (alias)   │        ││
│  │  │   • ghcr.io/terangamath/terangamath-website:sha-a1b2c3d      │        ││
│  │  │                                                               │        ││
│  │  └──────────────────────────────────────────────────────────────┘        ││
│  └─────────────────────────────────────────────────────────────────────────────┘│
└──────────────────────────────────────────┬──────────────────────────────────────┘
                                           │
                    🌐 Internet              │
                                           │
                                           ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                        🖥️  CLUSTER RKE2 (On-Premises)                            │
│                                                                                   │
│  ┌─────────────────────────────────────────────────────────────────────────────┐│
│  │                    ⚙️  NAMESPACE: flux-system                                  ││
│  │                                                                             ││
│  │  ┌─────────────────────────────────────────────────────────────────────┐   ││
│  │  │ 3. ImageRepository Controller (poll toutes les 5 min)              │   ││
│  │  │                                                                   │   ││
│  │  │    🔍 SCAN GHCR → Liste tous les tags                            │   ││
│  │  │         │                                                        │   ││
│  │  │         ▼                                                        │   ││
│  │  │    📋 Tags trouvés: [1.0.0, 1.0.1, sha-xxx, latest]              │   ││
│  │  │         │                                                        │   ││
│  │  │         └──────────┬─────────────────────────────────────────────┘   ││
│  │  │                    ▼                                             │   ││
│  │  │ 4. ImagePolicy Controller (règle: semver 1.0.x)                  │   ││
│  │  │                                                                   │   ││
│  │  │    ✅ Tag 1.0.1 match la politique 1.0.x                         │   ││
│  │  │    ❌ Tag 1.1.0 ignoré (hors de la plage 1.0.x)                   │   ││
│  │  │         │                                                        │   ││
│  │  │         ▼                                                        │   ││
│  │  │ 5. ImageUpdateAutomation Controller (toutes les 2 min)          │   ││
│  │  │                                                                   │   ││
│  │  │    ✏️ Met à jour deployment.yaml                                 │   ││
│  │  │       AVANT: image: 1.0.0                                       │   ││
│  │  │       APRÈS:  image: 1.0.1                                       │   ││
│  │  │                                                                   │   ││
│  │  │    💾 COMMIT dans Git:                                           │   ││
│  │  │       "chore(deploy): update TerangaMath image to 1.0.1"       │   ││
│  │  │                                                                   │   ││
│  │  └─────────────────────────────────────────────────────────────────────┘   ││
│  │                              │                                             ││
│  │                              ▼                                             ││
│  │  ┌─────────────────────────────────────────────────────────────────────┐   ││
│  │  │ 6. GitRepository Controller (sync depuis Git)                      │   ││
│  │  │                                                                   │   ││
│  │  │    📥 Détecte nouveau commit dans main@sha1:xxxx                 │   ││
│  │  │         │                                                        │   ││
│  │  │         ▼                                                        │   ││
│  │  │ 7. Kustomization Controller (applique les manifests)             │   ││
│  │  │                                                                   │   ││
│  │  │    📝 Applique clusters/production/terangamath/                  │   ││
│  │  │         └─▶ deployment.yaml modifié !                              │   ││
│  │  │                                                                   │   ││
│  │  └─────────────────────────────────────────────────────────────────────┘   ││
│  └─────────────────────────────────────────────────────────────────────────────┘│
│                                           │                                       │
│                                           ▼                                       │
│  ┌─────────────────────────────────────────────────────────────────────────────┐│
│  │                    🚀 NAMESPACE: terangamath-prod                              ││
│  │                                                                             ││
│  │  ┌─────────────────────────────────────────────────────────────────────┐   ││
│  │  │ 8. Kubernetes Deployment Controller                                │   ││
│  │  │                                                                   │   ││
│  │  │    📋 Deployment terangamath:                                      │   ││
│  │  │    ├─ Réplicas: 2                                                  │   ││
│  │  │    ├─ Strategy: RollingUpdate                                      │   ││
│  │  │    └─ Image: ghcr.io/terangamath/terangamath-website:1.0.1  ✨   │   ││
│  │  │                                                                   │   ││
│  │  └─────────────────────────────────────────────────────────────────────┘   ││
│  │                              │                                                ││
│  │                              ▼                                                ││
│  │  ┌─────────────────────────────────────────────────────────────────────┐     ││
│  │  │ 9. Rolling Update (Mise à jour progressive)                       │     ││
│  │  │                                                                   │     ││
│  │  │    ÉTAT INITIAL:                                                  │     ││
│  │  │    ┌──────────┐  ┌──────────┐                                    │     ││
│  │  │    │ Pod-1    │  │ Pod-2    │   Image: 1.0.0                     │     ││
│  │  │    │ v1.0.0   │  │ v1.0.0   │                                    │     ││
│  │  │    └──────────┘  └──────────┘                                    │     ││
│  │  │                                                                   │     ││
│  │  │    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │     ││
│  │  │    ÉTAPE 1: Création nouveau Pod-3 (v1.0.1)                      │     ││
│  │  │    ┌──────────┐  ┌──────────┐  ┌──────────┐                    │     ││
│  │  │    │ Pod-1    │  │ Pod-2    │  │ Pod-3    │   3 pods !          │     ││
│  │  │    │ v1.0.0   │  │ v1.0.0   │  │ v1.0.1 ⬆️ │   Pas de downtime  │     ││
│  │  │    └──────────┘  └──────────┘  └──────────┘                    │     ││
│  │  │                                                                   │     ││
│  │  │    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │     ││
│  │  │    ÉTAPE 2: Pod-3 Ready, suppression Pod-1                       │     ││
│  │  │    ┌──────────┐  ┌──────────┐                                    │     ││
│  │  │    │ Pod-2    │  │ Pod-3    │   Retour à 2 pods                 │     ││
│  │  │    │ v1.0.0   │  │ v1.0.1 ⬆️ │                                    │     ││
│  │  │    └──────────┘  └──────────┘                                    │     ││
│  │  │                                                                   │     ││
│  │  │    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │     ││
│  │  │    ÉTAPE 3: Création Pod-1 (v1.0.1), suppression Pod-2         │     ││
│  │  │    ┌──────────┐  ┌──────────┐                                    │     ││
│  │  │    │ Pod-1    │  │ Pod-3    │   ✅ TOUS EN v1.0.1               │     ││
│  │  │    │ v1.0.1 ⬆️ │  │ v1.0.1 ⬆️ │                                    │     ││
│  │  │    └──────────┘  └──────────┘                                    │     ││
│  │  │                                                                   │     ││
│  │  └─────────────────────────────────────────────────────────────────────┘     ││
│  │                                                                             ││
│  │  ┌─────────────────────────────────────────────────────────────────────┐   ││
│  │  │ 10. Vérifications automatiques                                     │   ││
│  │  │                                                                   │   ││
│  │  │    🔍 LivenessProbe:   HTTP GET / sur port 8080 ✅                │   ││
│  │  │    🔍 ReadinessProbe:  HTTP GET / sur port 8080 ✅                │   ││
│  │  │    🔍 Service:         Traffic routé vers les pods v1.0.1        │   ││
│  │  │    🔍 Ingress:         www.terangamath.org accessible            │   ││
│  │  │                                                                   │   ││
│  │  └─────────────────────────────────────────────────────────────────────┘   ││
│  │                                                                             ││
│  │  ✅ DÉPLOIEMENT TERMINÉ - Site web en v1.0.1 !                               ││
│  └─────────────────────────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────────────────────────┘


═══════════════════════════════════════════════════════════════════════════════════
                              TIMING (Temps estimé)
═══════════════════════════════════════════════════════════════════════════════════

Étape 1-2   (GitHub Actions)     : ~2-3 minutes    → Build et push image
Étape 3-4   (ImageRepository)    : ~0-5 minutes    → Scan GHCR (poll toutes les 5 min)
Étape 5     (ImageUpdate)        : ~1-2 minutes    → Commit dans Git
Étape 6-7   (GitRepository/Kustomize) : ~1 minute  → Sync Git vers cluster
Étape 8-10  (Déploiement)        : ~1-2 minutes    → Rolling update des pods
───────────────────────────────────────────────────────────────────────────────────
TOTAL                            : ~5-13 minutes   (pire cas)


═══════════════════════════════════════════════════════════════════════════════════
                              COMMANDES DE MONITORING
═══════════════════════════════════════════════════════════════════════════════════

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


═══════════════════════════════════════════════════════════════════════════════════
                              POINTS CLÉS
═══════════════════════════════════════════════════════════════════════════════════

✅ GitOps: Git = Source unique de vérité
✅ Aucun temps d'arrêt: Rolling update avec 2 réplicas
✅ Sécurisé: Flux gère lui-même les mises à jour (pas de kubectl manuel)
✅ Traçable: Chaque changement est un commit Git signé "Flux Bot"
✅ Automatique: Patch updates (1.0.x) sans intervention humaine
⚠️  Minor/Major updates (1.x.x) nécessitent changement de ImagePolicy manuellement
```
