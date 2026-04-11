# Flux CD Documentation Links and References

## Official Flux Documentation

### Core Documentation
- **Getting Started**: https://fluxcd.io/flux/get-started/
- **Installation**: https://fluxcd.io/flux/installation/
- **Core Concepts**: https://fluxcd.io/flux/concepts/
- **FAQ**: https://fluxcd.io/flux/faq/

### Image Automation (The Key Feature for You)
- **Image Update Guide**: https://fluxcd.io/flux/guides/image-update/
- **ImagePolicy API**: https://fluxcd.io/flux/components/image/imagepolicies/
- **ImageRepository API**: https://fluxcd.io/flux/components/image/imagerepositories/
- **ImageUpdateAutomation API**: https://fluxcd.io/flux/components/image/imageupdateautomations/
- **Semver Reference**: https://fluxcd.io/flux/components/image/imagepolicies/#semver

### Bootstrap & Setup
- **GitHub Bootstrap**: https://fluxcd.io/flux/installation/#github-and-github-enterprise
- **Bootstrap Command Reference**: https://fluxcd.io/flux/cmd/flux_bootstrap_github/
- **CLI Commands**: https://fluxcd.io/flux/cmd/

### Components
- **Source Controller**: https://fluxcd.io/flux/components/source/
- **Kustomize Controller**: https://fluxcd.io/flux/components/kustomize/
- **Image Automation Controllers**: https://fluxcd.io/flux/components/image/
- **Notification Controller**: https://fluxcd.io/flux/components/notification/

## GitHub Integration

### GitHub Container Registry (GHCR)
- **Working with GHCR**: https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-container-registry
- **Authenticating to GHCR**: https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-container-registry#authenticating-to-the-container-registry
- **Managing Packages**: https://docs.github.com/en/packages/learn-github-packages/introduction-to-github-packages

### GitHub Actions
- **docker/metadata-action**: https://github.com/docker/metadata-action
- **docker/build-push-action**: https://github.com/docker/build-push-action
- **docker/login-action**: https://github.com/docker/login-action
- **Semantic Versioning in Actions**: https://github.com/docker/metadata-action#semver

### GitHub Tokens
- **Creating PAT**: https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token
- **Fine-grained PAT**: https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token#creating-a-fine-grained-personal-access-token
- **Token Scopes for Packages**: https://docs.github.com/en/packages/learn-github-packages/about-permissions-for-github-packages#about-scopes-and-permissions-for-package-registries

## Related Documentation

### Kubernetes
- **Kustomize**: https://kustomize.io/
- **Kustomize Reference**: https://kubectl.docs.kubernetes.io/references/kustomize/
- **Deployments**: https://kubernetes.io/docs/concepts/workloads/controllers/deployment/
- **Rolling Updates**: https://kubernetes.io/docs/concepts/workloads/controllers/deployment/#rolling-update-deployment

### Semantic Versioning
- **Semver Spec**: https://semver.org/
- **Semver Ranges**: https://github.com/npm/node-semver#ranges

## Community & Support

### Flux Community
- **GitHub Discussions**: https://github.com/fluxcd/flux2/discussions
- **CNCF Slack**: https://cloud-native.slack.com/archives/flux (Join via: https://slack.cncf.io/)
- **Mailing List**: https://lists.cncf.io/g/cncf-flux-dev

### Troubleshooting Resources
- **Debugging Guide**: https://fluxcd.io/flux/cheatsheets/troubleshooting/
- **FAQ - Common Issues**: https://fluxcd.io/flux/faq/#flux-is-not-apply-my-changes

## Video Tutorials

### Flux Setup
- **Flux Getting Started**: https://www.youtube.com/playlist?list=PL9lOJdTvVH2tP4eY7TXm03OBRsmFoT1yK
- **Image Automation**: https://www.youtube.com/watch?v=7CgHlCZvHJE

## Blog Posts & Articles

### Best Practices
- **Flux Best Practices**: https://fluxcd.io/flux/guides/repository-structure/
- **Repository Structure**: https://fluxcd.io/flux/guides/repository-structure/#monorepo
- **GitOps with Flux**: https://www.weave.works/blog/gitops-with-flux-introduction

### Image Updates
- **Automated Image Updates**: https://fluxcd.io/blog/2021/11/december-update/#image-automation
- **Webhooks vs Polling**: https://fluxcd.io/flux/guides/webhook-receivers/

## Quick Reference Commands

```bash
# Install Flux CLI
curl -s https://fluxcd.io/install.sh | sudo bash

# Check Flux version
flux --version

# Bootstrap (creates flux-system)
flux bootstrap github --owner=terangamath --repository=terangamath-website --path=clusters/production

# Check status
flux get all
flux get sources all
flux get kustomizations
flux get images all

# Reconcile manually
flux reconcile source git flux-system
flux reconcile kustomization terangamath
flux reconcile image repository terangamath
flux reconcile image update terangamath

# View logs
flux logs --level=info
flux logs --level=error

# Export resources
flux export source git --all
flux export kustomization --all
```

## Configuration Reference

### ImagePolicy Semver Patterns

| Pattern | Meaning | Example |
|---------|---------|---------|
| `1.0.x` | Patch only | 1.0.0, 1.0.1, 1.0.2 |
| `1.x` | Minor + patch | 1.0.0, 1.1.0, 1.2.5 |
| `~1.0.0` | Same as 1.0.x | 1.0.0, 1.0.1 |
| `^1.0.0` | Compatible with 1.0.0 | 1.0.0, 1.1.0, 1.9.9 |
| `>=1.0.0` | Any version 1.0.0+ | 1.0.0, 2.0.0, 3.5.0 |
| `1.0.0 - 1.1.0` | Range | 1.0.0, 1.0.5, 1.1.0 |

### Intervals

| Resource | Recommended | Purpose |
|----------|-------------|---------|
| GitRepository | 1m-2m | Sync from Git |
| ImageRepository | 5m-10m | Poll GHCR for new images |
| ImageUpdateAutomation | 1m-2m | Apply image updates to Git |
| Kustomization | 5m-10m | Apply manifests to cluster |

## Security Resources

### Flux Security
- **Security Best Practices**: https://fluxcd.io/flux/security/best-practices/
- **Security Model**: https://fluxcd.io/flux/security/
- **Network Policy**: https://fluxcd.io/flux/cheatsheets/bootstrap/

### Secrets Management
- **Mozilla SOPS**: https://fluxcd.io/flux/guides/mozilla-sops/
- **Sealed Secrets**: https://fluxcd.io/flux/guides/sealed-secrets/
- **External Secrets**: https://fluxcd.io/flux/guides/external-secrets/

---

**Note**: Bookmark the main Flux documentation site - it's comprehensive and well-maintained:
**https://fluxcd.io/flux/**
