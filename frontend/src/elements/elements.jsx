export function DisplayTasks({ tasks, onChange, onClick, useId }) {
    const displayTasks = []
    let lastTaskCompleted = false
  
    for (let task of tasks) {
      if (lastTaskCompleted != task.completed) {
        displayTasks.push(<h3 key='completedTasksTitle'>Terminée(s)</h3>)
      }
  
      displayTasks.push(<div
        key={task.id}
        id={'div_' + task.id}
        className={(task.selected ? ' selected ' : '') + (task.completed ? " crossed_out_text " : "") + " div_task "}
      >
        <input
          type="checkbox"
          id={task.id}
          onChange={(e) => onChange(e.target)}
          checked={task.completed}
        />
  
        <span>{task.name}</span>
  
        <img
          src="/poubelle.png"
          alt="Image d'une poubelle"
          className='bin'
          onClick={(e) => onClick(e.target.parentNode.id)}
        />
  
      </div>)
  
      lastTaskCompleted = task.completed
    }
  
    return <div>
      {displayTasks.length > 0 && <h3>À faire</h3>}
      {displayTasks}
    </div>
  
  }


  export function NewTaskInput({onSubmit}){
    return <form onSubmit={(e) => {
      e.preventDefault()
      onSubmit(e.target)
    }
    }>
      <input
        type='text'
        placeholder="Nouvelle tâche"
        name="new_task"
        id="new_task"
      />
      <button type='submit'>Ajouter</button>
    </form>
  }