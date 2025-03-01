import User from "../Models/User.js";
import bcrypt from "bcrypt";
import tasksCtrl from "./tasks.js";

function signUp(req, res, next) {
  User.findOne({ email: req.body.email }).then((user) => {
    if (user === null) {
      bcrypt
        .hash(req.body.password, 10)
        .then((hash) => {
          const newUser = new User({
            email: req.body.email,
            password: hash,
          });

          newUser
            .save()
            .then(() =>
              res.status(200).json({
                userCreated: true,
                message: "Utilisateur créé avec succès",
              })
            )
            .catch((error) => res.status(400).json({ error }));
        })
        .catch((error) => res.status(500).json({ error }));
    } else {
      res.status(408).json({ message: "Cet email est déjà utilisé!" });
    }
  });
}

function logIn(req, res, next) {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({
          status: 401,
          message: "L'email ou le mot de passe est incorrecte",
        });
      } else {
        bcrypt
          .compare(req.body.password, user.password)
          .then((valid) => {
            if (!valid) {
              res.status(401).json({
                status: 401,
                message: "L'email ou le mot de passe est incorrecte",
              });
            } else {
              if (user._id.toString() === "67b88a6932e1dfd1a5859998") {
                tasksCtrl.deleteTestTasks();
              }

              res.status(200).json({
                userId: user._id,
              });
            }
          })
          .catch((error) =>
            res.status(401).json({
              status: 401,
              message: "L'email ou le mot de passe est incorrecte",
            })
          );
      }
    })
    .catch((error) => res.status(500).json({ error }));
}

export default {
  logIn,
  signUp,
};
