const { verifyGeneratedToken } = require("../services/authentication");

function checkForAuthenticatedUser(cookieName) {
    return (req, res, next) => {
        const token = req.cookies[cookieName];
        if (!token) {
            return next(); // No token, continue to next middleware
        }

        try {
            const payload = verifyGeneratedToken(token);
            req.user = payload;
            return next(); // Token verified, continue to next middleware
        } catch (error) {
            console.error("Error validating token:", error);
            // Decide how to handle the error - send response, redirect, etc.
            return res.status(401).json({ error: "Unauthorized" });
        }
    };
}

module.exports = {
    checkForAuthenticatedUser
}
