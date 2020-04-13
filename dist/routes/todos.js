"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const TodoController_1 = require("../controllers/TodoController");
const router = express_1.Router();
router.route("/").get(TodoController_1.fetchTodos).post(TodoController_1.createTodo);
router.use("/:id", TodoController_1.fetchObjectById);
router.route("/:id").get(TodoController_1.fetchTodoById).patch(TodoController_1.updateTodo).delete(TodoController_1.deleteTodo);
exports.default = router;
