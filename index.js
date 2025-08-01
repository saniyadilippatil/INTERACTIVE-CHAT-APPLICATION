const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chat");
const methodOverride = require("method-override");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));

main()
    .then(() => {
        console.log("connection sucessful");
    })
.catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsap'); 
}

// Index Route

app.get("/chats", async (req,res) => {
    let chats = await Chat.find();
   // console.log(chats);
    res.render("index.ejs", {chats});
});

// New Route 

app.get("/chats/new", (req,res) => {
    res.render("new.ejs");
});

// Create Route

app.post("/chats", (req,res) => {
    let {from,to,msg} = req.body;
    let newChat = new chat({
    from: from,
    to: to,
    msg: msg,
    created_at : new Date()
    })
    newChat
    .save()
    .then((res) => {
        console.log("chat was saved");
    })
    .catch((err) => {
        console.log(err);
    });
   
    res.redirect("/chats");
});

// Edit Route

app.get("/chats/:id/edit", async (req, res) => {
    let { id } = req.params;
    let chat = await Chat.findById(id); // ✅ Use Model name (Capitalized)
    res.render("edit.ejs", { chat });
});

// Update Route

app.put("/chats/:id", async (req,res) => {
    let { id } = req.params;
    let {msg : newMsg} = req.body; 
    console.log(newMsg);
    let updatedChat = await Chat.findByIdAndUpdate(id, 
        {msg: newMsg}, {runValidators : true, new: true}
    );

    console.log(updatedChat);
    res.redirect("/chats");
});

// Destroy Route
app.delete("/chats/:id", async (req,res) => {
    let { id } = req.params;
    let chatToBeDeleted = await Chat.findByIdAndDelete(id);
    console.log(chatToBeDeleted);
    res.redirect("/chats");
});

let chat1 = new Chat({
    from : "Neha",
    to : "Priya",
    msg : "send me your exam sheets",
    created_at : new Date()
});

chat1.save().then(res => {  //UTC
    console.log(res);
});

app.get("/", (req,res) => {
    res.send("route is working");
});

app.listen(8080, () => {
    console.log("Server is running on port 8080");
});
