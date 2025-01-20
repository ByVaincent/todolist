import User from "../Models/User.js";
import bcrypt from "bcrypt";

function signUp(req, res, next) {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (user === null) {

                bcrypt.hash(req.body.password, 10)
                    .then(hash => {
                        const newUser = new User({
                            email: req.body.email,
                            password: hash,
                        })

                        newUser.save()
                            .then(() => res.status(200).json({ userCreated: true, message: "Utilisateur créé avec succès" }))
                            .catch((error) => res.status(400).json({ error }));
                    })
                    .catch(error => res.status(500).json({ error }));
            } else {
                res.status(408).json({ message: "Cet email est gigit déjà utilisé!" })
            }
        })
}


function logIn(req, res, next) {
    console.log(req.body)
    User.findOne({ email: req.body.email })
        .then(user => {
            console.log(user)
            if (!user) {
                res.status(401).json({ status: 401, message: "L'email ou le mot de passe est incorrecte" })
            } else if (user.password === req.body.password) {
                res.status(200).json({
                    userId: user._id
                })
            } else {
                res.status(401).json({status: 401, message: "L'email ou le mot de passe est incorrecte" })
            };

        })
        .catch(error => res.status(500).json({status: 500, error }))
};

export default {
    logIn,
    signUp
}