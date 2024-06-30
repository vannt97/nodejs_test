const express = require("express");
const app = express();
require("dotenv").config();
const connection = require("./config/database");
const viewEngineConfig = require("./config/viewEngineConfig");
const routerWeb = require("./routes/web");
// const path = require("path");
// app.use('/images', express.static(path.join(__dirname, '/public/images')));
// config
app.use(express.json());
// viewEngineConfig(app);
// Định nghĩa một route đơn giản
// app.use("/", routerWeb);

// Định nghĩa một API endpoint

connection
  .init()
  .then(() => {
    console.log("ket noi db thanh cong");
    
    app.post("/api/webhook", (req, res) => {
      const payload = req.body;
      console.log("api/webhook: ", payload);
      res.status(200).send("Success");
    });

    app.post("/api/save", async (req, res) => {
      const newItem = req.body;
      try {
        let result = await connection.storeItem(newItem);
        res.json(result);
      } catch (err) {
        res.status(500).json(err);
      }
    });

    app.get("/api/images/:id", async (req, res) => {
      const itemId = req.params.id;
      try {
        const item = await connection.getItem(itemId);
        const json = {
          messages: [
            {
              attachment: {
                type: "image",
                payload: {
                  url: item.link,
                },
              },
            },
          ],
        };
        res.json(json);
      } catch (err) {
        if (err) {
          res.status(500).json({ error: err.message });
          return;
        }
      }
      // const query = "SELECT * FROM images WHERE id = ?";
      // connection.query(query, [itemId], (err, results) => {
      //   console.log("err: ", err);
      //   console.log("results: ", results);
      //   if (err) {
      //     res.status(500).json({ error: err.message });
      //     return;
      //   }
      //   if (results.length === 0) {
      //     res.status(404).json({ error: "Item not found" });
      //     return;
      //   }
      //   const json = {
      //     messages: [
      //       {
      //         attachment: {
      //           type: "image",
      //           payload: {
      //             url: results[0]?.link,
      //           },
      //         },
      //       },
      //     ],
      //   };
      //   res.json(json);
      // });
    });

    app.get("/api/images", async (req, res) => {
      const items = await connection.getItems();
      console.log("items: ", items);
      res.send(items);
    });
    app.listen(process.env.PORT, () => {
      console.log(`Server đang chạy tại http://localhost:${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error("errrrr: ", err);
    process.exit(1);
  });

// Bắt đầu server
