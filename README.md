# MailShield – Email Security Webhook

MailShield é um sistema de auditoria de segurança para empresas, focado na detecção de e-mails fraudulentos.
O projeto inclui um backend com webhook e motor de análise, além de um dashboard simples para visualização dos eventos.

Estrutura do Projeto
mailshield/
├─ backend/        # Fastify API + análise
├─ frontend/       # Dashboard (React/Next)
├─ infra/          # docker-compose e scripts
├─ docs/           # regras de análise
└─ .github/        # CI pipeline

Funcionalidades

Recebimento de eventos via /webhook

Análise de e-mails (headers, SPF, DKIM, DMARC, links suspeitos)

Registro de logs e incidentes

Dashboard simples para visualização

Deploy via Docker Compose

CI com GitHub Actions

Tecnologias

Backend: Node.js, Fastify

Frontend: React/Next.js

Infra: Docker, GitHub Actions
