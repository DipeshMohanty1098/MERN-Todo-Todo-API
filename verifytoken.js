const jwt = require('jsonwebtoken');
require('dotenv/config')

module.exports = function (req, res, next){
    const token = req.header('auth-token');
    if (!token) return res.status(400).send({message: "Sign in again to continue using the app"});

    try{
        const verified = jwt.verify(token, `${process.env.TOKEN_SECRET}`);
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).send({message: "Invalid token, access denied"});
    }

}