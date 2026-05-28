export const getCoverPhoto = (album) =>
  album.photos.find((photo) => photo.title === album.cover) ?? album.photos[0];
