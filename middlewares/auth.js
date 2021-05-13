const jwt = require("jsonwebtoken");
const User = require("../models/user");

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

const setUserInfo = async (req, res, next) => {
	const token = req.cookies.jwt;

	// making sure token exists in the cookies
	if (token) {
		// verify the token signature
		jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
			// wrong jwt token ( token has been tampered with or has expired )
			// set user to null
			if (err) {
				res.locals.user = null;
				next();
			}
			// best case scenario ( everything is perfect )
			else {
				// find user in db, populate user info
				const user = await User.findById(decodedToken.id);
				res.locals.user = user;
				next();
			}
		});
	}
	// if token does not exist in cookies, then set user to null, and go to next middleware
	else {
		res.locals.user = null;
		next();
	}
};

module.exports = { protectRoute, setUserInfo };
