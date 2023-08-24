const express = require("express");
const app = express();
const path = require("path");
const port = 4000;
const bodyParser = require("body-parser");
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));
var todoArray = [];
var todoArrayWork = [];
var day = require(__dirname + "/date.js"); // It imports the date function from date.js file

app.get("/", function (req, res) {
    var date = day.getDate();
    console.log(date);
    res.render('index', { listTitle: date, todoArray: todoArray });
});

app.post("/", function (req, res) {
    var newItem = req.body.newItem;
    if (newItem.replace(/ +/g, '') == "") {

    } else if (req.body.listTitle == "Work List") {

        todoArrayWork.push(req.body.newItem);
        res.redirect("/work");
        console.log(todoArrayWork);

    } else {
        todoArray.push(req.body.newItem);
        res.redirect("/");
        console.log(todoArray);
    }
    
});

// Receiving get request for work page and then sending Work List title and sending Work todo array instead of the normal array.
app.get("/work", function (req, res) {
    var workTitle = 'Work List';
    res.render("index", { listTitle: workTitle, todoArray: todoArrayWork })
});

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});