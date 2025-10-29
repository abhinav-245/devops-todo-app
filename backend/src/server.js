import app from "./app.js";
import dotenv from "dotenv";
import initDatabase from "./db/init.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

// Initialize database and start server
initDatabase().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
