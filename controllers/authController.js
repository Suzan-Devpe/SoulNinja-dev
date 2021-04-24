// getRegister, postRegister, getLogin, postLogin, logOut

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/user");

// 3 days
const expireTime = 3 * 24 * 60 * 60;
const createToken = (id, name) => {
	return jwt.sign({ id, name }, process.env.JWT_SECRET, {
		expiresIn: expireTime,
	});
};

const getRegister = async (req, res, next) => {
	res.render("register");
};

const postRegister = async (req, res, next) => {
	const { name, email, password } = req.body;
	if (!name || typeof name != "string") {
		return res.json({
			status: "error",
			error: "Name doesnt pass all criterias",
		});
	}
	if (!password || password.length < 8) {
		return res.json({
			status: "error",
			error: "Password is not secure enough",
		});
	}

	const hashedPassword = await bcrypt.hash(password, 10);

	try {
		const user = await UserModel.create({
			name: name,
			email: email,
			password: hashedPassword,
		});

		const token = createToken(user.id, name);
		res.cookie("jwt", token, { httpOnly: true, maxAge: expireTime * 1000 });
		return res.json({ status: "ok" });
	} catch (err) {
		if (err.code === 11000) {
			return res.json({ status: "error", error: "Duplicate value found" });
		} else {
			return res.json({ status: "error", error: "Invalid data" });
		}
		throw err;
	}
};

const getLogin = async (req, res, next) => {
	res.render("login");
};

const postLogin = async (req, res) => {
	const { email, password } = req.body;

	try {
		// logging in user using the static method we put in the model
		const user = await UserModel.login(email, password);

		// creating the token to send back to the browser as a 🍪
		const token = createToken(user.id, user.name);
		res.cookie("jwt", token, { httpOnly: true, maxAge: expireTime * 1000 });
		res.status(200).json({ status: "ok" });
	} catch (err) {
		if (err.message === "incorrect") {
			console.log("found error m8");
			res
				.status(400)
				.json({ status: "error", error: "Incorrect email / password" });
		}
	}
};

// todo: logout functionality
const logOut = async (req, res, next) => {
	res.json({ success: true });
};

module.exports = {
	getRegister,
	postRegister,
	getLogin,
	postLogin,
	logOut,
};
