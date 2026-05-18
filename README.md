# Fest'Hoche #4 Gallery

Galerie photo statique construite avec VitePress et lightGallery, prete pour GitHub Pages.

## Developpement

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Ajouter des photos

1. Placez les fichiers dans `docs/public/photos`.
2. Mettez a jour le tableau `photos` dans `docs/index.md`.
3. Si le nom du depot GitHub change, adaptez `base` dans `docs/.vitepress/config.ts`.

Le workflow `.github/workflows/deploy.yml` publie le site sur GitHub Pages a chaque push sur `main`.
