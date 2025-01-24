import React, { useState, useEffect } from "react";
import "./TaskList.css";

const TaskList = ({ onTaskClick }) => {
  const [tasks, setTasks] = useState([]);

  // Fetch tasks from localStorage on component mount
  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  // Handle checkbox click (update task completion)
  const handleCheckboxClick = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks)); // Save updated tasks to localStorage
  };

  // Handle star click (like/unlike task)
  const handleStarClick = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, liked: !task.liked } : task
    );
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks)); // Save updated tasks to localStorage
  };

  // Render a single task
  const renderTask = (task) => (
    <div
      className={`task-item ${task.completed ? "completed" : ""}`}
      key={task.id}
    >
      {/* Checkbox */}
      <input
        type="checkbox"
        className="task-checkbox"
        checked={task.completed}
        onChange={() => handleCheckboxClick(task.id)}
      />
      {/* Task Title */}
      <span
        className="task-title"
        onClick={() => onTaskClick && onTaskClick(task)}
      >
        {task.title}
      </span>
      {/* Like/Unlike Star */}
      <i
        className={`star-icon ${task.liked ? "liked" : ""}`}
        onClick={() => handleStarClick(task.id)}
        title={task.liked ? "Unmark as Important" : "Mark as Important"}
      >
        ★
      </i>
    </div>
  );

  return (
    <div className="task-list">
      {/* Ongoing Tasks Section */}
      <h3 className="ongoing-section-title">Ongoing Tasks</h3>
      <div className="task-section">
        {tasks.filter((task) => !task.completed).map(renderTask)}
      </div>

      {/* Separator */}
      <hr className="separator" />

      {/* Completed Tasks Section */}
      <h3 className="completed-section-title">Completed Tasks</h3>
      <div className="task-section">
        {tasks.filter((task) => task.completed).map(renderTask)}
      </div>
    </div>
  );
};

export default TaskList;
