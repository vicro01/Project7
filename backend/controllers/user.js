const bcrypt = require('bcrypt');  //hashage
const jwt = require('jsonwebtoken');
const db = require("../database_connect");
require('dotenv').config();

//Inscription
exports.signup = (req, res, next) => {
  //Verify if email is available
//   console.log('req', req);
  db.query(`SELECT * FROM users WHERE email='${req.body.email}'`,
          (err, results) => {
            // console.log(err, results, 'hey');
              //If email is already used 
              if (results.length > 0) {
                  res.status(401).json({
                      message: 'Email already in use.'
                  });
                  //If email is available
              } else {
              //Encrypt hash
              console.log('line 21');
              bcrypt.hash(req.body.password, 10)
              .then(cryptedPassword => {
                // INSERT INTO users (password, username, email, is_admin ...) VALUES ('${cryptedPassword}', '${req.body.username}', '${req.body.email}','${req.body.is_admin}' ...);
                  db.query(`INSERT INTO users (password, email) VALUES ('${cryptedPassword}', '${req.body.email}');`,
                      (err, results, fields) => {
                        console.log(err, results, 'line 26');
                          if (err) {
                            //   console.log(req.body);
                              console.log(err, 'line 29');
                              return res.status(400).json("error!");
                          }
                          return res.status(201).json({
                              message: 'Your account was created !'
                          });
                      }
                  );
              })
              .catch(error => res.status(500).json({
                  error
              }));
          }
          });
};

//Connect
exports.login = (req, res, next) => {
  //search for user
  console.log(req.body.email);
  db.query(`SELECT * FROM users WHERE email='${req.body.email}'`,
      (err, result, rows) => {
          //if user found : 
        //   console.log(result[0].password);

          if (result.length > 0) {
              //verify pass
              bcrypt.compare(req.body.password, result[0].password)
                  .then(valid => {
                      //if pass not correc
                      if (!valid) {
                          res.status(401).json({
                              message: 'Your password is not correct.'
                          });
                          //if pass correct create token
                      } else {
                          res.status(200).json({
                              id: result[0].id,
                              username: result[0].username,
                              email: result[0].email,
                              is_admin: result[0].is_admin,
                              token: jwt.sign({
                                  userId: result[0].id
                              }, 'RANDOM_TOKEN_SECRET', {
                                  expiresIn: '24h'
                              })
                          });
                      }
                  });
          } else {
              res.status(404).json({
                  message: 'Unknown user.'
              });
          }
      }
  );
};

// Delete User
exports.deleteUser = (req, res, next) => {
  db.query(`DELETE FROM users WHERE id = ${req.params.id}`, (error, result, field) => {
      if (error) {
          return res.status(400).json({
              error
          });
      }
      return res.status(200).json(result);
  });
};