import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import { getAllTasks, getTask, createTask, deleteTask, updateTask } from "../controllers/tasks.controller.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { createTaskSchema } from "../schemas/task.schema.js";

const router = new Router();

router.get("/tasks", authRequired, getAllTasks);
router.get("/tasks/:id", authRequired, getTask);
router.post("/tasks", authRequired, validateSchema(createTaskSchema), createTask);
router.delete("/tasks/:id", authRequired, deleteTask);
router.put("/tasks/:id", authRequired, updateTask);

export default router;