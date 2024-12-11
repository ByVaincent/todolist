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

  function sortDisplayTasks(table) {
    table.sort(function compareTasks(a, b) {
      if (!a.completed) {
        return -1
      } else if (a.completed) {
        return +1
      }
    })
  }

  sortDisplayTasks(tasks)

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

  function delTask(e) {
    const newTasks = tasks.filter((task) => 'div_' + task.id !== e.target.parentNode.id)
    setTasks(newTasks)
  }

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
        onClick={delTask}
      />

    </>
  )
}



function DisplayTasks({ tasks, onChange, onClick }) {
  const displayTasks = []
  let lastTaskCompleted = false

  for (let task of tasks) {
    if (lastTaskCompleted != task.completed) {
      displayTasks.push(<h3>Terminée(s)</h3>)
    }

    displayTasks.push(<div
      key={task.id}
      id={'div_' + task.id}
      className={(task.selected ? ' selected ' : '') + (task.completed ? " crossed_out_text " : "") + " div_task "}
    >
      <input
        type="checkbox"
        id={task.id}
        onChange={onChange}
        checked={task.completed}
      />

      <span>{task.name}</span>

      <img
        src="/public/poubelle.png"
        alt="Image d'une poubelle"
        className='bin'
        onClick={onClick}
      />

    </div>)

    lastTaskCompleted = task.completed
  }

  return <div>
    <h3>À faire</h3>
    {displayTasks}
  </div>

}


export default App

