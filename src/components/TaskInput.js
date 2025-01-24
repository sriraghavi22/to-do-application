import React, { useState } from "react";
import "./TaskInput.css";

const TaskInput = ({ onTasksUpdate }) => {
  const [taskTitle, setTaskTitle] = useState("");

  // Add task and store it in local storage
  const handleAddTask = () => {
    if (!taskTitle.trim()) return;

    const newTask = {
      id: Date.now(),
      title: taskTitle,
      completed: false,
      liked: false,
    };

    let existingTasks = [];

    // Safely retrieve and parse existing tasks from local storage
    try {
      const storedTasks = localStorage.getItem("tasks");
      if (storedTasks) {
        existingTasks = JSON.parse(storedTasks);
      }
    } catch (error) {
      console.error("Error parsing tasks from local storage:", error);
      localStorage.removeItem("tasks");
      existingTasks = [];
    }

    const updatedTasks = [...existingTasks, newTask];
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));

    if (onTasksUpdate) {
      onTasksUpdate(updatedTasks);
    }

    setTaskTitle("");
  };

  return (
    <div className="task-input-container">
      {/* Dropdown Section */}
      <div className="dropdown">
        <span className="dropdown-label">To Do</span>
        <div className="dropdown-arrow">▼</div>
      </div>

      {/* Separator */}
      <hr className="separator" />

      {/* Task Input Section */}
      <div className="task-input">
        <input
          type="text"
          className="input-field"
          placeholder="Add a Task"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleAddTask()}
        />
        {/* Icons */}
        <div className="icon-container">
          <i className="icon bell-icon" title="Set Reminder">🔔</i>
          <i className="icon loop-icon" title="Repeat Task">🔄</i>
          <i className="icon calendar-icon" title="Set Due Date">📅</i>
        </div>
        {/* Add Task Button */}
        <button className="add-task-btn" onClick={handleAddTask}>
          Add Task
        </button>
      </div>
    </div>
  );
};

export default TaskInput;
