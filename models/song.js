'use strict'

var mongoose = require('mongoose');
var Scheme = mongoose.Schema;

var SongSchema = Scheme({
    number: Number,
    name: String,
    duration: String,
    file: String,
    album: {
        type: Scheme.ObjectId,
        ref: 'Album'
    }
})

module.exports = mongoose.model('Song', SongSchema);
