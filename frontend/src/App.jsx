import { useEffect, useId, useRef, useState } from 'react'
import { Input } from './form/Input'
import { DisplayTasks, NewTaskInput} from './elements/elements'
import { filterTableDeletedItem, updateTableCompletedItem, sortDisplayTasks, updateTableNewItem, getTasksFromApi } from './functions/functions'

const tasksInit = []

function App() {

  const [tasks, setTasks] = useState(tasksInit)

  useEffect(() => {
    getTasksFromApi(setTasks);
  }, [])

  sortDisplayTasks(tasks)

  const addNewTask = (v) => {
    updateTableNewItem(v, tasks, setTasks)
  }

  const completedTasks = (v) => {
    updateTableCompletedItem(v, tasks, setTasks)
  }

  const delTask = (v) => {
    filterTableDeletedItem(v, tasks, setTasks)
  }

  return (
    <>
      <h1>TÂCHES</h1>
      
      <NewTaskInput onSubmit={addNewTask}/>

      <DisplayTasks
        tasks={tasks}
        onChange={completedTasks}
        onClick={delTask}
      />

    </>
  )
}

export default App

