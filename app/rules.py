def apply_rules(email: dict) -> dict:
    score = 0
    reasons = []

    subject = email.get("subject", "").lower()
    sender = email.get("from", "").lower()
    body = email.get("body", "").lower()

    # Regra 1: palavras suspeitas
    suspicious_words = ["urgente", "senha", "clique", "verifique", "bloqueio"]

    for word in suspicious_words:
        if word in subject or word in body:
            score += 2
            reasons.append(f"Palavra suspeita detectada: {word}")

    # Regra 2: remetente estranho
    if "@" not in sender or sender.endswith(".ru"):
        score += 3
        reasons.append("Remetente suspeito")

    # Regra 3: muitos links
    if body.count("http") > 2:
        score += 2
        reasons.append("Muitos links no corpo do email")

    # Veredito final
    if score >= 5:
        verdict = "malicious"
    elif score >= 3:
        verdict = "suspicious"
    else:
        verdict = "safe"

    return {
        "verdict": verdict,
        "score": score,
        "reasons": reasons
    }
