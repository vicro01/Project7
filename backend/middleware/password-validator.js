const passwordSchema = require("../model/password");

module.exports = (req, res, next) => {
    console.log('req',req.body);
    if(!passwordSchema.validate(req.body.password)){
        res.status(400).json({ error : "your password is not strong enough : " + passwordSchema.validate(req.body.password, {list : true})});
        console.log("your password is not strong enough!")
    }
    else{
        next();
    }
}