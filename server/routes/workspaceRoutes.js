import express from "express";
import { getUserWorkspaces, addMember } from "../controllers/workspaceController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const workspaceRouter = express.Router();

workspaceRouter.get('/', authMiddleware, getUserWorkspaces)
workspaceRouter.post('/add-member', authMiddleware, addMember)


export default workspaceRouter;