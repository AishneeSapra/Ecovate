const mongoose = require('mongoose');
const Plantation = require('../models/plantation');

mongoose.connect('mongodb://127.0.0.1:27017/eco-vate');


const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const seeddb = async () => {
    try {
        // Delete existing plantations
        await Plantation.deleteMany({});
        console.log('Plantations removed');

        // Create and save new plantations
        const plantations = [
            { PinCode: 110085, PlotNumber: 292 },
            { PinCode: 110085, PlotNumber: 293 },
            { PinCode: 110085, PlotNumber: 294 },
            { PinCode: 110085, PlotNumber: 295 },
            { PinCode: 110086, PlotNumber: 292 },
            { PinCode: 110085, PlotNumber: 290 },
            { PinCode: 110085, PlotNumber: 291 }
        ];

        for (const data of plantations) {
            const plantation = new Plantation(data);
            await plantation.save();
          
        }
    } catch (error) {
        console.error('Error seeding database:', error);
    } finally {
        
            console.log("Database connection closed");
        
    }
};
seeddb();