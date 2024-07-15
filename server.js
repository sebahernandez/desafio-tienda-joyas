import express from "express";
import cors from "cors";
import joyasRoutes from "./routes/joyasRoutes.js";
import logger from "./middlewares/logger.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(logger);

app.use("/joyas", joyasRoutes);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
