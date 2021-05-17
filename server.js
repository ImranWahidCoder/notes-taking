const express= require("express");
const app=express();
const bodyParser=require("body-parser");
const collection=require("./public/db/model");
const addFile=require("./public/db/file");
const { Collection } = require("mongoose");

const port=process.env.PORT || 3000;

app.set("view engine",'ejs');
app.use(express.static(__dirname+"/public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",async (req,res)=>
{
    const result=await collection.find();
    let heading = (result.length==0?"Your notes will appear here":"Your current notes");
    res.render("index",{result:result,heading:heading});
});
app.post("/formSubmit",async (req,res)=>
{
    let t=req.body.title;
    let txt=req.body.text;
    const inserting=await addFile(t,txt);
    res.redirect("/");
});

app.post("/delete",async (req,res)=>
{
    let t=req.body.remove;
    const afterDeletion=await collection.deleteMany({_id:t});
    res.redirect("/");
})

app.post("/search",async (req,res)=>
{
    let search_value=req.body.box;
    let filter=await collection.find({title:search_value});
    let heading=(filter.length==0?"Couldn't find any match":(filter.length==1?`Only ${1} note was found`:`${filter.length} notes were found`));
    res.render("index",{result:filter,heading:heading});
})


app.listen(port,()=>
{
    console.log(`Listening to port ${port}`);
})