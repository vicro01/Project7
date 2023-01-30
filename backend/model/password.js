const passwordValidator = require("password-validator")

const schema = new passwordValidator();
 
schema
.is().min(8)                                    // Minimum size 8
.is().max(100)                                  // Max size 100
.has().uppercase()                              // Must contain capital letters
.has().lowercase()                              // Must contain lowercase letters
.has().digits(2)                                // Must be at least 2 digits
.has().not().spaces()                           // Must not contain spaces
.is().not().oneOf(['Passw0rd', 'Password123']); // Blacklist these values
 
module.exports = schema;