const { JWT_SECRET } = require("../config/dev");
module.exports = {
	name: "test",
	secretOrKey: JWT_SECRET.TEST,
	handler: (jwtPayload, done) => {
		console.log(jwtPayload);
		return done(null, jwtPayload);
	},
};
