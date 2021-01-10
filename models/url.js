const mongoose= require('mongoose');
const { nanoid } = require('../helpers')


const urlSchema =  new mongoose.Schema({
    full:{
        type: String,
        required: true,
    },
    short:{
        type: String,
        required: true,
        default:()=> nanoid()
    },
    clicks: {
        type: Number,
        required: true,
        default: 0
    } ,
    createdAt: {
        type: Date,
        default: Date.now
    },
    lastAccessed: Date

})

module.exports = mongoose.model('Url',urlSchema);