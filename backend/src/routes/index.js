import { Router } from "express";
import contestRouter from "./contest/contest.route.js";

const rootRouter = Router();

// Root route to return a welcome message
rootRouter.get("/", (req, res) => {
  res.json({ message: "Hello" });
});

// Use contest router for /contests endpoint
rootRouter.use("/contests", contestRouter);

export default rootRouter;
