import axios from "axios";
import { useState } from "react";

const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");

  const API_KEY =
    "";

  const handleSubmit = async (e) => {
    e.preventDefault();

    const URL = "https://serpapi.com/search.json";

    try {
      const res = await axios.get(URL, {
        params: {
          q: query,
          engine: "google",
          google_domain: "google.com.br",
          api_key: API_KEY,
          hl: "pt-br",
          gl: "br",
          num: 10,
        },
      });
      const data = await res.sjon();
      setResults(data);
    } catch (err) {
        console.error(err);
        setError("Erro na busca")
    }
  };

  return (
    <div className="App">
      <div className="Logo">
        <img src="./public/goggles.svg" alt="Toggles" />
        <h1>Toggle</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="query"
          placeholder="Digite aqui"
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Buscar</button>
      </form>
    </div>
  );
};

export default Search;
