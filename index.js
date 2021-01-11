const express =require('express');
const bodyParser = require('body-parser');
const cors= require('cors');
const mongoose = require('mongoose');

const {MONGOURI} = require('./config/keys');

mongoose.connect(
    MONGOURI || 
    'mongodb://127.0.0.1/urlShortner',{
    useNewUrlParser:true,
    useUnifiedTopology: true

});

const app = express();
app.use(cors());


mongoose.set('useFindAndModify', false);
require ('./models/url');

app.use(bodyParser.json())
app.use(require('./routes/url'))



const port = process.env.PORT || 5000;
const server = app.listen(port,()=>{
    console.log('listening to port',port)
});


module.exports = server;