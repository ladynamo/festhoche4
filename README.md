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

1. Placez les fichiers plein format dans `docs/public/gallery-full`.
2. Placez les vignettes correspondantes dans `docs/public/gallery-thumb`, avec les memes sous-dossiers et noms de fichiers.
3. Lancez `npm run gallery:update` pour regenerer le manifeste et les pages d'albums.
4. Le site GitHub Pages est publie sous `/festhoche4/`. Si le nom du depot GitHub change, adaptez `base` dans `docs/.vitepress/config.ts`.

Le workflow `.github/workflows/deploy.yml` publie le site sur GitHub Pages a chaque push sur `main`.
