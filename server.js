const express = require("express");
const app = require('./src/app')

const PORT = 5000;
app.listen(PORT || process.env);

const path = require('path')
app.use('/', express.static(path.join(__dirname, './src')))

//render pages
//views
app.set("view-engine", 'ejs');

app.get("/", (req, res) => {
    res.render('index.ejs')
})

app.get("/login", (req, res) => {
    res.render('login.ejs')
})

app.get("/register", (req, res) => {
    res.render('register.ejs')
})
