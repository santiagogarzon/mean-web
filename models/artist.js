'use strict'

var mongoose = require('mongoose');
var Scheme = mongoose.Schema;

var ArtistSchema = Scheme({
    name: String,
    description: String,
    image: String
})

module.exports = mongoose.model('Artist', ArtistSchema);
