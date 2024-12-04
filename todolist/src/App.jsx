import { useId, useRef, useState } from 'react'
import { Input } from './form/Input'

const tasksInit = [
  {
      "id": Date.now(),
      "name": "Faire les courses",
      "completed": false,
  },
  {
      "id": Date.now() + 1,
      "name": "Mettre de l'essence",
      "completed": false,
  },
  {
      "id": Date.now() + 2,
      "name": "Appeler grand mère",
      "completed": false,
  }
]



function App() {

  const [tasks, setTasks] = useState(tasksInit)

  const addNewTask = (e) => {
    e.preventDefault()

    const newTask = {
      "id": Date.now(),
      "name": e.target.new_task.value,
      "completed": false,
    }

    if(e.target.new_task.value){
      setTasks([...tasks, newTask])
    } else{
      alert("Merci dindiquer correctement une tâche")
    }

    e.target.new_task.value = ''
  }

  const completedTasks = (e) => {
    const tasksCompleted = tasks.map((task) => {
      if(task.id === parseInt(e.target.id, 10)){
        return {...task, completed: e.target.checked}
      } else {
        return task
      }
    })
    console.log(tasksCompleted)
    setTasks(tasksCompleted)
  }


  return (
    <>
      <form onSubmit={addNewTask}>
        <input
          placeholder="Nouvelle tâche"
          name="new_task"
          id="new_task"
        />
        <button type='submit'>Créer la nouvelle tâche</button>
      </form>
      <DisplayTasks tasks={tasks} onChange={completedTasks}/>
      

    </>
  )
}


function DisplayTasks({tasks, onChange}){
  return <div>
    <h1>Liste des tâches </h1>
    {tasks.map((task) => {
      return <div key={task.id}>
        <input 
          type="checkbox" 
          id={task.id}
          onChange={onChange}
          checked={task.completed}

          />
        {task.name}: {task.completed ? " OK":" À faire"}
      </div>
    })}
  </div>
}



export default App

