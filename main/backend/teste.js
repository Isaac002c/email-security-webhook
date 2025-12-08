import { analyzeEmail } from "./src/services/parserEmail.js";

const fakeEmail = {
  spf: "fail",
  dkim: "pass",
  body: "Clique aqui: http://ataque.com"
};

console.log(analyzeEmail(fakeEmail));
