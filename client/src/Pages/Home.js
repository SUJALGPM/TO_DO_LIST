import React, { useEffect, useState } from 'react';
import { BsCircleFill, BsFillTrashFill, BsCheckCircleFill } from 'react-icons/bs';
import axios from 'axios';
import { message } from "antd";

const Home = () => {

    //Handle the state of todos...
    const [completedTasks, setCompletedTasks] = useState([]);
    const [task, setTask] = useState("");
    const [count, setCount] = useState(0);
    const [todos, setTodos] = useState([]);


    // //Fetch the new added task to this page...
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:8500/api/get-todo-task");
                console.log("detail :", response.data);
                setTodos(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }

        //Call the function...
        fetchData();
    }, [count]);


    //Handle the task in form...
    const handleTask = async () => {
        const response = await axios.post("http://localhost:8500/api/add-todo-task", {
            Task: task
        });

        if (response) {
            console.log("New task added..");
            setCount(count + 1);
            message.success("New task added successfully...");
            setTask("");
        } else {
            console.log("Failed to add new task...");
            message.error("Failed to added new task...");
        }
    }

    //Handle the check task complete or not...
    const handleTaskCompletion = (index) => {
        if (completedTasks.includes(index)) {
            setCompletedTasks(completedTasks.filter(taskIndex => taskIndex !== index));
        } else {
            setCompletedTasks([...completedTasks, index]);
        }
    };

    //Update the task status...
    const handleTaskStatus = async (id) => {
        try {
            const response = await axios.put(`http://localhost:8500/api/update-todo-task/${id}`);

            if (response) {
                message.success("Task Status updated...");
            } else {
                message.error("Failed to update task status...");
            }
        } catch (err) {
            console.log(err);
        }
    }

    //Handle the delete task...
    const handleDelete = async (id) => {
        try {
            const response = await axios.post(`http://localhost:8500/api/delete-todo-task/${id}`);

            if (response.status === 201) {
                setCount(count - 1);
                message.success("Task deleted successfully...");
            } else {
                message.error("First complete task then delete..!!");
            }
        } catch (error) {
            console.error("Error deleting task:", error);
            message.error("Failed to delete task...");
        }
    }



    return (
        <div className='home' style={{ border: "2px solid black" }}>
            <div className='flex justify-center items-center bg-white bg-opacity-50 shadow-lg rounded-lg p-16 mt-10 '>
                <div className=''>
                    <h2 className='text-center text-xl md:text-2xl font-bold p-4'>To Do list Page</h2>


                    <div className='flex justify-center'>
                        <input type="text" name="task" value={task} id='tasktext' onChange={(e) => setTask(e.target.value)} className='border-2 border-gray-400 w-full h-10 p-2 rounded-md' />
                        <button type='button' onClick={handleTask} className='ml-1 px-4 py-2 bg-blue-500 h-10 text-white rounded-md'>Add</button>
                    </div>


                    <div className='overflow-y-auto h-80 p-2'>
                        {
                            todos.length === 0
                                ?
                                <div className='text-center'>
                                    <h2>No Record Found...!!</h2>
                                </div>
                                :
                                todos.map((todo, index) => (
                                    <div className={`task border-b-2 rounded-lg border-gray-400 h-16 ${completedTasks.includes(index) ? 'completed-task' : ''}`} key={index}>
                                        <p className={`area ${completedTasks.includes(index) ? 'checked' : ''}`} onClick={() => handleTaskCompletion(index)}>
                                            {completedTasks.includes(index) ? <BsCheckCircleFill className="icon" onClick={(e) => handleTaskStatus(todo._id)} /> : <BsCircleFill className="icon" onClick={(e) => handleTaskStatus(todo._id)} />}
                                            <span className={`task-text ${completedTasks.includes(index) ? 'completed-text' : ''}`}>{todo.task}</span>
                                        </p>
                                        <p className={`deleteicon ${completedTasks.includes(index) ? 'deleteicon-red' : ''}`}>
                                            <BsFillTrashFill onClick={(e) => handleDelete(todo._id)} />
                                        </p>
                                    </div>
                                ))
                        }
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Home;