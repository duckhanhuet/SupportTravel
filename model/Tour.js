var mongoose = require('mongoose');

var TourSchema = mongoose.Schema({
    image:{
        type: String
    },
    title: {
        type: String
    },
    description: {
        type: String
    },
    time: {
        type: String
    },
    start:{
        type: String
    },
    from:{
        type: String
    },
    price:{
        type: Number
    },
    transport:{
        type: String
    }
})

module.exports = mongoose.model('Tour',TourSchema);