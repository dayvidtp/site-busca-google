import express from "express";
import cors from "cors";
import axios from "axios";

const PORT = 4000;

const app = express();

app.use(cors());

app.get("/search", async (requisicao, resposta) => {
  const { query } = requisicao.query;
  const API_KEY =
    "c8d8aad2be73c63f6542390ef67717c865542f009eebab3343e4b1329937082b";

  const URL = "https://serpapi.com/search.json";

  try {
    const respostaAPI = await axios.get(URL, {
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
    resposta.json(respostaAPI.data);
  } catch (err) {
    resposta.status(500).json({ error: "Erro ao fazer a requisição à API" });
  }
});

app.listen(PORT, () => {
  console.log(`O proxy está rodando na porta ${PORT}`);
});
