const mongoose=require('mongoose');
mongoose.connect("mongodb://ImuCoder:Imran78726#@localhost:27017/todo?authSource=admin",{useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex:true})
.then(()=>
{
    console.log("Successfully connected to the database");
})
.catch((err)=>
{
    console.log(`The error is ${err}`);
});

const mySchema=new mongoose.Schema(
{
    title:{type:String,required:true},
    text:{type:String,required:true},
    time:{type:String}
});


const collection=new mongoose.model("list",mySchema);
module.exports=collection;