import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Favorites.css";

export default function Favorites() {
  const [favorites] = useState(() => 
    JSON.parse(localStorage.getItem("favoriteBooks")) || []
  );
  const navigate = useNavigate();

  useEffect(() => {
  }, []);

  return (
    <div className="favorites-container">
      <h1 className="favorites-title">Favoritos</h1>

      {favorites.length === 0 ? (
        <p className="no-favorites">Sem favoritos.</p>
      ) : (
        <div className="favorites-grid">
          {favorites.map((book, i) => (
            <div
              key={i}
              className="favorite-card"
              onClick={() => navigate("/details", { state: { book } })}
            >
              <img src={book.cover} alt={book.originalTitle} />
              <h3>Book {book.number}</h3>
              <p>{book.originalTitle}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
