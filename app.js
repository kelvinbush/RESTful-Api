const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use('*/css', express.static('public/css'));

mongoose.connect("mongodb://localhost:27017/wikiDB", {
    useUnifiedTopology: true,
    useNewUrlParser: true
});

const articleSchema = {
    title: String,
    content: String
}

const Article = mongoose.model("Article", articleSchema);
const article1 = {
    title: "REST",
    content: "REST is short for REpresentational State Transfer. IIt's an architectural style for designing APIs."
}

app.get("/articles", (req, res) => {
    Article.find(((err, docs) => {
        if (!err) res.send(docs);
        else res.send(err);
    }))
});

app.post("/articles", (req, res) => {
    const newArticle = new Article({
        title: req.body.title,
        content: req.body.content
    });

    newArticle.save(err => {
        if(!err) res.send("Successfully added");
        else res.send("Something went wrong");
    });
})


app.listen(3000, () => {
    console.log("Server started on port 3000");
});