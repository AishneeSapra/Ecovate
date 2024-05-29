const mongoose = require('mongoose');
const Activity = require('../models/activity');

   mongoose.connect('mongodb://127.0.0.1:27017/eco-vate')

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const seedDB = async () => {
    try {
        console.log('Preparing to remove activities...');
        await Activity.deleteMany({});
        console.log('Activities removed');

        const activities = [
            {
                title: 'Tree Plantation',
                image: 'https://th.bing.com/th/id/OIP.F64-83D9hp-98NWKeNcWDgHaFj?rs=1&pid=ImgDetMain',
                description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
            },
            {
                title: 'Mail Deletion',
                image: 'https://th.bing.com/th/id/OIP.htmDavU-tVayQsm1oITFvAHaHa?rs=1&pid=ImgDetMain',
                description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
            },
            {
                title: 'Rainwater Harvesting',
                image: 'https://www.altonpumps.com/wp-content/uploads/2022/07/rainwater-harvesting-system.jpg',
                description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
            },
            {
                title: 'Solar Panel',
                image: 'https://cdn.shopify.com/s/files/1/0493/9834/9974/files/home-solar-panels.jpg?v=1685522273',
                description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
            }
        ];

        for (const activityData of activities) {
            console.log(`Saving activity: ${JSON.stringify(activityData)}`);
            const activity = new Activity(activityData);
            await activity.save();
            console.log(`Activity "${activity.title}" saved`);
        }
    } catch (error) {
        console.error('Error seeding database:', error);
    } finally {
       
            console.log("Database connection closed");
       
    }
};

seedDB();
