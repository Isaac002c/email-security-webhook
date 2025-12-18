const db = require("../db/connection");

function createEmail({ id, payload }) {
  const stmt = db.prepare(`
    INSERT INTO emails (id, payload, status)
    VALUES (?, ?, ?)
  `);

  stmt.run(id, JSON.stringify(payload), "PENDING");
}

function findEmailById(id) {
  const stmt = db.prepare(`SELECT * FROM emails WHERE id = ?`);
  const email = stmt.get(id);

  if (!email) return null;

  return {
    ...email,
    payload: JSON.parse(email.payload),
    analysis: email.analysis ? JSON.parse(email.analysis) : null
  };
}

function updateAnalysis(id, analysis) {
  const stmt = db.prepare(`
    UPDATE emails
    SET status = ?, analysis = ?
    WHERE id = ?
  `);

  stmt.run("DONE", JSON.stringify(analysis), id);
}

module.exports = {
  createEmail,
  findEmailById,
  updateAnalysis
};
