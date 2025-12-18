const { findEmailById } = require("../repositories/emailRepository");

module.exports = (app) => {
  app.get("/analysis/:emailId", (req, res) => {
    const email = findEmailById(req.params.emailId);

    if (!email) {
      return res.status(404).json({
        status: "error",
        message: "Email não encontrado"
      });
    }

    return res.json({
      id: email.id,
      status: email.status,
      analysis: email.analysis
    });
  });
};
