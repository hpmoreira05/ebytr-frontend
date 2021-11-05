import React, { useEffect, useState } from 'react';
import Task from '../components/Task'
import logo from '../images/logo.png'
import '../styles/tasks.css'

function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const [tasks, setTasks] = useState();
  const [newTask, setNewTask] = useState('');
  const [userName, setUserName] = useState('')

  async function fetchTasks() {
    const token = localStorage.getItem('token')
    const requestOptions = {
      method: 'GET',
      headers: {'Content-type': 'application/json', 'Accept': 'application/json', 'Authorization': `${token}`},
    }
    const task = await fetch('http://localhost:8080/tasks', requestOptions);
    const response = await task.json();
    setTasks(response);
    setIsLoading(false)
  }

  async function fetchUser() {
    const token = localStorage.getItem('token')
    const requestOptions = {
      method: 'GET',
      headers: {'Content-type': 'application/json', 'Accept': 'application/json', 'Authorization': `${token}`},
    }
    const task = await fetch('http://localhost:8080/users', requestOptions);
    const response = await task.json();
    setUserName(response);
  }

  async function fetchCreateTask() {
    const token = localStorage.getItem('token')
    const requestOptions = {
      method: 'POST',
      headers: {'Content-type': 'application/json', 'Accept': 'application/json', 'Authorization': `${token}`},
      body: JSON.stringify({
        description: newTask
      })
    }
    const task = await fetch('http://localhost:8080/tasks', requestOptions);
    const response = await task.json();
    console.log(response);
    fetchTasks()
    setNewTask('')
    document.getElementById("task").value = ''
  }

  useEffect( () => {
    fetchUser()
    fetchTasks()
    console.log(tasks) 
  }, [])

  return (
    <>
      <section className="home">
        <div className="homeHeader">
          <img src={logo} alt="logo" className="logoSmall"/>
          <div className="homeContainer">
            <h2>Ola, {!isLoading && userName}</h2>
            <div>
              <label htmlFor="task">Tarefa</label>
              <div className="addTaskContainer">
                <input
                  id="task"
                  type="text"
                  onChange={ (e) => setNewTask(e.target.value) }
                  />
                <button onClick={() => fetchCreateTask()} disabled={newTask === '' && true}>+</button>
              </div>
            </div>
          </div>
        </div>
          {!isLoading && (
            <div className="tasks">
              {tasks.map((task, index) => <Task key={index} task={task}/>)}
            </div>
        )}
      </section>
    </>
  )
}

export default Home;