import User from "../Models/User.js";
import bcrypt from "bcrypt";

function signUp(req, res, next){
    
   bcrypt.hash(req.body.password, 10)
    .then(hash => {
        const newUser =  new User({
            email: req.body.email,
            password: hash,
        })
    
    newUser.save()
        .then(() => res.status(200).json({message: "Utilisateur créé avec succès"}))
        .catch((error) => res.status(400).json({error}));
    })
    .catch(error => res.status(500).json({error}));
};

function logIn(req, res, next){
    User.findOne({email: req.body.email})
        .then(user => {
            if (!user){
                res.status(401).json({message: "L'email ou le mot de passe est incorrecte"})
            } else if (user.password === req.body.password){
                res.status(200).json({
                    userId: user._id
                })
            } else{
                res.status(401).json({message: "L'email ou le mot de passe est incorrecte"})
            };

        })
        .catch(rerror => res.status(500).json({error}))
};

export default {
    logIn,
    signUp
}