export function analyzeEmail(email) {
  let score = 0;

  // Regra 1: SPF FAIL
  if (email.spf === "fail") score += 10;

  // Regra 2: DKIM FAIL
  if (email.dkim === "fail") score += 10;

  // Regra 3: URL suspeita
  if (email.body.includes("http://")) score += 5;

  return {
    score,
    status:
      score >= 20 ? "ALTO RISCO" :
      score >= 12 ? "SUSPEITO" :
      "OK"
  };
}
