const express = require("express");
const bodyParser = require("body-parser");

var app = express();
app.set("view engine","ejs");
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));

const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/todo");
const trySchema = new mongoose.Schema({
     name: String
});
const item = mongoose.model("task",trySchema);
const todo = new item ({
    name: "Create some videos"
});
// todo.save();

app.get("/", async function(req, res) {
    try {
        const foundItems = await item.find({}).exec();
        res.render("list", { ejes: foundItems });
    } catch (err) {
        console.log(err);
    }
});

app.post("/", function(req, res){
    const itemName = req.body.ele1;
    const todo1 = new item({
        name: itemName
    });
    todo1.save();
    res.redirect("/");
});

app.post("/delete", async function (req, res) {
    const checked = req.body.checkbox1;
    try {
        await item.findOneAndRemove({ _id: checked }).exec();
        console.log("deleted");
        res.redirect("/");
    } catch (err) {
        console.log(err);
    }
});

app.listen("5000",function(){
    console.log("server is running");
});