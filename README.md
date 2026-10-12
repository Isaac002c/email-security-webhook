# MailShield — Webhook de Segurança de E-mails

Protótipo para explorar o recebimento de eventos de e-mail, sua persistência e a aplicação de regras heurísticas. O repositório contém serviços em Python e Node.js em estágios diferentes de implementação.

> **Estado atual:** projeto experimental. A rota de análise da API FastAPI está desativada, e as regras heurísticas em Python ainda não estão conectadas ao fluxo da API. O projeto não deve ser tratado como um serviço completo de proteção contra phishing.

## Componentes

| Caminho | Responsabilidade |
| --- | --- |
| <code>app/</code> | API FastAPI de referência, com rotas de saúde, recebimento, validação e informações do serviço |
| <code>app/rules.py</code> | Heurísticas simples baseadas no assunto, remetente e conteúdo da mensagem |
| <code>main/backend/src/</code> | API Node.js que recebe eventos, persiste payloads em SQLite e consulta o estado de uma análise |
| <code>main/security/</code> | Amostras de mensagens e arquivos de regras em desenvolvimento |

## API FastAPI

A aplicação em <code>app/main.py</code> expõe:

| Método | Rota | Comportamento atual |
| --- | --- | --- |
| <code>GET</code> | <code>/health</code> | Retorna o estado da API |
| <code>POST</code> | <code>/webhook</code> | Recebe um payload JSON e retorna as chaves recebidas |
| <code>POST</code> | <code>/validate</code> | Devolve uma prévia do payload recebido, sem validar o conteúdo |
| <code>POST</code> | <code>/analyze</code> | Placeholder; a análise está desativada |
| <code>GET</code> | <code>/info</code> | Informa a versão e se as regras estão carregadas |

Para executar essa API localmente:

~~~powershell
python -m venv .venv
./.venv/Scripts/Activate.ps1
python -m pip install fastapi uvicorn
python -m uvicorn app.main:app --reload
~~~

O servidor local padrão do Uvicorn fica em http://localhost:8000.

## Serviço Node.js

A implementação em <code>main/backend/src/</code> oferece <code>POST /webhook</code> para registrar mensagens e <code>GET /analysis/:emailId</code> para consultar o status armazenado. A persistência usa SQLite local.

Esse serviço ainda está em desenvolvimento: o código importa módulos que não estão declarados no manifesto de dependências do próprio backend. Alinhe as dependências antes de tentar executá-lo a partir de uma instalação limpa.

## Regras heurísticas

O módulo <code>app/rules.py</code> atribui uma pontuação simples usando termos suspeitos, formato do remetente e quantidade de links. Essas regras são demonstrativas e não substituem validação de SPF, DKIM, DMARC, reputação de domínio ou uma análise de segurança completa.

## Próximos passos

- Integrar o motor de regras a uma rota de análise.
- Consolidar a implementação e as dependências do serviço.
- Adicionar testes automatizados para ingestão, validação e análise.
- Definir controles de autenticação, retenção e proteção de dados antes de qualquer uso real.
