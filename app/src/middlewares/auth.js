const jwt = require("../modules/jwt");

const authUtil = {
    checkToken : async (req, res, next) =>{
        var token = req.headers.token;
        const user = await jwt.verify(token);
        if(user === TOKEN_EXPIRED) return res.json();
        if(user === TOKEN_INVALID) return res.json();
    }
}
module.exports = authUtil;