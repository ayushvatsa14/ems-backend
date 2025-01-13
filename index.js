const express=require('express');
const app=express();
require('dotenv').config();
const cors=require('cors');
const router=require('./routes/router.js');

app.use(cors());

app.use(express.json());
app.use('/api/user', router);

const Port=process.env.Port || 8000;

app.listen(Port, () => {
    console.log(`Server is started at port ${Port}`);
});

const dbConnect=require('./config/Database');
dbConnect();