const mongoose = require("mongoose");
const QuickReply = require("./models/QuickReply");
const { connectToDb, disconnectFromDb } = require("./db")

// data
const quickRepliesList = require("./models/seedfiles/quick-replies.json")
const quickRepliesArray = [...quickRepliesList]

const seedQuickReplies = async () => {
    await connectToDb();
    
    await QuickReply.deleteMany({}, (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log("all quick replies deleted")     
        };
    });

    await QuickReply.insertMany(quickRepliesArray, (err) => {
        if (err) {
            console.log(err);        
        } else {
            console.log("added quick replies to the database"); 
            disconnectFromDb()     
        };
    });

}

seedQuickReplies();
