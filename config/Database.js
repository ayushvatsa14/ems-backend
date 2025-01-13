const mongoose=require('mongoose');
require('dotenv').config();

const dbConnect=() => {
    mongoose.connect(process.env.Database_Url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log("Connection Successful"))
    .catch(error => {
        console.log(error);
        process.exit(1);
    })
}

module.exports=dbConnect;