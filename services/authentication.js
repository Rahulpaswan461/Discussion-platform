const JWT = require("jsonwebtoken");
const secret = "rahul@#$%%^^1234";

// Create the token for authenticating user
function createTokenForAuthenticateUser(user) {
    const payload = {
        _id: user._id,
        name: user.name,
        mobile: user.mobile,
        email: user.email,
    };
    return JWT.sign(payload, secret, { algorithm: 'HS256' }); // Explicitly specify the algorithm
}

// Verify the generated token of the user
function verifyGeneratedToken(token) {
    if (!token) {
        throw new Error("Token is not present");
    }
    try {
        const decoded = JWT.verify(token, secret); // Explicitly specify the algorithm
        // console.log("Decoded Token:", decoded);
        return decoded;
    } catch (error) {
        console.error("Token Verification Error:", error);
        throw new Error("Invalid Token");
    }
}

module.exports = {
    createTokenForAuthenticateUser,
    verifyGeneratedToken
}
