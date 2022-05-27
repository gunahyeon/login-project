const randToken = require("rand-token");
const jwt = require("jsonwebtoken");
const secretKey = require('../config/secretKey').secretKey;
const option = require('../config/secretKey').option;
const TOKEN_EXPIRED = -3;
const TOKEN_INVALID = -2;

module.exports = {
    sign : async (user) => {
        const payload = {
            userid:user.userid,
            userpsword:user.userpsword,
        };
        const result = {
            token : jwt.sign(payload, secretKey, option),
            refreshToken : randToken.uid(256)
        };
        return result;
    },
    verify : async (token) => {
        let decoded;
        try {
            decoded = jwt.verify(token, secretKey);
        } catch (err) {
            if(err.msg === 'jwt expired') {
                console.log('expired token');
                return TOKEN_EXPIRED;
            } else if (err.msg === 'invalid token') {
                console.log('invalid token');
                console.log(TOKEN_INVALID);
                return TOKEN_INVALID;
            } else {
                console.log("invalid token");
                return TOKEN_INVALID;
            }
        }
        return decoded;
    }
}