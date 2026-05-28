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
  "01-dvr": "Disco-Vélo-Roller",
  "02-banquet": "Le Grand Banquet",
  "03-sieste": "La sieste musicale",
  "04-ateliers-animations-ambiance": "Ateliers, animations et ambiance",
  "05-defile": "Le défilé de Slow Fashion",
  "06-danse": "Les performances de danse",
  "07-discours-radios": "Discours et radios",
  "08-concert-aly": "Le set de Dj Aly",
  "09-concert-lorke-lorke": "Le concert de Lorkê Lorkê"
};

const albumDetails = {
  "01-dvr": {
    timeRange: "10h30 - 12h",
    description:
      "Immanquable du Fest'Hoche, La Discbo-Vélo-Roller (DVR) est un convoi joyeux, festif et sonore, pour célébrer les mobilités douces et découvrir la ville autrement. Labellisé \"Mai à Vélo\", il est accessible à toutes les petites et grandes roues et s'est déroulé cette année en édition Karaoké.",
    cover: "DSC08083"
  },
  "02-banquet": {
    timeRange: "12h - 14h",
    description:
      "Une table unique sur le principe de l'auberge espagnole, pour partager un délicieux moment convivial & rencontrer les habitants du quartier.",
    cover: "DSC08189"
  },
  "03-sieste": {
    timeRange: "14h - 17h",
    description:
      "En direct depuis la Plage Doumergue, les radios associatives Raje & Rayvox ont proposé une sélection musicale pleine de douceur. Délicatesse et quiétude ont étreint les participants durant le temps de cette pause suspendue ✨.",
    cover: "DSC08282"
  },
  "04-ateliers-animations-ambiance": {
    timeRange: "14h - 17h",
    description:
      "Un après-midi pour explorer, créer, apprendre et partager en famille autour du thème de la slow life. Une foule d'activités proposée par de nombreuses structures associatives du territoire. ",
    cover: "DSC08307"
  },
  "05-defile": {
    timeRange: "17h30 - 18h",
    description:
      "Sur le tapis rouge..." +
      "des femmes, des hommes, des enfants, tous âges et toutes silhouettes confondues 💛" +
      "Des looks issus du réemploi, choisis avec soin et pleins de créativité" +
      "Parce que la mode, c’est avant tout une affaire d’expression, pas de consommation à outrance !",
    cover: "DSC08383"
  },
  "06-danse": {
    timeRange: "18h30 - 19h15",
    description:
      "Une parenthèse dansée participative, proposée par l'Atelier du Contre Temps, durant laquelle le public a été invité à prendre part.",
    cover: "DSC08423"
  },
  "07-discours-radios": {
    timeRange: "",
    description:
      "Interviews des artistes, des animateurs, retransmission en direct de la soirée-concerts...tout a été fait pour immortaliser cette belle journée, en collaboration avec Raje & Rayvox !",
    cover: "DSC08546"
  },
  "08-concert-aly": {
    timeRange: "19h30 - 21h30",
    description:
      "DJ Aly a pris les platines pour un warm-up envoûtant, mêlant sonorités balkaniques, afro, électro organiques et tropical house. Un set hypnotique, véritable invitation au voyage.",
    cover: "DSC08611"
  },
  "09-concert-lorke-lorke": {
    timeRange: "22h - 23h30",
    description:
      "Place au groupe toulousain Lorkê Lorkê : une plongée sensorielle portée par une voix enchanteresse, des synthés psychédéliques et de nombreuses improvisations. Leur musique oscille entre énergie et introspection, danse et contemplation.",
    cover: "DSC08617"
  }
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
    .sort((a, b) => a.name.localeCompare(b.name))
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
  timeRange: albumDetails[id]?.timeRange ?? "",
  description: albumDetails[id]?.description ?? "",
  cover: albumDetails[id]?.cover ?? "",
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
  "  timeRange?: string",
  "  description?: string",
  "  photos: GalleryPhoto[]",
  "}",
  "",
  "export const galleryAlbums: GalleryAlbum[] = ["
];

for (const album of albums) {
  lines.push("  {");
  lines.push(`    id: '${escape(album.id)}',`);
  lines.push(`    title: '${escape(album.title)}',`);
  lines.push(`    timeRange: '${escape(album.timeRange)}',`);
  lines.push(`    description: '${escape(album.description)}',`);
  lines.push(`    cover: '${escape(album.cover)}',`);
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
    "---",
    `title: ${JSON.stringify(album.title)}`,
    "aside: false",
    "pageClass: album-page",
    "---",
    "",
    generatedPageMarker,
    "",
    "<script setup lang=\"ts\">",
    "import { galleryAlbums } from \"../.vitepress/data/gallery\";",
    "",
    `const album = galleryAlbums.find((item) => item.id === "${escape(album.id)}")!;`,
    "</script>",
    "",
    `# ${album.title}`,
    `<p>{{ album.description }}</p>`,
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
