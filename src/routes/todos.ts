import { Router } from "express";
import {
  createTodo,
  fetchTodos,
  fetchTodoById,
  fetchObjectById,
  deleteTodo,
  updateTodo,
} from "../controllers/TodoController";

const router = Router();

router.route("/").get(fetchTodos).post(createTodo);

router.use("/:id", fetchObjectById);

router.route("/:id").get(fetchTodoById).patch(updateTodo).delete(deleteTodo);

export default router;
