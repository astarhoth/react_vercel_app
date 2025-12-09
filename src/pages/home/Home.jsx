import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

export default function Home() {
  const [book, setBook] = useState(null);
  const navigate = useNavigate();

  
  async function fetchRandomBook() {
    try {
      const res = await fetch("https://potterapi-fedeperin.vercel.app/en/books/random");
      const data = await res.json();
      setBook(data);
    } catch (err) {
      console.error("Erro ao buscar livro:", err);
    }
  }

  
 useEffect(() => {
  const load = async () => {
    await fetchRandomBook();
  };
  load();
}, []);


  if (!book) return <p>Carregando...</p>;

  return (
    <div className="home-container">
      <h1>Livro {book.number} - {book.originalTitle}</h1>

      <img
        src={book.cover}
        alt={book.originalTitle}
        className="book-cover"
        onClick={() => navigate("/detalhes", { state: { book } })}
      />

      
      <button className="reload-btn" onClick={fetchRandomBook}>
        Novo Livro
      </button>
    </div>
  );}
