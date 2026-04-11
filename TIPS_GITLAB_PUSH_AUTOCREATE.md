# GitLab Tips - Pense-bête

## Créer un repository GitLab via ligne de commande (sans interface web)

### Le Tips
Depuis GitLab 10.5 (février 2018), un simple `git push` crée automatiquement le repository s'il n'existe pas encore.

### Prérequis
- Avoir une clé SSH configurée sur GitLab (Profile > SSH Keys)
- Avoir les droits de création de projets dans le namespace cible

### Commande
```bash
# Syntaxe générale
git push --set-upstream git@gitlab.com:NAMESPACE/NOM-DU-PROJET.git BRANCHE

# Exemple concret
git push --set-upstream git@gitlab.com:NAMESPACE/mon-projet.git main
```

### Résultat
```
remote: The private project NAMESPACE/mon-projet was successfully created.
remote:
remote: To view the project, visit:
remote:   https://gitlab.com/NAMESPACE/mon-projet

To gitlab.com:NAMESPACE/mon-projet.git
 * [new branch]      main -> main
branch 'main' set up to track 'gitlab/main'.
```

### Caractéristiques
- ✅ Crée un repo **privé** par défaut
- ✅ Fonctionne avec SSH (pas besoin de token API)
- ✅ Crée automatiquement le namespace si vous y avez accès
- ✅ Compatible avec les GitLab self-hosted également

### Workflow complet
```bash
# 1. Préparer votre repo local
cd mon-projet
git init  # si nouveau repo
git add .
git commit -m "Initial commit"

# 2. Ajouter GitLab comme remote
git remote add gitlab git@gitlab.com:USERNAME/mon-projet.git

# 3. Push (crée automatiquement le repo sur GitLab)
git push --set-upstream gitlab main

# 4. Vérifier
# Le projet est maintenant accessible sur https://gitlab.com/USERNAME/mon-projet
```

### Astuces

#### Pour plusieurs branches
```bash
git push --all --set-upstream gitlab
```

#### Avec tags
```bash
git push --set-upstream gitlab main --tags
```

#### Si le remote existe déjà
```bash
# Supprimer et recréer
git remote remove gitlab
git remote add gitlab git@gitlab.com:USERNAME/mon-projet.git
git push --set-upstream gitlab main
```

### Comparaison des méthodes

| Méthode | SSH pour git? | Token requis? | Web UI? |
|---------|---------------|---------------|---------|
| `git push --set-upstream` | ✅ Oui | ❌ Non | ❌ Non |
| `glab repo create` | ❌ HTTPS API | ✅ Oui | ❌ Non |
| API curl | ❌ HTTPS | ✅ Oui | ❌ Non |
| Interface Web | N/A | ❌ Non | ✅ Oui |

### Référence
- Documentation GitLab : https://docs.gitlab.com/topics/git/project/#push-to-create-a-new-project
- Stack Overflow : https://stackoverflow.com/questions/33101962/how-to-create-a-new-gitlab-repo-from-my-existing-local-git-repo-using-cli

---
**Date de création** : Avril 2025  
**Cas d'usage** : TerangaMath Flux CD deployment setup
