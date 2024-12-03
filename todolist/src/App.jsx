import { useId, useRef, useState } from 'react'
import { Input } from './form/Input'

const tasksInit = [
  {
      "id": 1,
      "name": "Faire les courses",
      "completed": false,
      "selected": false
  },
  {
      "id": 2,
      "name": "Mettre de l'essence",
      "completed": true,
      "selected": false
  },
  {
      "id": 3,
      "name": "Appeler grand mère",
      "completed": false,
      "selected": false
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
      "selected": false
    }

    if(e.target.new_task.value){
      setTasks([...tasks, newTask])
    } else{
      alert("Merci dindiquer correctement une tâche")
    }

    e.target.new_task.value = ''
  }


  const selectTasks = (e) => {
    // const tasksSelected = tasks.map((task) => {
    //   if (task.id === e.target.id)
    // })
   console.log(e.target.checked)
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
      <DisplayTasks tasks={tasks} onChange={selectTasks}/>
      

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

          />
        {task.name}: {task.completed ? " OK":" À faire"}
      </div>
    })}
  </div>
}



export default App

