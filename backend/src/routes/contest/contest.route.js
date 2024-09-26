import { Router } from "express";
import { UpcomingContestsController } from "./contest.controller.js";

const contestRouter = Router();

contestRouter.get("/upcoming", UpcomingContestsController);

export default contestRouter;
