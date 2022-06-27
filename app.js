const express = require("express");
const bodyParser = require("body-parser");
const shopRoutes = require("./routes/shop");
const adminRoutes = require("./routes/admin");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));

app.use(shopRoutes);
app.use("/admin", adminRoutes);

app.listen(3000, () => {
  console.log("running on 3000");
});
