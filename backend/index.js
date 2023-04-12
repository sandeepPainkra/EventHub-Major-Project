const express = require("express");
const app = express();

const PORT = 5000;
app.get((req, res) => {
  res.send("hello buddy");
});

app.listen(PORT, () => {
  console.log("Server is listening in port 5000");
});
