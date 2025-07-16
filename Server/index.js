const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");
const auththentication = require("./routes/authentication")

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

const port = 5000;

app.post("/reguser", auththentication);
app.post("/loguser",auththentication);




app.listen(port, () => {
    console.log(`Server is running on localhost:${port}`);
})