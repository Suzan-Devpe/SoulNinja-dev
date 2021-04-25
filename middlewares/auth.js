const jwt = require("jsonwebtoken");

const protectRoute = (req, res, next) => {
	const token = req.cookies.jwt;

	// making sure token exists in the cookies
	if (token) {
		// verify the token signature
		jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
			// wrong jwt token ( token has been tampered with or has expired )
			if (err) {
				res.redirect("/auth/login");
			}
			// best case scenario ( everything is perfect )
			else {
				next();
			}
		});
	}
	// if token does not exist in cookies, then go login
	else {
		res.redirect("/auth/login");
	}
};

module.exports = protectRoute;
