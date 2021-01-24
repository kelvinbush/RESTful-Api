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


app.route("/articles/:articleTitle")
    .get((req, res) => {
        Article.findOne({title: req.params.articleTitle}, (err, doc) => {
            if (doc) res.send(doc);
            else res.send("No article was found");
        });
    })
    .put((req, res) => {
        Article.update({title: req.params.articleTitle},
            {
                title: req.body.title,
                content: req.body.content
            },
            {overwrite: true}, (err, res1) => {
                if (!err) res.send("Successfully updated article");
            });

    })
    .patch((req, res) => {
        Article.update({title: req.params.articleTitle},
            {$set: req.body},
            (err) => {
                if (!err) res.send("successfully updated article");
                else res.send(err);
            });
    })
    .delete((req, res) => {
        Article.deleteOne({title: req.params.articleTitle}, (err) => {
            if(!err) res.send("Successfully deleted article");
            else res.send(err);
        });
    });


app.listen(3000, () => {
    console.log("Server started on port 3000");
});