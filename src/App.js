import React, { useState } from "react";
import { Provider } from "react-redux";
import Sidebar from "./components/Sidebar";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import TaskDetails from "./components/TaskDetails";
import store from "./store";
import "./App.css";

const App = () => {
  const [selectedTask, setSelectedTask] = useState(null);

  const handleTaskClick = (task) => {
    setSelectedTask(task);
  };

  const closeTaskDetails = () => {
    setSelectedTask(null);
  };

  return (
    <Provider store={store}>
      <div className="app">
        <Sidebar />
        <div className="main-content">
          <header className="app-header">Today</header>
          <div className="content-layout">
            <div className="task-container">
              <TaskInput />
              <TaskList onTaskClick={handleTaskClick} />
            </div>
            {selectedTask && (
              <TaskDetails task={selectedTask} onClose={closeTaskDetails} />
            )}
          </div>
        </div>
      </div>
    </Provider>
  );
};

export default App;
