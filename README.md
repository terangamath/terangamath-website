# TerangaMath Website

Site vitrine de l'association TerangaMath — React + Vite, i18n (FR/EN), Framer Motion.

---

## Ajouter un nouvel article au blog

### Étape 1 — Ajouter l'image

Placez l'image de couverture de l'article dans :

```
src/assets/others/
```

Puis importez-la en haut du fichier `src/components/pages/Blog.jsx` :

```js
import monImage from '../../assets/others/mon-image.jpg';
```

---

### Étape 2 — Ajouter l'article dans `POSTS`

Dans `src/components/pages/Blog.jsx`, ajoutez un nouvel objet **en première position** du tableau `POSTS` (pour qu'il apparaisse en premier) :

```js
{
  id: 'mon-slug-unique',          // Identifiant unique (pas d'espaces, pas d'accents)
  slug: 'mon-slug-unique',        // Utilisé dans l'URL : /actualite/blog/mon-slug-unique
  category: 'olympiades',         // 'olympiades' ou 'vulgarisation'
  date: '10 avril 2026',          // Date affichée (texte libre)
  dateISO: '2026-04-10',          // Date au format ISO (pour le tri)
  author: 'TerangaMath',          // Auteur
  image: monImage,                // Variable importée à l'étape 1
  featured: true,                 // true = mis en avant (un seul à la fois)
  titleKey: 'blog.p6.title',      // Clé i18n du titre
  excerptKey: 'blog.p6.excerpt',  // Clé i18n du résumé
  readTime: 4,                    // Temps de lecture estimé (en minutes)
  content: [
    { type: 'intro',     key: 'blog.p6.intro' },
    { type: 'paragraph', key: 'blog.p6.s1' },
    { type: 'paragraph', key: 'blog.p6.s2' },
    { type: 'paragraph', key: 'blog.p6.s3' },
    // Ajouter autant de paragraphes que nécessaire (s4, s5, s6...)
    // Pour insérer une image dans l'article :
    // { type: 'image', src: monImage2, captionKey: 'blog.p6.img_caption' },
  ],
},
```

> **Note** : Si le nouvel article est `featured: true`, pensez à mettre `featured: false` sur l'ancien article mis en avant.

---

### Étape 3 — Ajouter les traductions

#### Dans `src/i18n/locales/fr.json`

Dans la section `"blog"`, ajoutez le bloc correspondant :

```json
"p6": {
  "title": "Titre de l'article en français",
  "excerpt": "Court résumé de l'article (2-3 lignes max).",
  "intro": "Premier paragraphe d'introduction, en gras dans l'article.",
  "s1": "Deuxième paragraphe...",
  "s2": "Troisième paragraphe...",
  "s3": "Quatrième paragraphe...",
  "img_caption": "Légende de l'image (optionnel)"
}
```

#### Dans `src/i18n/locales/en.json`

Même chose en anglais, mêmes clés :

```json
"p6": {
  "title": "Article title in English",
  "excerpt": "Short summary of the article (2-3 lines max).",
  "intro": "First introductory paragraph, displayed in bold.",
  "s1": "Second paragraph...",
  "s2": "Third paragraph...",
  "s3": "Fourth paragraph...",
  "img_caption": "Image caption (optional)"
}
```

---

### Étape 4 — Vérifier

```bash
npm run dev
```

Allez sur `http://localhost:5173/actualite/blog` et vérifiez que :

- L'article apparaît bien en featured (ou dans la grille)
- Le contenu s'affiche en FR et EN
- L'URL `/actualite/blog/mon-slug-unique` fonctionne
- L'image est bien chargée

---

### Résumé de la structure

```
src/
├── assets/others/           ← Images des articles
├── components/pages/
│   ├── Blog.jsx             ← Liste des articles (tableau POSTS)
│   └── BlogPost.jsx         ← Page de lecture d'un article
└── i18n/locales/
    ├── fr.json              ← Textes en français (blog.p1, blog.p2...)
    └── en.json              ← Textes en anglais
```

### Catégories disponibles

| Valeur           | FR                  | EN         |
|------------------|---------------------|------------|
| `olympiades`     | Olympiades          | Olympiads  |
| `vulgarisation`  | Vulgarisation       | Outreach   |

### Types de contenu dans `content`

| Type        | Usage                              |
|-------------|-------------------------------------|
| `intro`     | Premier paragraphe (affiché en gras)|
| `paragraph` | Paragraphe normal                   |
| `image`     | Image avec légende optionnelle      |

---

## Développement

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```