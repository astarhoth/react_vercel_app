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

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("favoriteBooks")) || [];
    const exists = saved.some((b) => b.number === book.number);
    setIsFav(exists);
  }, [book]);

  function addFavorite() {
    const saved = JSON.parse(localStorage.getItem("favoriteBooks")) || [];

    if (saved.some((b) => b.number === book.number)) return;

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

      <div className="details-content">

        {/* LEFT SIDE — COVER */}
        <div className="details-left">
          <img src={book.cover} alt={book.originalTitle} className="details-img" />
        </div>

        {/* RIGHT SIDE — INFO */}
        <div className="details-right">
          <h1>Book {book.number}</h1>
          <h2>{book.originalTitle}</h2>

          <p><strong>Release date:</strong> {book.releaseDate}</p>
          <p><strong>Pages:</strong> {book.pages}</p>

          <h3>Description:</h3>
          <p className="summary-text">{book.description}</p>

          <div className="details-buttons">
            <button className="back-btn" onClick={() => navigate("/")}>
              Back
            </button>

            {isFav ? (
              <button className="remove-btn" onClick={removeFavorite}>
                Remove Favorite
              </button>
            ) : (
              <button className="fav-btn" onClick={addFavorite}>
                Add to Favorites
              </button>
            )}
          </div>
        </div>
      </div>

    </div>
  );
}

