// utils/storage.js
export const loadTasksFromStorage = () => {
    try {
      const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
      return tasks; // Return tasks array or empty array if nothing is in localStorage
    } catch (error) {
      console.error("Error loading tasks from localStorage:", error);
      return [];
    }
  };
  
  export const saveTasksToStorage = (tasks) => {
    try {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    } catch (error) {
      console.error("Error saving tasks to localStorage:", error);
    }
  };
  