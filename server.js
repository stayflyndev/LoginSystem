const express = require("express");
const app = express()

app.listen(3000);

const path = require('path')
app.use('/', express.static(path.join(__dirname, '')))

app.get("/", (req, res) => {
    res.sendFile('index.html')
})