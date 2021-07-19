const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
const mongoose = require("mongoose");

const port = 5000;

mongoose.connect(
	"mongodb+srv://ayooluwa:Oluwayemisi1.@joafxcluster.cbicu.mongodb.net/userDb",
	{ useNewUrlParser: true },
	{ useUnifiedTopology: true }
);


const userSchema = {
	firstName: String,
	lastName: String,
	telephone: String,
	message: String,
};

const User = mongoose.model("User", userSchema);


const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, "/")));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
	res.sendFile("index.html");
});

app.post("/pdfMake/pdf", (req, res) => {
	let newUser = new User({
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		telephone: req.body.telephone,
		message: req.body.message,
	});
	newUser.save();
	res.redirect("/");
});

const pdfRoute = require("./routes/pdfmake");
app.use("/pdfMake", pdfRoute);

app.listen(process.env.PORT || port, () => {
	console.log(`Server running at http://localhost:${port}/`);
});
