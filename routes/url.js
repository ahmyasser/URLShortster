const express = require('express');
const router = express.Router();
const moment = require('moment');

const mongoose = require('mongoose');
const Url =  mongoose.model("Url");

const { isNanoId } = require('../helpers')

// Gets all URLs
router.get('/url',async (req,res)=>{
     try {
        const result = await Url.find()
        res.status(200).send(result);
     }  catch (error) {
            res.status(500).send({error});
        }
})


// Gets a short url, 
// increments number of clicks by 1,
// Updates the Last Accessed date to now. 
router.get('/:url',async (req,res)=>{
    try {
       const url = await Url.findOne({short: req.params.url})

       if(url === null) return res.sendStatus(404);

       url.clicks++;
       url.lastAccessed=moment().toDate();

       url.save();

       res.status(200).send(url.full);

    }  catch (error) {
      
        res.status(500).send({error});
      
        }
})



// Gets URL object by Short URL
router.get('/:url/stats',async (req,res)=>{
    try {

       const url = await Url.findOne({short: req.params.url})
       
       if(url === null) return res.sendStatus(404);
       
       res.status(200).send(url);

    }  catch (error) {

        res.status(500).send({error});

       }
})


// Posts A new URL object
// Generates new short url if not provided
router.post('/url',async (req,res)=>{
    const {full,short} = req.body;
    if(!full){
        return res.status(400).send({error:"please enter full url"});
     }
    if(short && !isNanoId(short)){
        return res.status(400).send({error:"invalid short url, short URl must be a-z, A-Z, 1-9 and at least 4 digit long"});    
    }
     try {
        const url = new Url({ full, short })
        const result = await url.save()
        
        res.status(201).send(result);

    }  catch (error) {
            res.status(500).send({error});
        }
})


module.exports = router;    