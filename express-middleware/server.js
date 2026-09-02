const express = require('express');
const path = require("path");
const  { inputCleaner, inputValidator } = require('./middleware');


const app = express();
const PORT = 3010;
//const router = Router();

// Middleware to read form data
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
    res.redirect('/form');
})

// Serve static files from public folder
app.use(express.static("public"));


app.listen(PORT, () => {
    console.log(`listening on ${PORT}`);

})


app.get("/form", (req, res) => {
    res.status(200).sendFile(path.join(__dirname, "./public/index.html"))
})

app.post("/submit", inputCleaner,
    inputValidator, (req, res) => {
        res.send(`
      Username: ${req.body.username}<br>
      Comment: ${req.body.comment}
    `);
    })