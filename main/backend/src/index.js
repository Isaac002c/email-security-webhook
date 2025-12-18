require("dotenv").config();
require("./db/connection");

const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

require("./routes/webhook")(app);
require("./routes/analysis")(app);

// no index.js, logo após app.use(express.json());
app.get("/test-db", (req, res) => {
  const { v4: uuidv4 } = require("uuid");
  const emailRepo = require("./repositories/emailRepository");

  // 1. Criar email de teste
  const testId = uuidv4();
  emailRepo.createEmail({ id: testId, payload: { from: "teste@teste.com", subject: "Teste DB" } });

  // 2. Buscar email criado
  let email = emailRepo.findEmailById(testId);

  // 3. Atualizar análise
  const analysis = { safe: true };
  emailRepo.updateAnalysis(testId, analysis);

  // 4. Buscar email atualizado
  email = emailRepo.findEmailById(testId);

  res.json(email);
});


app.get("/health", (req, res) => {
  res.status(200).send("ok");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
