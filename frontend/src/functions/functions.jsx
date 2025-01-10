export function sortDisplayTasks(table) {
    table.sort(function compareTasks(a, b) {
        if (!a.completed) {
            return -1
        } else if (a.completed) {
            return +1
        }
    })
}

export function filterTableDeletedItem(value, table, setTable) {
    const newTasks = table.filter((task) => 'div_' + task.id !== value)
    setTable(newTasks)
}

export function updateTableCompletedItem(value, table, setTable) {
    const itemCompleted = table.map((item) => {
        if (item.id === parseInt(value.id, 10)) {
            return { ...item, completed: value.checked }
        } else {
            return item
        }
    })
    setTable(itemCompleted)
}

export function updateTableNewItem(val, table, setTable) {
    const newItem = {
      "id": Date.now(),
      "name": val.new_task.value,
      "completed": false,
      "selected": false
    }

    if (val.new_task.value) {
      setTable([...table, newItem])
    } else {
      alert("Merci dindiquer correctement une tâche")
    }

    val.new_task.value = ''
  }