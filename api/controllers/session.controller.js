const Session = require("../models/session.model.js");

// Create and Save a new Session
function create(selected, blended) {
    // Validate request
    if (!selected) {
        console.log("Selected cannot be empty!")
    }
    else {
        // Create a Session
        const session = new Session({
            selectedEmoji: selected,
            blendedEmoji: blended
        });

        // Save Session in the database
        Session.create(session, (err, data) => {
            if (err) console.log("Error: ", err);
            else console.log(data);
        });
    }
}

module.exports = { create };
// // Retrieve all Sessions from the database.
// exports.findAll = (req, res) => {

// };

// // Find a single Session with a sessionId
// exports.findOne = (req, res) => {

// };

// // Update a Session identified by the sessionId in the request
// exports.update = (req, res) => {

// };

// // Delete a Session with the specified sessionId in the request
// exports.delete = (req, res) => {

// };

// // Delete all Sessions from the database.
// exports.deleteAll = (req, res) => {

// };