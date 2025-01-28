import { Router } from "express";
import { createTodo, updateTodo, deleteTodo, getTodos, updateCompleted } from "../controller/todocnt.js";


const router = Router();

router.post("/post", createTodo);
router.get("/get", getTodos);
router.put("/:todoId", updateTodo);
router.delete("/:todoId", deleteTodo);
router.put("/bolean/:todoId", updateTodo);

export default router;
