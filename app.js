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

app.route("/articles")
    .get((req, res) => {
        Article.find(((err, docs) => {
            if (!err) res.send(docs);
            else res.send(err);
        }));
    })
    .post((req, res) => {
        const newArticle = new Article({
            title: req.body.title,
            content: req.body.content
        });

        newArticle.save(err => {
            if (!err) res.send("Successfully added");
            else res.send(err);
        });
    })
    .delete((req, res) => {
        Article.deleteMany((err) => {
            if (!err) {
                res.send("Successfully deleted all articles");
            } else res.send(err);
        });
    });


app.listen(3000, () => {
    console.log("Server started on port 3000");
});