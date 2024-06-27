const express = require("express");
const App = express();
const db = require("./models");
const Port = process.env.Port || 3000;
const postRoutes = require("./routes/Posts");
const commentRoutes = require("./routes/Comments");
const userRoutes = require("./routes/User");
const likeRoutes = require("./routes/Likes");
const cors = require("cors");

App.use(express.json());
App.use(cors());

//Routes
App.use("/posts", postRoutes);
App.use("/comments", commentRoutes);
App.use("/auth", userRoutes);
App.use("/likes", likeRoutes);

db.sequelize.sync().then(() => {
  App.listen(Port, () => {
    console.log(`Serve at http://localhost:${Port}`);
  });
});
