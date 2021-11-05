import React, { useState } from 'react';
import trash from '../images/Vectortrash.svg'
import play from '../images/Vectorplay.svg'
import done from '../images/Done.svg'
import inProgress from '../images/Pending.svg'
import '../styles/tasks.css';

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
      <section className="task">
        <div className="listItem">
          <div className="taskAndButton">
            <button className="statusBttn" disabled={toDo.status === 'Pendente' && true} onClick={() => fetchUpdateTaskDone()}>
              <img src={toDo.status === 'Pronto' ? done : inProgress} alt="icon"/>
            </button>
            <div>
              <div className="createdAt">{`Criado em: ${toDo.createdAt}`}</div>
              <div className="description">{toDo.description}</div>
            </div>
          </div>
          <div>
            <button className="playBttn" disabled={toDo.status !== 'Pendente' && true} onClick={() => fetchUpdateTaskInProgress()}><img src={play} alt="play"/></button>
            <button className="trashBttn" onClick={() => fetchDeleteTask()} ><img src={trash} alt="trash"/></button>
          </div>
        </div>
      </section>
    )}
    </>
  )
}

export default Task;