const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

let projectData = {};

app.post("/add", (req, res) => {
    projectData = req.body;
    res.send(projectData);
});

app.get("/all", (req, res) => {
    res.send(projectData);
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
