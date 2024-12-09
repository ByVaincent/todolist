import { useId, useRef, useState } from 'react'
import { Input } from './form/Input'

const tasksInit = [
  {
    "id": Date.now(),
    "name": "Faire les courses",
    "completed": false,
    "selected": false
  },
  {
    "id": Date.now() + 1,
    "name": "Mettre de l'essence",
    "completed": false,
    "selected": false
  },
  {
    "id": Date.now() + 2,
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

    if (e.target.new_task.value) {
      setTasks([...tasks, newTask])
    } else {
      alert("Merci dindiquer correctement une tâche")
    }

    e.target.new_task.value = ''
  }

  const completedTasks = (e) => {
    const tasksCompleted = tasks.map((task) => {
      if (task.id === parseInt(e.target.id, 10)) {
        return { ...task, completed: e.target.checked }
      } else {
        return task
      }
    })
    setTasks(tasksCompleted)
  }

  function selectTasks(e) {
    console.log(e.target.id)
    const tasksSelected = tasks.map((task) => {
      if ('div_' + task.id === e.target.id && task.selected === false) {
        return { ...task, selected: true }
      } else if ('div_' + task.id === e.target.id && task.selected === true) {
        return { ...task, selected: false }
      } else {
        return task
      }
    })

    return setTasks(tasksSelected)
  }

  function delTasks() {
    const tasksDeleted = tasks.filter((task) => {
      return task.selected ? false : true
    })
    return setTasks(tasksDeleted)
  }

  const unselectTasks = () => (
    setTasks(tasks.map((task)=> {
      return {...task, selected: false}
    }))
  )
  console.log(tasks)

  return (
    <>
      <h1>TÂCHES</h1>
      <form onSubmit={addNewTask}>
        <input
          type='text'
          placeholder="Nouvelle tâche"
          name="new_task"
          id="new_task"
        />
        <button type='submit'>Ajouter</button>
      </form>
      <DisplayTasks
        tasks={tasks}
        onChange={completedTasks}
        onClick={selectTasks}
      />

      <div>
        <OptionsButton onClick={delTasks} name="Supprimer" />
        <OptionsButton onClick={unselectTasks} name="Tout désélectionner"/>

      </div>



    </>
  )
}


function DisplayTasks({ tasks, onChange, onClick }) {
  return <div>
    {tasks.map((task) => {

      return <div
        key={task.id}
        id={'div_' + task.id}
        onClick={onClick}
        className={(task.selected ? ' selected ' : '') + (task.completed ? " crossed_out_text " : "") + " div_task "}
      >
        <input
          type="checkbox"
          id={task.id}
          onChange={onChange}
          checked={task.completed}
        />

        {task.name}

      </div>
    })}
  </div>
}

function OptionsButton({ onClick, name }) {
  return <button onClick={onClick}>{name}</button>
}



export default App

