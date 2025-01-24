import { ADD_TASK, DELETE_TASK, SELECT_TASK, TOGGLE_TASK, LIKE_TASK } from "./taskActions";
// import { loadTasksFromStorage } from "./taskActions";
import { loadTasksFromStorage, saveTasksToStorage } from "../utils/storage";

const initialState = {
  tasks: loadTasksFromStorage() || [], // Ensure tasks is always an array
  selectedTask: null,
};


const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TASK:
      const updatedTasksAdd = [...state.tasks, action.payload];
      localStorage.setItem("tasks", JSON.stringify(updatedTasksAdd)); // Persist to storage
      return { ...state, tasks: updatedTasksAdd };

    case DELETE_TASK:
      const updatedTasksDelete = state.tasks.filter(
        (task) => task.id !== action.payload
      );
      localStorage.setItem("tasks", JSON.stringify(updatedTasksDelete)); // Persist to storage
      return { ...state, tasks: updatedTasksDelete };

    case SELECT_TASK:
      return { ...state, selectedTask: action.payload };

    case TOGGLE_TASK:
      const toggledTasks = state.tasks.map((task) =>
        task.id === action.payload ? { ...task, completed: !task.completed } : task
      );
      localStorage.setItem("tasks", JSON.stringify(toggledTasks)); // Persist to storage
      return { ...state, tasks: toggledTasks };

    case LIKE_TASK:
      const likedTasks = state.tasks.map((task) =>
        task.id === action.payload ? { ...task, liked: !task.liked } : task
      );
      localStorage.setItem("tasks", JSON.stringify(likedTasks)); // Persist to storage
      return { ...state, tasks: likedTasks };

    default:
      return state;
  }
};

export default taskReducer;
