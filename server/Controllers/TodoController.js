const TodoModel = require("../Models/TodoModel");


//Add Todo task controller...
const addTodo = async (req, res) => {
    try {
        const Taskmsg = req.body.Task;

        if (!Taskmsg) {
            return res.status(404).send({ message: "TODO NOT FOUND..!!", success: false });
        }

        //Format data before pass to server...
        const formatedData = {
            task: Taskmsg
        }

        const newTodo = new TodoModel(formatedData);
        await newTodo.save();

        res.status(201).send({ message: "New TODOS Added successfully..." });
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "Server issue..!!!" })
    }
}

//Get Todo task controllerr...
const getTodo = async (req, res) => {
    try {
        const fetchData = await TodoModel.find({});
        res.status(201).json(fetchData);
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "Failed to load the todos data..!!" });
    }
}

//Update Todo task controller...
const updateTodoStatus = async (req, res) => {

    //Get the todo id...
    const todoId = req.params.id;

    //Check the todoTask exist or not...
    const todoExist = await TodoModel.findByIdAndUpdate(todoId,
        {
            isComplete: true
        },
        {
            new: true
        }
    );

    //Resposne if it not exist..
    if (!todoExist) {
        return res.status(404).send({ message: "Todo not found..!!!", success: false });
    }

    //If all ok...
    res.status(201).send({ message: "Todo Status updated successfully..", success: true });
}

//Delete Todo task controller...
const deleteTodo = async (req, res) => {

    try {

        //Get the task id...
        const taskId = req.params.id;

        //Check the task is complete or not...
        const checkTask = await TodoModel.findById(taskId);

        if (checkTask.isComplete === true) {
            //Delete particular task...
            const deleteTask = await TodoModel.findByIdAndDelete(taskId);

            //Check the task exist or not...
            if (!deleteTask) {
                return res.status(401).send({ message: "Task not found..!!!", success: false });
            }

            //If deleted successfully send the response...
            return res.status(201).send({ message: "Task delete successfully...", success: true });
        } else {
            return res.status(501).send({ message: "First Complete the Task..!!", success: false });
        }
    } catch (err) {
        console.log(err);
        return res.status(501).send({ message: "Failed to delete task...!!" });
    }


}



module.exports = { addTodo, getTodo, deleteTodo, updateTodoStatus }