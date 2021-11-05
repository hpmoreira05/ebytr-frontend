import React, { useState } from 'react';

function Task({task}) {
  const [toDo, setToDo] = useState(task)

  async function fetchDeleteTask() {
    const token = localStorage.getItem('token')
    const requestOptions = {
      method: 'DELETE',
      headers: {'Content-type': 'application/json', 'Accept': 'application/json', 'Authorization': `${token}`},
    }
    const task = await fetch(`http://localhost:8080/tasks/${toDo._id}`, requestOptions);
    const response = await task.json();
    console.log(response)
    setToDo(null);
  }

  async function fetchUpdateTaskInProgress() {
    const token = localStorage.getItem('token')
    const requestOptions = {
      method: 'PUT',
      headers: {'Content-type': 'application/json', 'Accept': 'application/json', 'Authorization': `${token}`},
      body: JSON.stringify({
        status: 'Em andamento'
      })
    }
    const task = await fetch(`http://localhost:8080/tasks/${toDo._id}`, requestOptions);
    const response = await task.json();
    console.log(response)
    setToDo({...toDo, status: 'Em andamento'});
  }

  async function fetchUpdateTaskDone() {
    const token = localStorage.getItem('token')
    const requestOptions = {
      method: 'PUT',
      headers: {'Content-type': 'application/json', 'Accept': 'application/json', 'Authorization': `${token}`},
      body: JSON.stringify({
        status: 'Pronto'
      })
    }
    const task = await fetch(`http://localhost:8080/tasks/${toDo._id}`, requestOptions);
    const response = await task.json();
    console.log(response)
    setToDo({...toDo, status: 'Pronto'});
  }

  return (
    <>
    {toDo && (
      <div>
        <button onClick={() => fetchUpdateTaskDone()}>{toDo.status}</button>
        <div>{`Criado em: ${toDo.createdAt}`}</div>
        <div>{toDo.description}</div>
        <button onClick={() => fetchUpdateTaskInProgress()}>Play</button>
        <button onClick={() => fetchDeleteTask()} >Lixo</button>
      </div>
    )}
    </>
  )
}

export default Task;