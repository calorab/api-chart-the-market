const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../Models/user')


exports.getUser = (req, res, next) => {

}


exports.registerUser = (req, res, next) => {
    console.log(req.body)
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
                        'worththepennyiamwritingthisonjack'
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