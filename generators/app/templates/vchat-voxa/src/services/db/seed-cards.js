const mongoose = require("mongoose");
const Card = require("./models/Card");
const { connectToDb, disconnectFromDb } = require("./db")

// data
const cardList = require("./models/seedfiles/cards.json")
const cardsArray = [...cardList]

const seedCards = async () => {
    await connectToDb();
    
    await Card.deleteMany({}, (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log("all cards deleted")     
        };
    });

    await Card.insertMany(cardsArray, (err) => {
        if (err) {
            console.log(err);        
        } else {
            console.log("added cards to the database"); 
            disconnectFromDb()     
        };
    });

}

seedCards();
