import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Details.css";

export default function Details() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state?.book) return <p>No book received.</p>;

  const book = state.book;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [isFav, setIsFav] = useState(false);

  // Check if book is already in favorites
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("favoriteBooks")) || [];
    const exists = saved.some((b) => b.number === book.number);
    setIsFav(exists);
  }, [book]);

  function addFavorite() {
    const saved = JSON.parse(localStorage.getItem("favoriteBooks")) || [];

    // prevent duplicate
    if (saved.some((b) => b.number === book.number)) {
      alert("This book is already in your favorites!");
      return;
    }

    saved.push(book);
    localStorage.setItem("favoriteBooks", JSON.stringify(saved));
    setIsFav(true);
  }

  function removeFavorite() {
    let saved = JSON.parse(localStorage.getItem("favoriteBooks")) || [];
    saved = saved.filter((b) => b.number !== book.number);
    localStorage.setItem("favoriteBooks", JSON.stringify(saved));
    setIsFav(false);
  }

  return (
    <div className="details-container">

      <h2>Book {book.number} — {book.originalTitle}</h2>

      <img src={book.cover} alt={book.originalTitle} className="details-img" />

      <p><strong>Release date:</strong> {book.releaseDate}</p>
      <p><strong>Pages:</strong> {book.pages}</p>
      <p><strong>Description:</strong> {book.description}</p>

      <button className="back-btn" onClick={() => navigate("/")}>
        Voltar
      </button>

      {isFav ? (
        <button className="remove-btn" onClick={removeFavorite}>
          Remover dos Favoritos
        </button>
      ) : (
        <button className="fav-btn" onClick={addFavorite}>
          Adicionar aos Favoritos
        </button>
      )}
    </div>
  );
}
