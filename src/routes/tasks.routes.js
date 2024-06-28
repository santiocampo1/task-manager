import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import { getAllTasks, getTask, createTask, deleteTask, updateTask } from "../controllers/tasks.controller.js";

const router = new Router();

router.get("/tasks", authRequired, getAllTasks);
router.get("/tasks:id", authRequired, getTask);
router.post("/tasks", authRequired, createTask);
router.delete("/tasks:id", authRequired, deleteTask);
router.put("/tasks:id", authRequired, updateTask);

export default router;