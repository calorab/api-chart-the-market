require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../Models/user');



exports.getUser = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password; 
    let loadedUser;
    User
        .findOne({email: email})
        .then(user => {
            if (!user) {
                throw new Error('No user with that email found!');
            } 
            loadedUser = user;
            return bcrypt.compare(password, user.password); 
        })
        .then(isEqual => {
            if (!isEqual) {
                res.status(403).json({message: 'Password is incorrect.'});
            }
            const token = jwt.sign(
                {
                email: loadedUser.email,
                userId: loadedUser._id.toString()
                },
                "worththepennyiamwritingthisonjack"
            );
            res.status(200).json({token: token, userId: loadedUser._id.toString()});
        })
        .catch(err => {
            console.log('the error: ', err);
            next(err);
        });
}


exports.registerUser = (req, res, next) => {
    const email = req.body.email;
    User
        .findOne({email: email})
        .then(user => {
            if (user) 
            {
                console.log('userController.registerUser error: ', `Email ${user.email} is already taken`)
                throw new Error('User with that email already Exists!');                
            } 
        })
        .then(() => {
            let password = req.body.password;
            let email = req.body.email;
            bcrypt
                .hash(password, 12)
                .then(hashedPassword => {
                    let hashedUser = User.create({
                        email: email,
                        password: hashedPassword
                    });
                    return hashedUser;
                })
                .then(result => {
                    data = result;
                    return data;
                })
                .then(data => {
                    const token = jwt.sign(
                        {
                            email: data.email,
                            userId: data._id
                        },
                        process.env.JWT_SECRET
                    );
                    res.status(200).json({response: data, token: token, userId: data._id.toString()});
                })    
                .catch(err => {
                    console.log('Bcrypt error: ', err);
                    next(err);
                });   
        })
        .catch(err => {
            console.log('Signup error: ', err);
            next(err);
        }); 
}