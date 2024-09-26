import express from "express";
import rootRouter from "./routes/index.js";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/api", rootRouter);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running.`);
});
// export default app;
