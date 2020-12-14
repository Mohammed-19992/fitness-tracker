let path = require("path");

module.exports = function (app) {

    app.get("/exercise", function (request, respond) {
        respond.sendFile(path.join(__dirname, "../public/exercise.html"));
    });

    app.get("/stats", function (request, respond) {
        respond.sendFile(path.join(__dirname, "../public/stats.html"));
    });

    app.get("/", function (request, respond) {
        respond.sendFile(path.join(__dirname, "../public/index.html"));
    });
};