export function getFavorites() {
  return JSON.parse(localStorage.getItem("favoriteBooks")) || [];
}

export function isFavorite(book) {
  const favorites = getFavorites();
  return favorites.some((b) => b.number === book.number);
}

export function addFavorite(book) {
  const favorites = getFavorites();
  if (!isFavorite(book)) {
    favorites.push(book);
    localStorage.setItem("favoriteBooks", JSON.stringify(favorites));
  }
}

export function removeFavorite(book) {
  let favorites = getFavorites();
  favorites = favorites.filter((b) => b.number !== book.number);
  localStorage.setItem("favoriteBooks", JSON.stringify(favorites));
}
