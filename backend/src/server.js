import "dotenv/config";

import app from "./app.js";
import pool from "./config/db.js";

const PORT = process.env.PORT || 5000;

pool
  .connect()
  .then(() => {
    console.log("Database Connected");

    app.listen(PORT, () => {
      console.log(`Server running on ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
