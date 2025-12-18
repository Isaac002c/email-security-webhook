const crypto = require("crypto");
const { createEmail } = require("../repositories/emailRepository");

module.exports = (app) => {
  app.post("/webhook", (req, res) => {
    const { email, subject } = req.body;

    if (!email || !subject) {
      return res.status(400).json({
        status: "error",
        error: "Campos obrigatórios ausentes"
      });
    }

    const emailId = crypto.randomUUID();

    createEmail({
      id: emailId,
      payload: req.body
    });

    return res.status(202).json({
      status: "accepted",
      emailId,
      message: "Email armazenado para análise"
    });
  });
};
