const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const morgan = require("morgan");

const app = express();
const routes = require("./routes/posts");
const auth = require("./routes/Auth");

app.use(morgan("combined"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use("/api", routes);
app.use("/api", auth);

//connect to mongodb
//let mongodburl = "mongodb://localhost:27017";
let mongodburl = "mongodb://mongo:27017/app";
mongoose
  .connect(mongodburl)
  .then(() => {
    console.log("Connected to Database");
  })
  .catch(err => {
    console.log("Not Connected to Database ERROR! ", err);
  });
mongoose.Promise = global.Promise;
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);

app.use(express.static(path.join(__dirname, "public")));

const port = 8000 || process.env.port;

app.listen(port, () => console.log(`listening on port ${port}`));
