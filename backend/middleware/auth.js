const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];      //extract the token from the "authorization" header and we take the part located after the space
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const id_user = decodedToken.userId;
    console.log(token)
    console.log(decodedToken)
    console.log(id_user)

    if (req.body.id_user && req.body.id_user !== id_user) {    //if the request contains an id, it is compared to that extracted from the token
      throw 'Incorrect user ID';
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};