const mongoose = require('mongoose');
const EcoFriendlyWord = require('../models/EcoWords');

mongoose.connect('mongodb://127.0.0.1:27017/eco-vate');


const words = [
    { word: 'sustainability' },
    { word: 'recycle' },
    { word: 'conservation' },
    { word: 'biodiversity' },
    { word: 'renewable' },
    { word: 'afforestation' },
    { word: 'trees' },
    { word: 'sustainability' },
    { word: 'conservation' },
    { word: 'biodiversity' },
    { word: 'ecosystem' },
    { word: 'climate change' },
    { word: 'renewable energy' },
    { word: 'pollution' },
    { word: 'greenhouse gases' },
    { word: 'deforestation' },
    { word: 'habitat' },
    { word: 'carbon footprint' },
    { word: 'organic' },
    { word: 'natural resources' },
    { word: 'ecology' },
    { word: 'endangered species' },
    { word: 'waste management' },
    { word: 'erosion' },
    { word: 'composting' },
    { word: 'biodegradable' },
    { word: 'solar power' },
    { word: 'wind energy' },
    { word: 'water conservation' },
    { word: 'geothermal energy' },
    { word: 'ozone layer' },
    { word: 'wildlife' },
    { word: 'environmental protection' },
    { word: 'sustainable agriculture' },
    { word: 'marine life' },
    { word: 'green technology' },
    { word: 'urbanization' },
    { word: 'e-waste' },
    { word: 'overfishing' },
    { word: 'fossil fuels' },
    { word: 'afforestation' },
    { word: 'desertification' },
    { word: 'rainforest' },
    { word: 'non-renewable resources' },
    { word: 'carbon sequestration' },
    { word: 'greenhouse effect' },
    { word: 'sustainable development' },
    { word: 'zero waste' },
    { word: 'energy efficiency' }
];

const seedDB = async () => {
    await EcoFriendlyWord.deleteMany({});
    await EcoFriendlyWord.insertMany(words);
    console.log('Database seeded with eco-friendly words!');
};

seedDB();