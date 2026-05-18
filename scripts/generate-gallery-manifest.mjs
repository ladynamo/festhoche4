import {
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  rmSync,
  writeFileSync
} from "node:fs";
import { extname, join, parse, relative } from "node:path";

const fullRoot = join(process.cwd(), "docs/public/gallery-full");
const thumbRoot = join(process.cwd(), "docs/public/gallery-thumb");
const output = join(process.cwd(), "docs/.vitepress/data/gallery.ts");
const albumsRoot = join(process.cwd(), "docs/albums");
const generatedPageMarker = "<!-- generated-gallery-album -->";
const supportedExtensions = new Set([
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
  ".avif"
]);

const albumTitles = {
  "01-dvr": "DVR",
  "02-banquet": "Banquet",
  "03-sieste": "Sieste",
  "04-ateliers-animations-ambiance": "Ateliers, animations et ambiance",
  "05-defile": "Defile",
  "06-danse": "Danse",
  "07-discours-radios": "Discours et radios",
  "08-concert-aly": "Concert Aly",
  "09-concert-lorke-lorke": "Concert Lorke Lorke"
};

function slash(path) {
  return path.replaceAll("\\", "/");
}

function escape(value) {
  return value.replaceAll("\\", "\\\\").replaceAll("'", "\\'");
}

function titleFromAlbum(album) {
  return albumTitles[album] ?? album.replace(/^\d+-/, "").replaceAll("-", " ");
}

function listAlbums(root) {
  if (!existsSync(root)) {
    return [];
  }

  return readdirSync(root, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort((a, b) => a.localeCompare(b));
}

function listPhotos(album) {
  const albumRoot = join(fullRoot, album);

  return readdirSync(albumRoot, { withFileTypes: true })
    .filter(
      (entry) =>
        entry.isFile() &&
        supportedExtensions.has(extname(entry.name).toLowerCase())
    )
    .map((entry) => {
      const relativePath = slash(
        relative(fullRoot, join(albumRoot, entry.name))
      );
      const thumbPath = join(thumbRoot, relativePath);

      if (!existsSync(thumbPath)) {
        throw new Error(`Missing thumbnail for ${relativePath}`);
      }

      return {
        src: `/gallery-full/${relativePath}`,
        thumb: `/gallery-thumb/${relativePath}`,
        title: parse(entry.name).name,
        description: titleFromAlbum(album)
      };
    })
    .sort((a, b) => a.src.localeCompare(b.src));
}

const albums = listAlbums(fullRoot).map((id) => ({
  id,
  title: titleFromAlbum(id),
  photos: listPhotos(id)
}));

const lines = [
  "export type GalleryPhoto = {",
  "  src: string",
  "  thumb: string",
  "  title: string",
  "  description?: string",
  "}",
  "",
  "export type GalleryAlbum = {",
  "  id: string",
  "  title: string",
  "  photos: GalleryPhoto[]",
  "}",
  "",
  "export const galleryAlbums: GalleryAlbum[] = ["
];

for (const album of albums) {
  lines.push("  {");
  lines.push(`    id: '${escape(album.id)}',`);
  lines.push(`    title: '${escape(album.title)}',`);
  lines.push("    photos: [");

  for (const photo of album.photos) {
    lines.push("      {");
    lines.push(`        src: '${escape(photo.src)}',`);
    lines.push(`        thumb: '${escape(photo.thumb)}',`);
    lines.push(`        title: '${escape(photo.title)}',`);
    lines.push(`        description: '${escape(photo.description)}'`);
    lines.push("      },");
  }

  lines.push("    ]");
  lines.push("  },");
}

lines.push("]");
lines.push("");
lines.push(
  "export const galleryPhotos = galleryAlbums.flatMap((album) => album.photos)"
);
lines.push("");

mkdirSync(join(process.cwd(), "docs/.vitepress/data"), { recursive: true });
writeFileSync(output, lines.join("\n"), "utf8");

mkdirSync(albumsRoot, { recursive: true });
for (const entry of readdirSync(albumsRoot, { withFileTypes: true })) {
  if (!entry.isFile() || !entry.name.endsWith(".md") || entry.name === "index.md") {
    continue;
  }

  const path = join(albumsRoot, entry.name);
  if (readFileSync(path, "utf8").includes(generatedPageMarker)) {
    rmSync(path);
  }
}

for (const album of albums) {
  const page = [
    generatedPageMarker,
    "",
    "<script setup lang=\"ts\">",
    "import { galleryAlbums } from \"../.vitepress/data/gallery\";",
    "",
    `const album = galleryAlbums.find((item) => item.id === "${escape(album.id)}")!;`,
    "</script>",
    "",
    "# {{ album.title }}",
    "",
    "[Retour aux albums](/albums/)",
    "",
    "{{ album.photos.length }} photos.",
    "",
    "<p class=\"photo-credit\">Photos : Alicja Pakulska</p>",
    "",
    "<GalleryGrid :photos=\"album.photos\" />",
    ""
  ];

  writeFileSync(join(albumsRoot, `${album.id}.md`), page.join("\n"), "utf8");
}

const photoCount = albums.reduce(
  (total, album) => total + album.photos.length,
  0
);
console.log(
  `Generated ${photoCount} photos across ${albums.length} albums and ${albums.length} album pages`
);
