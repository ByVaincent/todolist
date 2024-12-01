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
      <div>
        <Input
          
        />
      </div>
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

export default App
