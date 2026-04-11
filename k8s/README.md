# Kubernetes Manifests - Migration Notice

## ⚠️ Important: Manifests Moved

The Kubernetes manifests have been migrated to Flux CD structure.

### New Location
All manifests are now in:
```
clusters/production/terangamath/
```

### Files Migrated
- `namespace.yaml` → `clusters/production/terangamath/namespace.yaml`
- `deployment.yaml` → `clusters/production/terangamath/deployment.yaml`
- `service.yaml` → `clusters/production/terangamath/service.yaml`
- `ingress.yaml` → `clusters/production/terangamath/ingress.yaml`
- `networkpolicy.yaml` → `clusters/production/terangamath/networkpolicy.yaml`
- `clusterissuer.yaml` → `clusters/production/terangamath/clusterissuer.yaml`

### New Flux Files
The following Flux CD resources have been added:
- `image-repository.yaml` - Polls GHCR for new images
- `image-policy.yaml` - Defines semver update policy (1.0.x)
- `image-update-automation.yaml` - Commits image updates to Git
- `kustomization.yaml` - Kustomize configuration

### What Changed

#### Deployment
- **Before**: `image: ghcr.io/terangamath/terangamath-website:latest`
- **After**: `image: ghcr.io/terangamath/terangamath-website:1.0.0 # {"$imagepolicy": "flux-system:terangamath"}`

The `# {"$imagepolicy": ...}` marker allows Flux ImageUpdateAutomation to automatically update this line when new images are detected.

### Using with Flux

After Flux bootstrap, manifests are automatically applied from Git. To apply manually (before Flux):

```bash
kubectl apply -k clusters/production/
```

### Keeping the Old Folder

This `k8s/` folder is kept for reference during the transition period. Once Flux is fully operational and stable, this folder can be removed.

### Setup Instructions

See:
- `FLUX_SETUP.md` - Complete setup documentation
- `FLUX_TURNKEY_SUMMARY.md` - Quick reference
- `FLUX_DOCUMENTATION.md` - Links to Flux docs

### Questions?

Check the main documentation files in the repository root.
