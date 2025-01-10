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
    fetch(`http://localhost:3000/api/tasks/${value}`, {
        method: "DELETE",
        headers: {
            "Content-type" : "application/json"
        }
    })
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
      setTable([...table, newItem]);
      fetch('http://localhost:3000/api/tasks', {
        method: 'POST',
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify({...newItem})
      })
    } else {
      alert("Merci d' indiquer correctement une tâche")
    }

    val.new_task.value = ''
  }