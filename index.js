const express = require("express")
const bodyParser = require("body-parser")
const path = require("path")
const cors = require("cors")

const port = 5000;


const app = express();
app.use(cors())
app.use(express.static(path.join(__dirname, "public")));


app.use(bodyParser.urlencoded({extended: true}))

app.get('/', (req, res) => {
  // res.send("hello world")
  res.sendFile("/index.html")
});


const pdfRoute = require("./routes/pdfmake");
app.use("/pdfMake", pdfRoute)

app.listen(process.env.PORT || port, ()=> {
  console.log(`Server running at http://localhost:${port}/`)
})