const mongoose = require('mongoose');

const mongo_url = process.env.MONGO_CONN;

console.log("MONGO_CONN exists:", !!mongo_url);

mongoose.connect(mongo_url, {
    serverSelectionTimeoutMS: 10000
})
.then(() => {
    console.log("MongoDB Connected...");
})
.catch((err) => {
    console.error("MongoDB Connection Error:", err);
});
    // const mongoose = require('mongoose');

    // const mongo_url = process.env.MONGO_CONN;

    // mongoose.connect(mongo_url)
    // .then(()=> {
    //     console.log('MongoDB Connected...');
    // }).catch((err)=>{
    //     console.log('MongoDB Connection Error: ',err);
    // })