const express = require("express");
const path = require("path");
const port = process.env.PORT || 8080;
const app = express();

app.use(express.static(__dirname+'/dev'));
app.get("*", (req, res) => {
 res.sendFile(path.resolve(__dirname+'/dev'))
});
app.listen(port);
console.log("Server started");
