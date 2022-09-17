const UserModel = require("../../model/User");

const RESPONSE_CODE = require("../../constants/ResponseCode");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_KEY = require("../../config/dev").JWT_SECRET.TEST;
module.exports = {
	createUser: async (req, res) => {
		try {
			const { username, password, isAdmin } = req.body;
			const salt = await bcrypt.genSalt(12);
			const hashedPassword = await bcrypt.hash(password, salt);
			const user = await UserModel.create({ username, password: hashedPassword, isAdmin });
			if (!user) {
				return res.status(RESPONSE_CODE.SERVER_ERROR).send({ message: req.t("SERVER_ERROR") });
			}
			var token = jwt.sign(
				{ id: user._id, username: user.username, fullName: user.fullName, isAdmin: user.isAdmin },
				JWT_KEY,
				{ expiresIn: 60 * 60 }
			);
			return res.send({
				token,
			});
		} catch (error) {
			console.log(error);
			return res.status(RESPONSE_CODE.SERVER_ERROR).send({ message: error.message });
		}
	},
	login: async (req, res) => {
		try {
			const { username, password } = req.body;
			const user = await UserModel.findOne({ username });
			if (!user) {
				return res.status(RESPONSE_CODE.BAD_REQUEST).send({ message: req.t("User not found") });
			}
			const passwordMatch = await bcrypt.compare(password, user.password);

			if (!passwordMatch) {
				return res
					.status(RESPONSE_CODE.SERVER_ERROR)
					.send({ message: req.t("Password not correct") });
			}
			var token = jwt.sign(
				{ id: user._id, username: user.username, fullName: user.fullName },
				JWT_KEY,
				{ expiresIn: 60 * 60 * 24 * 30 }
			);
			return res.send({
				token,
			});
		} catch (error) {
			console.log(error);
			return res.status(RESPONSE_CODE.SERVER_ERROR).send({ message: error.message });
		}
	},
};
