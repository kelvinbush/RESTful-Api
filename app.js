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

mongoose.connect("mongo://localhost:27017/wikiDB", {
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


app.listen(3000, () => {
    console.log("Server started on port 3000");
});