import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

export default function Home() {
  const [books, setBooks] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  // Carrega todos os livros
  async function fetchAllBooks() {
    const res = await fetch("https://potterapi-fedeperin.vercel.app/en/books");
    const data = await res.json();
    setBooks(data);
    setFiltered(data);
  }

  // Filtro da pesquisa
  function handleSearch(text) {
    setSearch(text);
    setFiltered(
      books.filter((book) =>
        book.originalTitle.toLowerCase().includes(text.toLowerCase())
      )
    );
  }

  useEffect(() => {
    async function loadBooks() {
      await fetchAllBooks();
    }
    loadBooks();
  }, []);

  return (
    <div className="home-container">
      <h1 className="home-title">Livros de Harry Potter</h1>

      <input
        type="text"
        className="search-input"
        placeholder="Pesquisar por título..."
        value={search}
        onChange={(e) => handleSearch(e.target.value)}
      />

      <div className="books-grid">
        {filtered.map((book) => (
          <div
            key={book.number}
            className="book-card"
            onClick={() => navigate("/detalhes", { state: { book } })}
          >
            <img src={book.cover} alt={book.originalTitle} />
            <h3>Livro {book.number}</h3>
            <p>{book.originalTitle}</p>
          </div>
        ))}
      </div>
    </div>
  );
}