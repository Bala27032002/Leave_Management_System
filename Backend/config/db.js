

const mysql = require("mysql2");

const db=mysql.createConnection({
host : process.env.MYSQL_HOST,
user : process.env.MYSQL_USER,
password : process.env.MYSQL_PASSWORD,
database : process.env.MYSQL_DATABASE
});

db.connect((err)=>{
    if(err){
        console.log('Database connection failed',err.stack);
        return;
    }
    console.log("Connected database")
})




module.exports = db;