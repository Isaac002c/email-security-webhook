# MailShield – Regras de Análise de Segurança

Este documento define as regras utilizadas pelo sistema para identificar indicadores de fraude, phishing e abuso em mensagens de e-mail.

## 1. Cabeçalhos suspeitos
- **Envelope-From diferente do From real**
  - Sinal forte de spoofing.
- **Reply-To divergente**
  - Possível desvio de resposta para atacante.
- **Received headers inconsistentes**
  - Saltos estranhos, servidores inexistentes ou ordem invertida.
- **Falta de cabeçalhos padrão**
  - Ausência de `Message-ID`, `Date` ou `From`.

## 2. Falhas em autenticação
- **SPF: FAIL / SOFTFAIL / NONE**
- **DKIM: FAIL**
- **DMARC: FAIL**
- **Ausência de registros**
  - Domínios sem SPF, DKIM ou DMARC são considerados de risco.

## 3. Domínios suspeitos
- **Domínios recém-criados**
  - Criados há menos de 60 dias.
- **Domínios parecidos com marcas**
  - Ex.: "micr0soft.com", "paypa1-secure.net".
- **Uso de TLDs de alto risco**
  - `.zip`, `.loan`, `.rest`, `.top`, e outros associados a spam.
- **Domínios com histórico em blocklists**
  - AbusRD, Spamhaus, OpenPhish.

## 4. Links maliciosos
- **URLs encurtadas**
  - Bitly, TinyURL, etc.
- **Links com redirecionamento**
  - `?redirect=`, `go.php?u=`.
- **Links que não correspondem ao texto**
  - Texto diz uma coisa, link vai para outra.
- **Protocolos incomuns**
  - `ftp://`, `file://`, `data://`.

## 5. Anexos perigosos
- Arquivos **executáveis**:
  - `.exe`, `.msi`, `.bat`, `.cmd`, `.scr`
- Arquivos **com macros**:
  - `.docm`, `.xlsm`
- Arquivos **zipados sem motivo**
  - `.zip`, `.rar`, `.7z`
- Arquivos **disfarçados**
  - `arquivo.pdf.exe`

## 6. Indicadores de phishing no corpo
- Manipulação emocional (urgência, ameaça).
- Pedido de senha, código de verificação ou dados bancários.
- Padrões de engenharia social:
  - “Sua conta será encerrada”
  - “Verifique sua identidade agora”

## 7. Indicadores comportamentais
- Horário de envio anormal.
- Endereço do remetente nunca visto antes pela organização.
- Mudança abrupta no estilo de comunicação.

## 8. Score final
Cada regra gera pontuação:

- 10 pts: crítico  
- 5 pts: alto  
- 3 pts: médio  
- 1 pt: baixo  

**Acima de 12 pts → sinalizar como “SUSPEITO”**  
**Acima de 20 pts → sinalizar como “ALTO RISCO”**

