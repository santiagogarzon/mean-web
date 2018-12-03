'use strict'

var mongoose = require('mongoose');
var Scheme = mongoose.Schema;

var AlbumSchema = Scheme({
    title: String,
    description: String,
    year: Number,
    image: String,
    artist: {
        type: Scheme.ObjectId,
        ref: 'Artist'
    }
})

module.exports = mongoose.model('Album', AlbumSchema);
