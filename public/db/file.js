const mongoose = require("mongoose");
const collection = require("./model");
const addFile = async (title_, text_) => 
{
    try 
    {
        let newDate=new Date();
        let newDoc = new collection(
        {
            title: title_,
            text: text_,
            time:newDate.toLocaleString()
        });
        const result = await collection.insertMany([newDoc]);
    }
    catch (err) 
    {
        console.log(`!!The error is ${err}`);
    }
}

module.exports = addFile;