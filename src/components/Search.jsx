import axios from "axios";
import { useState } from "react";

const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!query) {
      return;
    }

    setError("");
    setLoading(true);

    try {
      const URL = "http://localhost:4000/search";

      const res = await axios.get(URL, {
        params: {
          query: query,
        },
      });

      const data = res.data.organic_results || [];

      setResults(data);
    } catch (err) {
      console.error(err);
      setError("Erro na busca");
    } finally {
      setLoading(false);
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
      <div>
        {error ? (
          <h4>{error}</h4>
        ) : loading ? (
          <h4>Carregando...</h4>
        ) : (
          <ul>
            {results.map((result, index) => {
              return (
                <li key={index}>
                  <a
                    href={result.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {result.title}
                  </a>
                  <p>{result.snippet}</p>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Search;
