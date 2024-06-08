const express = require("express");
const app = express();
require("dotenv").config();
const connection = require("./config/database");
const viewEngineConfig = require("./config/viewEngineConfig");
const routerWeb = require("./routes/web");
// config
app.use(express.json());
viewEngineConfig(app);
// Định nghĩa một route đơn giản
app.use("/", routerWeb);

// Định nghĩa một API endpoint
app.post("/api/save", (req, res) => {
  const newItem = req.body;
  const query = "INSERT INTO images (link) VALUES (?)";
  connection.query(query, [newItem.link], (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    newItem.id = result.insertId;
    res.json(newItem);
  });
});

app.get("/api/images/:id", (req, res) => {
  const itemId = req.params.id;
  const query = "SELECT * FROM images WHERE id = ?";
  connection.query(query, [itemId], (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (results.length === 0) {
      res.status(404).json({ error: "Item not found" });
      return;
    }
    const json = {
      messages: [
        {
          attachment: {
            type: "image",
            payload: {
              url: results[0]?.link,
            },
          },
        },
      ],
    };
    res.json(json);
  });
});
// Bắt đầu server
app.listen(process.env.PORT, () => {
  console.log(`Server đang chạy tại http://localhost:${process.env.PORT}`);
});
