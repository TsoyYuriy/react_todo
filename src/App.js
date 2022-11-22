import './App.css';
import React, {useState, useEffect} from 'react';
import Task from './components/Task/Task'
import AddTask from './components/AddTask/AddTask';

function App() {

  const getRandomKey = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);

  const [inputTodo, setInputTodo] = useState('');

  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('todos');
    const initialValue = JSON.parse(saved);
    return initialValue || [
        {id: getRandomKey(), todoText: 'Купить молоко', complete: false},
        {id: getRandomKey(), todoText: 'Погулять с собакой', complete: false},
        {id: getRandomKey(), todoText: 'Сделать домашку', complete: false}
      ];
  })
  

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(tasks));
  }, [tasks]);

  const addTodo = () => {
    const newTodo = {
      id: getRandomKey(),
      todoText: inputTodo,
      complete: false,
    }
    if (inputTodo.length < 1) {
      alert('Add new task!!!');
      return;
    }
    setTasks([newTodo, ...tasks]);
    setInputTodo('');
  };

  const removeTask = (id) => {
    const i = tasks.findIndex( task => task.id === id);
    const tasksCopy = [...tasks];
    tasksCopy.splice(i, 1);
    setTasks(tasksCopy);
  };

  const clickOnEnter = (e) => {
    if (e.keyCode === 13) {
      addTodo();
    }
  };

  const checkedTask = (e, id) => {
    const i = tasks.findIndex( task => task.id === id); 
    const tasksCopy = [...tasks];
    if (e.target.checked) {
      tasksCopy[i].complete = true;
    } else {
      tasksCopy[i].complete = false;
    }
    setTasks(tasksCopy);
  };

  return (
    <div className="App">
      <div className="header">
        <h1 className="header__title">To-Do List</h1>
        <AddTask
          onChange={e => setInputTodo(e.target.value)}
          value={inputTodo}
          btnAdd={addTodo}
          pressEnter={e => clickOnEnter(e)}
        />
      </div>
      
      <div className="todos">
        { tasks.map(t => {
          return <Task 
                  key={t.id}
                  taskText={t.todoText}
                  btnDeleteTask={() => removeTask(t.id)}
                  handleCheck={(e) => checkedTask(e, t.id)}
                  className={t.complete ? "checked-item" : "not-checked-item"}
                  checked={t.complete ? true : false}
                />
        })}
      </div>
    </div>
  );
}

export default App;