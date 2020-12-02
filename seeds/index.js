const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers')
const mongoose = require('mongoose');
const Campground = require('../models/campground');
mongoose.connect('mongodb://localhost:27017/yelp-camp', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("We are connected to database.!!!");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const randomCity = Math.floor(Math.random() * 1000);
        const camp = new Campground({
            location: `${cities[randomCity].city},${cities[randomCity].state}`,
            title: `${sample(descriptors)} ${sample(places)}`
        })

        await camp.save();
    }

}

seedDB().then(() => {
    mongoose.connection.close();
})