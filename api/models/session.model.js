const sql = require("./db.js");

// constructor
const Session = function(session) {
  this.selectedEmoji = session.selectedEmoji;
  this.blendedEmoji = session.blendedEmoji;
};

Session.create = (newSession, result) => {
  sql.query("INSERT INTO sessions SET ?", newSession, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created session: ", { id: res.insertId, ...newSession });
    result(null, { id: res.insertId, ...newSession });
  });
};

Session.findById = (sessionId, result) => {
    sql.query(`SELECT * FROM sessions WHERE id = ${sessionId}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found session: ", res[0]);
        result(null, res[0]);
        return;
      }
  
      // not found Session with the id
      result({ kind: "not_found" }, null);
    });
  };

  Session.getAll = result => {
    sql.query("SELECT * FROM sessions", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("sessions: ", res);
      result(null, res);
    });
  };

  Session.updateById = (id, session, result) => {
    sql.query(
      "UPDATE sessions SET selectedEmoji = ?, blendedEmoji = ?  WHERE id = ?",
      [session.selectedEmoji, session.blendedEmoji, id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
  
        if (res.affectedRows == 0) {
          // not found Session with the id
          result({ kind: "not_found" }, null);
          return;
        }
  
        console.log("updated session: ", { id: id, ...session });
        result(null, { id: id, ...session });
      }
    );
  };

  Session.removeAll = result => {
    sql.query("DELETE FROM sessions", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log(`deleted ${res.affectedRows} sessions`);
      result(null, res);
    });
  };
module.exports = Session;