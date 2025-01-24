import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/authSlice';
import { addTask, deleteTask } from '../store/taskSlice';
import axios from 'axios';
// import './TasksPage.css';

const TaskPage = () => {
  const [newTask, setNewTask] = useState('');
  const [weather, setWeather] = useState(null);
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks);

  useEffect(() => {
    axios
      .get('https://api.openweathermap.org/data/2.5/weather?q=London&appid=YOUR_API_KEY')
      .then((response) => setWeather(response.data))
      .catch((error) => console.error('Error fetching weather:', error));
  }, []);

  const handleAddTask = () => {
    if (newTask.trim()) {
      dispatch(addTask(newTask));
      setNewTask('');
    }
  };

  return (
    <div className="task-page">
      <header>
        <h1>To-Do App</h1>
        <button onClick={() => dispatch(logout())}>Logout</button>
      </header>
      <div className="weather">
        {weather ? <p>Weather: {weather.weather[0].description}</p> : <p>Loading weather...</p>}
      </div>
      <div className="task-input">
        <input
          type="text"
          placeholder="Add a task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={handleAddTask}>Add</button>
      </div>
      <ul className="task-list">
        {tasks.map((task, index) => (
          <li key={index}>
            {task}
            <button onClick={() => dispatch(deleteTask(index))}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskPage;