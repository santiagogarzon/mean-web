'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = process.env.PORT || 3977;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/CursoAngular', (err, rest) => {
    if(err) {
        throw err;
    } else {
        console.log("BD is running correctly");
        app.listen(port, function() {
            console.log("Api Rest Server listen on http://localhost:" + port);
        })
    }
});
