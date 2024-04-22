const express = require("express")
const app= express();
const port = 8080;
const path = require("path");
const{v4:uuidv4} = require('uuid');
const methodOverride = require('method-override')


app.use(methodOverride('_method'))


app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname,"views"));

app.use(express.static(path.join(__dirname,"public")));

let posts =[
    {
        id : "delta&unit=" + uuidv4(),
        username : "ahishek",
        content : "I love coding!",
        img : "",
        caption : "",
    },
    {
        id : uuidv4(),
        username : "abhi",
        content : "Want to be software developer!",
        img : "",
        caption : "",

    },
    {
        id : uuidv4(),
        username : "vivek",
        content : "converting coffee into code!",
        img : "",
        caption : "",
    },
];


app.get("/posts/new", (req, res) =>{
    res.render("new.ejs");
});


app.get("/posts", (req, res) =>{
    res.render("index.ejs",{posts});
});

app.post("/posts", (req,res) =>{
    let {username, content} = req.body;
    let id = uuidv4();
    posts.push({id, username, content});
    res.redirect("/posts");
});


app.get("/posts/:id", (req, res) =>{
    let {id} = req.params;
    let post = posts.find(post => post.id === id);
    if(post){
        res.render("show.ejs", {post});
    }else{
        res.status(404).send("404 post not found");
    }
});

app.patch("/posts/:id", (req,res) =>{
    let {id} = req.params;
    let newcontent = req.body.content;
    let post = posts.find(post => post.id === id);
    post.content = newcontent;
    res.redirect("/posts");
});

app.get("/posts/:id/edit", (req, res) =>{
    let {id} = req.params;
    let post = posts.find(post => post.id === id);
    res.render("edit.ejs", {post});
});


app.delete("/posts/:id", (req, res) =>{
    let {id} = req.params;
    posts = posts.filter(post => post.id !== id);
    res.redirect("/posts");
});


// app.get("/posts/:id/img", (req, res) =>{
//     let {id} = req.params;
//     let post = posts.find(post => post.id === id);
//     res.render("add-img.ejs");
// })

app.listen(port, () =>{
    // console.log("listening to port : 8080");
});