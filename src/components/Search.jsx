import axios from "axios";
import { useState } from "react";

const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const API_KEY =
    "c8d8aad2be73c63f6542390ef67717c865542f009eebab3343e4b1329937082b";

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!query) {
      return;
    }

    setLoading(true);

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
        <ul>
          {error ? (
            <h4>{error}</h4>
          ) : loading ? (
            <h4>Carregando...</h4>
          ) : (
            results.map((result, index) => {
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
            })
          )}
        </ul>
      </div>
    </div>
  );
};

export default Search;
