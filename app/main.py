from fastapi import FastAPI, Request, status

app = FastAPI(
    title="Email Security Engine",
    description="API de análise de emails via webhook",
    version="1.0.0"
)

#  ROTA DE SAÚDE
@app.get("/health", status_code=status.HTTP_200_OK)
def health():
    return {"status": "ok"}


#  ROTA PRINCIPAL DO WEBHOOK
@app.post("/webhook", status_code=status.HTTP_202_ACCEPTED)
async def receive_webhook(request: Request):
    payload = await request.json()

    return {
        "message": "Webhook recebido com sucesso",
        "received_keys": list(payload.keys())
    }


#  ROTA DE VALIDAÇÃO / DEBUG
@app.post("/validate", status_code=status.HTTP_200_OK)
async def validate_payload(request: Request):
    payload = await request.json()

    return {
        "valid": True,
        "payload_preview": payload
    }


#  ROTA DE ANÁLISE (placeholder)
@app.post("/analyze", status_code=status.HTTP_200_OK)
async def analyze_email():
    return {
        "status": "analysis_disabled",
        "message": "Rota criada. Regras ainda não ativadas."
    }


#  ROTA DE STATUS / INFO DA API
@app.get("/info", status_code=status.HTTP_200_OK)
def api_info():
    return {
        "service": "Email Security Engine",
        "version": "1.0.0",
        "engine": "FastAPI",
        "rules_loaded": False
    }
