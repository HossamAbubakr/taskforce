import { createContext, ReactNode, useReducer } from "react";
import { TaskContextType } from "@customTypes/contextTypes";
import { NewTask, Task } from "@customTypes/apiTypes";
import {
  getTasks as fetchTasksFromAPI,
  getTask as fetchTaskFromAPI,
  createTask as createTaskInAPI,
  updateTask as updateTaskInAPI,
  deleteTask as deleteTaskInAPI,
} from "@services/taskApi";
import { taskReducer, TaskState } from "@reducers/taskReducer";

const initialTaskState: TaskState = {
  tasks: [],
  task: null,
};

export const TaskContext = createContext<TaskContextType | undefined>(
  undefined
);

export function TaskProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(taskReducer, initialTaskState);

  const fetchTasks = async () => {
    const data = await fetchTasksFromAPI();
    dispatch({ type: "SET_TASKS", payload: data });
  };

  const fetchTask = async (id: number) => {
    const data = await fetchTaskFromAPI(id);
    dispatch({ type: "SET_TASK", payload: data });
  };

  const createTask = async (newTask: NewTask) => {
    const createdTask = await createTaskInAPI(newTask);
    dispatch({ type: "ADD_TASK", payload: createdTask });
  };

  const updateTask = async (id: number, updatedTask: Task) => {
    const updatedTaskFromAPI = await updateTaskInAPI(id, updatedTask);
    dispatch({ type: "UPDATE_TASK", payload: updatedTaskFromAPI });
  };

  const deleteTask = async (id: number) => {
    await deleteTaskInAPI(id);
    dispatch({ type: "DELETE_TASK", payload: id });
  };

  return (
    <TaskContext.Provider
      value={{
        tasks: state.tasks,
        task: state.task,
        fetchTasks,
        fetchTask,
        createTask,
        updateTask,
        deleteTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}
