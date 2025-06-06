

const express = require('express');
const cors = require('cors');
require('dotenv').config();
const authRoutes = require('./Route/UserRoute');
const LeaveAply = require('./Route/LeaveApplyRoute');
const db = require('./config/db')


const app= express();

app.use(cors());
app.use(express.json());

app.use((req,res,next)=>{
    console.log(`Path ${req.path}, Method ${req.method}`);
    next();
});


app.use('/auth',authRoutes);
app.use('/leave',LeaveAply);

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});

