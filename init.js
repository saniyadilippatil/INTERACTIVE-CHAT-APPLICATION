const mongoose = require("mongoose");
const chat = require("./models/chat.js");

main()
    .then(() => {
        console.log("connection sucessful");
    })
.catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsap'); 
}

let allChats = [
    {
       from : "Neha",
       to : "Priya",
       msg : "send me your exam sheets",
       created_at : new Date()
    },
    {
       from : "payal",
       to : "Priya",
       msg : "send me your sheets",
       created_at : new Date()
    },
    {
       from : "priti",
       to : "sayali",
       msg : "send me your notes",
       created_at : new Date()
    },
    {
       from : "vashi",
       to : "sonal",
       msg : "send me your book page 1",
       created_at : new Date()
    },
    
]

chat.insertMany(allChats);

