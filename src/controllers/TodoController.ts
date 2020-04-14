import { RequestHandler } from "express";
import Todo, { ITodo } from "../models/Todo";

export const createTodo: RequestHandler = (req, res) => {
  const { title, completed, userId } = <ITodo>req.body;
  const todo: ITodo = new Todo({ title, completed, userId });
  todo
    .save()
    .then((result) => {
      res.status(201).json({ message: "Created Successfully", data: result });
    })
    .catch((err: Error) => {
      res.status(400).json({ message: err.message });
    });
};

export const fetchTodos: RequestHandler = (req, res) => {
  let search: any = {};

  for (const [key, value] of Object.entries(req.query)) {
    if (key == "todoId") {
      search["_id"] = value;
    } else {
      search[key] = value;
    }
  }

  Todo.find(search)
    .then((results) => res.json(results))
    .catch((err: Error) => res.status(400).json({ message: err.message }));
};

export const fetchObjectById: RequestHandler = (req: any, res, next) => {
  Todo.findById(req.params.id)
    .then((result) => {
      req.todo = result;
      next();
    })
    .catch((err: Error) => res.status(400).json({ message: err.message }));
};

export const fetchTodoById: RequestHandler = (req: any, res) =>
  res.json(req.todo);

export const deleteTodo: RequestHandler = (req, res) => {
  Todo.findByIdAndRemove(req.params.id)
    .then(() => res.sendStatus(204))
    .catch((err: Error) => res.status(400).json({ message: err.message }));
};

export const updateTodo: RequestHandler = (req: any, res) => {
  const { todo } = req;
  for (const [key, value] of Object.entries(req.body)) {
    if (key != "_id") todo[key] = value;
  }
  (todo as ITodo)
    .save()
    .then((result) =>
      res.json({ message: "Updated Successfully", data: result })
    )
    .catch((err: Error) => res.status(400).json({ message: err.message }));
};

export const completeAllTodos: RequestHandler = (req, res) => {
  Todo.updateMany({}, { $set: { completed: req.body.completed } })
    .then((result) =>
      res.json({ message: "Updated Successfully", data: result })
    )
    .catch((err: Error) => res.status(400).json({ message: err.message }));
};
