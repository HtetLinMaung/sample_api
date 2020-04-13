"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Todo_1 = __importDefault(require("../models/Todo"));
exports.createTodo = (req, res) => {
    const { title, completed, userId } = req.body;
    const todo = new Todo_1.default({ title, completed, userId });
    todo
        .save()
        .then((result) => {
        res.status(201).json({ message: "Created Successfully", data: result });
    })
        .catch((err) => {
        res.status(400).json({ message: err.message });
    });
};
exports.fetchTodos = (req, res) => {
    let search = {};
    for (const [key, value] of Object.entries(req.query)) {
        if (key == "todoId") {
            search["_id"] = value;
        }
        else {
            search[key] = value;
        }
    }
    Todo_1.default.find(search)
        .then((results) => res.json(results))
        .catch((err) => res.status(400).json({ message: err.message }));
};
exports.fetchObjectById = (req, res, next) => {
    Todo_1.default.findById(req.params.id)
        .then((result) => {
        req.todo = result;
        next();
    })
        .catch((err) => res.status(400).json({ message: err.message }));
};
exports.fetchTodoById = (req, res) => res.json(req.todo);
exports.deleteTodo = (req, res) => {
    Todo_1.default.findByIdAndRemove(req.params.id)
        .then(() => res.sendStatus(204))
        .catch((err) => res.status(400).json({ message: err.message }));
};
exports.updateTodo = (req, res) => {
    const { todo } = req;
    for (const [key, value] of Object.entries(req.body)) {
        if (key != "_id")
            todo[key] = value;
    }
    todo
        .save()
        .then((result) => res.json({ message: "Updated Successfully", data: result }))
        .catch((err) => res.status(400).json({ message: err.message }));
};
