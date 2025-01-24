import React, { useState, useEffect } from "react";
import "./Sidebar.css"; // Make sure your CSS file matches the new layout and colors
import "@fortawesome/fontawesome-free/css/all.min.css";
import userPhoto from "./photo.jpeg";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [progress, setProgress] = useState({ done: 0, pending: 0 });

  const fetchTasksFromLocalStorage = () => {
    try {
      const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
      return storedTasks;
    } catch (error) {
      console.error("Error fetching tasks from local storage:", error);
      return [];
    }
  };

  useEffect(() => {
    const calculateProgress = () => {
      const tasks = fetchTasksFromLocalStorage();
      const completedTasks = tasks.filter((task) => task.completed).length;
      const totalTasks = tasks.length;
      const pendingTasks = totalTasks - completedTasks;

      setProgress({
        done: completedTasks,
        pending: pendingTasks,
        percentage: totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0,
      });
    };

    calculateProgress();

    // Add a listener for localStorage changes (e.g., when tasks are updated elsewhere)
    const handleStorageChange = () => {
      calculateProgress();
    };

    window.addEventListener("storage", handleStorageChange);

    // Cleanup listener
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
      {/* Hamburger Menu */}
      <div className="hamburger-menu" onClick={toggleSidebar}>
        <i className="fas fa-bars"></i>
      </div>

      {/* User Information */}
      {!isCollapsed && (
        <div className="user-info">
          <img src={userPhoto} alt="User Avatar" />
          <h3>Hey, ABCD</h3>
        </div>
      )}

      {/* Menu Items */}
      <div className="menu">
        <ul>
          <li>
            <i className="fas fa-tasks"></i> {!isCollapsed && "All Tasks"}
          </li>
          <li>
            <i className="fas fa-calendar-day"></i> {!isCollapsed && "Today"}
          </li>
          <li>
            <i className="fas fa-star"></i> {!isCollapsed && "Important"}
          </li>
          <li>
            <i className="fas fa-clipboard"></i> {!isCollapsed && "Planned"}
          </li>
          <li>
            <i className="fas fa-user"></i> {!isCollapsed && "Assigned to me"}
          </li>
        </ul>
      </div>

      {/* Add List Button */}
      <div className="add-list">
        <i className="fas fa-plus"></i> {!isCollapsed && "Add list"}
      </div>

      {/* Progress Section */}
      {!isCollapsed && (
        <div className="progress-section">
          <h4>Today Tasks</h4>
          {/* Donut Chart */}
          <div className="progress-donut">
            <svg viewBox="0 0 36 36" className="circular-chart">
              <path
                className="circle-bg"
                d="M18 2.0845
                   a 15.9155 15.9155 0 0 1 0 31.831
                   a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="circle"
                strokeDasharray={`${progress.percentage}, 100`}
                d="M18 2.0845
                   a 15.9155 15.9155 0 0 1 0 31.831
                   a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <text x="18" y="20.35" className="percentage">
                {progress.percentage}%
              </text>
            </svg>
          </div>
          <div className="progress-label">
            <span className="pending">Pending: {progress.pending}</span>
            <span className="done">Done: {progress.done}</span>
            <i className="fas fa-info-circle info-icon"></i>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
