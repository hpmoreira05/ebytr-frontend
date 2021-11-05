import React, { useEffect, useState } from 'react';
import Task from '../components/Task'

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
      <div>Ola, {!isLoading && userName}</div>
      <label htmlFor="task">Tarefa</label>
      <input
        id="task"
        type="text"
        onChange={ (e) => setNewTask(e.target.value) }
        />
      <button onClick={() => fetchCreateTask()} disabled={newTask === '' && true}>+</button>
        {!isLoading && (
          <div>
            {tasks.map((task, index) => <Task key={index} task={task}/>)}
          </div>
      )}
    </>
  )
}

export default Home;