const Joi = require("joi");
const UserController = require("./Controllers");
const RESPONSE_CODE = require("../../constants/ResponseCode");
module.exports = [
	{
		path: "/users/signup",
		method: "POST",
		auth: false,
		handler: UserController.createUser,
		summary: "Create new user",
		tags: ["user"],
		validate: {
			body: {
				username: Joi.string().required().min(3).description("Username of user").example("khoa"),
				isAdmin: Joi.boolean(),
				password: Joi.string().required().min(1).description("Password of user").example("123456"),
			},
		},
		response: {
			[RESPONSE_CODE.SUCCESS]: Joi.object({
				token: Joi.string()
					.required()
					.min(3)
					.description("Success Info")
					.example("Create user successfully"),
			}),
		},
	},
	{
		path: "/users/login",
		method: "POST",
		auth: false,
		handler: UserController.login,
		summary: "Login user",
		tags: ["user"],
		validate: {
			body: {
				username: Joi.string().required().min(3).description("Username of user").example("khoa"),
				password: Joi.string().required().min(1).description("Password of user").example("123456"),
			},
		},
		response: {
			[RESPONSE_CODE.SUCCESS]: Joi.object({
				token: Joi.string()
					.required()
					.min(3)
					.description("Success Info")
					.example("Create user successfully"),
			}),
		},
	},
];
