const express = require("express");
const app = express();
const path = require("path");
const port = 3000;
const bodyParser = require("body-parser");
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));
var todoArray = [];

app.get("/", function(req, res){
    res.render('index', {todoArray: todoArray});
});

app.post("/", function(req,res){
    todoArray.push(req.body.newItem);
    console.log(todoArray);
    res.redirect("/");
})

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});