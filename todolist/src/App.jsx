import { useId, useState } from 'react'
import { Input } from './form/Input'

const taskInit = [
  {
      "id": 1,
      "name": "Faire les courses",
      "completed": false
  },
  {
      "id": 2,
      "name": "Mettre de l'essence",
      "completed": true
  },
  {
      "id": 3,
      "name": "Appeler grand mère",
      "completed": false
  }
]



function App() {

  const [tasks, setTasks] = useState(taskInit)


  return (
    <>
      <form onSubmit={setTasks(updateTasks())}>
        <Input

          placeholder="Nouvelle tâche"
          name="new_task"
          id="new_task"
        />
        <button type='submit'>Créer la nouvelle tâche</button>
      </form>
      <DisplayTasks tasks={tasks}/>
      

    </>
  )
}


function DisplayTasks({tasks}){
  return <div>
    <h1>Liste des tâches </h1>
    {tasks.map((task) => {
      return <div key={task.id}>
        {task.name}: {task.completed ? "ok":"A faire"}
      </div>
    })}
  </div>
}

function updateTasks(event, tasks){
  event.preventDefault()
  const task = {
    "id": Date.now(),
    "name": event.target.new_task.value,
    "completed": false
  }
  tasks.push(task)
  
}

export default App
