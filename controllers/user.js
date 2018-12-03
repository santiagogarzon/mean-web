'use strict'

var bcrypt = require('bcrypt-nodejs');
var User = require('../models/user');

function pruebas(req, res) {
    res.status(200).send({
        message: 'testing user controller action'
    });
}

function saveUser(req, res) {
    var user = new User();

    var params = req.body;

    console.log(params);

    user.name = params.name;
    user.surname = params.surname;
    user.email = params.email;
    user.role = 'ROLE_ADMIN';
    user.image = 'null';


    if (params.password) {
        //encript password and save data
        bcrypt.hash(params.password, null, null, function(err, hash) {
            user.password = hash;
            console.log(user);

            if (user.name != null && user.surname != null && user.email != null) {
                user.save((err, userStored) => {
                    if (err) {
                        res.status(500).send({
                            message: 'Error trying to save the user'
                        });
                    } else {
                        if (!userStored) {
                            res.status(404).send({
                                message: 'User could not be saved'
                            });
                        } else {
                            res.status(200).send({
                                user: userStored
                            });
                        }
                    }
                })
            } else {
                res.status(200).send({
                    message: 'Every input is required'
                });
            }
        })
    } else {
        res.status(200).send({
            message: 'Password is required'
        });
    }
}

function loginUser(req, res) {
    var params = req.body;

    var email = params.email;
    var password = params.password;

    User.findOne(
        {email: email.toLowerCase()},
        (err, user) => {
            if(err) {
                res.status(500).send({
                    message: 'Request Error'
                });
            } else {
                if(!user) {
                    res.status(404).send({
                        message: 'User does not exist'
                    });
                } else {
                    bcrypt.compare(password, user.password, function(err, check) {
                        if(check) {
                            //return user logged
                            if(params.gethash) {
                                //return jwt token
                            } else {
                                res.status(200).send({
                                    user
                                });
                            }
                        } else {
                            res.status(404).send({
                                message: 'User could not log'
                            });
                        }
                    })
                }
            }
        } 
    );
}

module.exports = {
    pruebas,
    saveUser,
    loginUser
};
