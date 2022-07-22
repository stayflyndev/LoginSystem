if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

const express = require("express");
const app = require('./src/app')
const bcrypt = require('bcrypt')
const passport = require('passport')
const initializePassport = require("./passport.config")
const flash = require("express-flash")
const session = require("express-session")

//local users
const users = []

const findUserByEmail = (email) =>{ 
return users.find(user => user.email === email)
}

initializePassport(passport, findUserByEmail)

const PORT = 5000;
app.listen(PORT || process.env);
app.use(express.urlencoded({
    extended: false
}));

const path = require('path')
app.use('/src', express.static(path.join(__dirname, './src')))
app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET, 
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())



//render pages and ejs views
app.set("view-engine", 'ejs');

app.get("/", (req, res) => {
    res.render('index.ejs')
})

app.get("/login", (req, res) => {
    res.render('login.ejs')
})

app.post("/login", passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}
))

app.get("/register", (req, res) => {
    res.render('register.ejs')
})

app.post('/register', async (req, res) => {
    const name = req.body.name
    const email = req.body.email
    const password = req.body.password


    try {
        //hash password
        bcrypt_pw = await bcrypt.hash(password, 5)

        users.push({
            id: Date.now(),
            name: name,
            email: email,
            password: bcrypt_pw
        })
        res.redirect('/login')

    } catch {
        res.redirect('/register')

    }
    console.log(users)
})