import { createContext, useContext, useState } from "react";
import { createTaskRequest, getTasksRequest, deleteTaskRequest, getTaskRequest } from "../api/tasks";

const TaskContext = createContext();

export const useTasks = () => {
    const context = useContext(TaskContext);

    if (!context) {
        throw new Error('useTasks must be used within a TaskProvider');
    }

    return context;
}

export function TaskProvider({ children }) {
    const [tasks, setTasks] = useState([]);

    const getTasks = async () => {
        try {
            const res = await getTasksRequest();
            setTasks(res.data);
        } catch (error) {
            console.error(error)
        }
    }

    const createTask = async (task) => {
        const res = await createTaskRequest(task);
        console.log(res);
    }

    const deleteTask = async (id) => {
        try {
            const res = await deleteTaskRequest(id);
            console.log(res);
            getTasks(); // After deleting a task, update the tasks list
        } catch (error) {
            console.log(error);
        }
    }

    const getTask = async (id) => {
        const res = await getTaskRequest(id);
        console.log(res);
        l
    }

    return (
        <TaskContext.Provider
            value={{
                tasks,
                createTask,
                getTasks,
                deleteTask,
                getTask
            }}
        >
            {children}
        </TaskContext.Provider>
    )
}