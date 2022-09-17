const mongoose = require("mongoose");
mongoose.connect("mongodb://khoavm:example@localhost:27017/mindx_livecode?authSource=admin", {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

module.exports = mongoose;
