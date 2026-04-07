const express=require('express');
require('dotenv').config();
const mongoDB=require('./config/db')
const cors=require('cors')
const app=express();
const PORT=process.env.PORT || 5000;

app.use(cors());//middlewares
app.use(express.json());//midleware

app.get('/',(req,res)=>{
    res.send("Hello baby");

})
mongoDB().catch((err) => {
    console.error('Mongo init failed:', err.message);
});

app.use('/api',require('./api/login.js'))
app.use('/api',require('./api/myinfo.js'))
app.use('/api',require('./api/upload.js'))
app.use('/api',require('./api/download.js'))
app.use('/api',require('./api/mydocs.js'))

if (require.main === module) {
    app.listen(PORT,()=>{
        console.log("server started")
    });
}

module.exports = app;