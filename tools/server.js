var connect = require('connect');
var serveStatic = require('serve-static');
var path = require("path");
var open = require("open");
connect().use(
    serveStatic(path.join(__dirname, ".."))
)
.listen(8080);
console.log("Started on port 8080");
open("http://127.0.0.1:8080/test/index.html");
