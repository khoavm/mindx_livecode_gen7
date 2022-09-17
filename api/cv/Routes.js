const Joi = require("joi");
const CVController = require("./Controllers");
const RESPONSE_CODE = require("../../constants/ResponseCode");
module.exports = [
	{
		path: "/cvs",
		method: "GET",
		auth: "test",
		handler: CVController.fetchCVs,
		summary: "get cv list",
		tags: ["cv"],
		response: {
			[RESPONSE_CODE.SUCCESS]: Joi.object({}),
		},
	},
	{
		path: "/cv",
		method: "GET",
		auth: "test",
		handler: CVController.fetchCVs,
		summary: "get cv info",
		tags: ["cv"],
		validate: {
			query: {
				cvId: Joi.string()
					.required()
					.min(0)
					.description("Cv id")
					.example("63259c2510192e0cec6688dd"),
			},
		},
		response: {
			[RESPONSE_CODE.SUCCESS]: Joi.object({}),
		},
	},
	{
		path: "/cv/download",
		method: "GET",
		auth: "test",
		handler: CVController.downloadCV,
		summary: "download cv",
		tags: ["cv"],
		validate: {
			query: {
				cvId: Joi.string()
					.required()
					.min(0)
					.description("Cv id")
					.example("63259c2510192e0cec6688dd"),
			},
		},
		response: {
			[RESPONSE_CODE.SUCCESS]: Joi.object({}),
		},
	},
	{
		path: "/cv",
		method: "POST",
		auth: "test",
		handler: CVController.createCV,
		summary: "Create new cv",
		tags: ["cv"],
		validate: {
			body: {
				name: Joi.string().example("a"),
				email: Joi.string().example("a"),
				mobile: Joi.string().example("a"),
				github: Joi.string().example("https://github.com"),
				linkedIn: Joi.string().example("https://linkedin.com"),
				summary: Joi.string().example("summary"),
				experiences: Joi.array().items(
					Joi.object({
						jobTitle: Joi.string().example("summary"),
						company: Joi.string().example("summary"),
						period: Joi.string().example("summary"),
						jobDescription: Joi.string().example("summary"),
					})
				),
				skills: Joi.array().items(Joi.string().example("summary")),
				university: Joi.string().example("summary"),
				faculty: Joi.string().example("summary"),
				gpa: Joi.number().example(10),
			},
		},
		response: {
			[RESPONSE_CODE.SUCCESS]: Joi.object({
				message: Joi.string()
					.required()
					.min(3)
					.description("Success Info")
					.example("Create cv successfully"),
			}),
		},
	},
	{
		path: "/cv",
		method: "PATCH",
		auth: "test",
		handler: CVController.updateCv,
		summary: "Update cv content",
		tags: ["cv"],
		validate: {
			query: {
				cvId: Joi.string()
					.required()
					.min(0)
					.description("Cv id")
					.example("63259c2510192e0cec6688dd"),
			},
			body: {
				name: Joi.string().example("a"),
				email: Joi.string().example("a"),
				mobile: Joi.string().example("a"),
				github: Joi.string().example("https://github.com"),
				linkedIn: Joi.string().example("https://linkedin.com"),
				summary: Joi.string().example("summary"),
				experiences: Joi.array().items(
					Joi.object({
						jobTitle: Joi.string().example("summary"),
						company: Joi.string().example("summary"),
						period: Joi.string().example("summary"),
						jobDescription: Joi.string().example("summary"),
					})
				),
				skills: Joi.array().items(Joi.string().example("summary")),
				university: Joi.string().example("summary"),
				faculty: Joi.string().example("summary"),
				gpa: Joi.number().example(10),
			},
		},
		response: {
			[RESPONSE_CODE.SUCCESS]: Joi.object({
				message: Joi.string()
					.required()
					.min(3)
					.description("Success Info")
					.example("Create cv successfully"),
			}),
		},
	},
	{
		path: "/cv",
		method: "DELETE",
		auth: "test",
		handler: CVController.deleteCv,
		summary: "Delete cv",
		tags: ["cv"],
		validate: {
			query: {
				cvId: Joi.string()
					.required()
					.min(0)
					.description("Cv id")
					.example("63259c2510192e0cec6688dd"),
			},
		},
		response: {
			[RESPONSE_CODE.SUCCESS]: Joi.object({
				message: Joi.string()
					.required()
					.min(3)
					.description("Success Info")
					.example("Create cv successfully"),
			}),
		},
	},
];
