import React from "react";
import "./TaskDetails.css";

const TaskDetails = ({ task, onClose }) => {
  // Toggle the starred state
  const handleStarClick = () => {
    task.isStarred = !task.isStarred;

    // Retrieve tasks from local storage
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      const tasks = JSON.parse(storedTasks);

      // Find the task and update its "isStarred" state
      const updatedTasks = tasks.map((t) =>
        t.id === task.id ? { ...t, isStarred: task.isStarred } : t
      );

      // Save the updated tasks back to local storage
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    }
  };

  // Delete the task
  const handleDeleteClick = () => {
    // Retrieve tasks from local storage
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      const tasks = JSON.parse(storedTasks);

      // Remove the task from the list
      const updatedTasks = tasks.filter((t) => t.id !== task.id);

      // Save the updated tasks back to local storage
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    }

    // Close the Task Details panel after deleting
    onClose();
  };

  return (
    <div className="task-details-sidebar">
      {/* Task Title */}
      <div className="task-title">
        <span>{task.title}</span>
        <span
          className={`star ${task.isStarred ? "starred" : ""}`}
          onClick={handleStarClick}
          title="Star/Unstar Task"
        >
          ★
        </span>
      </div>

      {/* Task Actions */}
      <div className="task-actions">
        <p>
          <span className="icon">＋</span>Add Step
        </p>
        <p>
          <span className="icon">🔔</span>Set Reminder
        </p>
        <p>
          <span className="icon">📅</span>Add Due Date
        </p>
        <p>
          <span className="icon">🔄</span>Repeat
        </p>
      </div>

      {/* Notes Section */}
      <div className="notes-section">
        <textarea
          placeholder="Add notes..."
          defaultValue={task.notes || ""}
          className="notes-textarea"
        ></textarea>
      </div>

      {/* Bottom Actions */}
      <div className="bottom-actions">
        <button className="close-btn" onClick={onClose}>
          ×
        </button>
        <span className="created-date">
          Created: {task.createdDate || "Unknown"}
        </span>
        <button className="delete-btn" title="Delete Task" onClick={handleDeleteClick}>
          🗑
        </button>
      </div>
    </div>
  );
};

export default TaskDetails;
