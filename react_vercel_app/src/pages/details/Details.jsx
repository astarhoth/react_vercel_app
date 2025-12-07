import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Details.css";

export default function Details() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state?.book) return <p>Nenhum livro recebido.</p>;

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

        {/* LADO ESQUERDO — CAPA */}
        <div className="details-left">
          <img src={book.cover} alt={book.originalTitle} className="details-img" />
        </div>

        {/* LADO DIREITO — INFORMAÇÕES */}
        <div className="details-right">
          <h1>Livro {book.number}</h1>
          <h2>{book.originalTitle}</h2>

          <p><strong>Data de publicação:</strong> {book.releaseDate}</p>
          <p><strong>Páginas:</strong> {book.pages}</p>

          <h3>Descrição:</h3>
          <p className="summary-text">{book.description}</p>

          <div className="details-buttons">
            <button className="back-btn" onClick={() => navigate("-1")}>
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
        </div>
      </div>

    </div>
  );
}
