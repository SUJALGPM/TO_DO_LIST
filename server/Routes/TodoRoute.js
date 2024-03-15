const express = require("express");
const { addTodo, getTodo, deleteTodo, updateTodoStatus } = require("../Controllers/TodoController");
const router = express.Router();

//Add new todo task....
router.post("/add-todo-task", addTodo);

//Get todos from task...
router.get("/get-todo-task", getTodo);

//Update todos from task....
router.put("/update-todo-task/:id", updateTodoStatus);

//Delete todos from task...
router.post("/delete-todo-task/:id", deleteTodo);

module.exports = router;