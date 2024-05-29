
const mongoose = require('mongoose');
const Product = require('../models/products');

mongoose.connect('mongodb://127.0.0.1:27017/eco-vate')


const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", () => {
    console.log("Database connected");
});
const seedDB = async () => {
    try {
        console.log('Preparing to remove products...');
        await Product.deleteMany({});
        console.log('products removed');

        const products = [
            {
                name: 'Bamboo Toothbrushes',
                image: 'https://m.media-amazon.com/images/I/61CaaUOLlwL._SX679_.jpg',
                points: 50,
            },
            {
                name: 'Eco-Friendly Shopping Bags',
                image: 'https://th.bing.com/th/id/R.d25e8ccffa6dfeb838b570c7ab603af0?rik=X2cf8bGRhyDTNg&riu=http%3a%2f%2fcdn.notonthehighstreet.com%2ffs%2f7e%2f9c%2f749b-e781-4138-a575-7989d2b49924%2foriginal_personalised-name-jute-bag.jpg&ehk=uore3iswIhnYwl6Sh9Uu5c63HD%2byc41TrxrBi24ldJk%3d&risl=&pid=ImgRaw&r=0',
                points: 20,
            },
            {
                name: 'Solar-Powered Chargers',
                image: 'https://i5.walmartimages.com/asr/0202eb9e-0890-4ded-ac7b-4ad940a90b9f_1.27333a51dcaef7cbc5a467b40510ac3d.jpeg',
                points: 150,
            },
            {
                name: 'Organic Cotton T-Shirts',
                image: 'https://i.etsystatic.com/25740589/r/il/656972/2893832570/il_1588xN.2893832570_asj1.jpg',
                points: 100,
            },
            {
                name: 'Compostable Phone Cases',
                image: 'https://i.etsystatic.com/26623269/r/il/9f091f/3045065807/il_1140xN.3045065807_sel2.jpg',
                points: 70,
            },
            {
                name: 'Recycled Paper Notebooks',
                image: 'https://th.bing.com/th/id/OIP.OqdZ3KJXdxPL7ln_z9GLFgHaFR?rs=1&pid=ImgDetMain',
                points: 50,
            }
            
        ];

        for (const Data of products) {
            console.log(`Saving product: ${JSON.stringify(Data)}`);
            const product = new Product(Data);
            await product.save();
            console.log(`Product "${product.name}" saved`);
        }
    } catch (error) {
        console.error('Error seeding database:', error);
    } finally {
       
            console.log("Database connection closed");
       
    }
};

seedDB();





