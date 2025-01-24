import { v4 as uuidv4 } from "uuid";

// Action Types
export const ADD_TASK = "ADD_TASK";
export const DELETE_TASK = "DELETE_TASK";
export const SELECT_TASK = "SELECT_TASK";
export const TOGGLE_TASK = "TOGGLE_TASK";
export const LIKE_TASK = "LIKE_TASK";

// Action Creators
export const addTask = (task) => (dispatch, getState) => {
  const newTask = { ...task, id: uuidv4(), completed: false, liked: false };
  const updatedTasks = [...getState().tasks, newTask];
  dispatch({ type: ADD_TASK, payload: newTask });
  saveTasksToStorage(updatedTasks); // Persist to storage
};

export const deleteTask = (taskId) => (dispatch, getState) => {
  const updatedTasks = getState().tasks.filter((task) => task.id !== taskId);
  dispatch({ type: DELETE_TASK, payload: taskId });
  saveTasksToStorage(updatedTasks); // Persist to storage
};

export const selectTask = (task) => ({
  type: SELECT_TASK,
  payload: task,
});

export const toggleTask = (taskId) => (dispatch, getState) => {
  const updatedTasks = getState().tasks.map((task) =>
    task.id === taskId ? { ...task, completed: !task.completed } : task
  );
  dispatch({ type: TOGGLE_TASK, payload: taskId });
  saveTasksToStorage(updatedTasks); // Persist to storage
};

export const likeTask = (taskId) => (dispatch, getState) => {
  const updatedTasks = getState().tasks.map((task) =>
    task.id === taskId ? { ...task, liked: !task.liked } : task
  );
  dispatch({ type: LIKE_TASK, payload: taskId });
  saveTasksToStorage(updatedTasks); // Persist to storage
};

// Local Storage Helpers
export const saveTasksToStorage = (tasks) => {
  try {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  } catch (error) {
    console.error("Failed to save tasks to storage:", error);
  }
};

export const loadTasksFromStorage = () => {
  try {
    const tasks = localStorage.getItem("tasks");
    console.log("Loaded tasks from localStorage:", tasks); 
    return tasks ? JSON.parse(tasks) : [];
  } catch (error) {
    console.error("Failed to load tasks from storage:", error);
    return [];
  }
};
