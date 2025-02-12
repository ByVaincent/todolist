const SERVER_URL = import.meta.env.VITE_SERVER_URL;

export async function getTasksFromApi(setTable, userId) {
  const tasks = await fetch(`${SERVER_URL}/api/tasks/${userId}`, {
    method: "GET",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          "Une erreur est survenue lors de la récupération des tâches"
        );
      }
      return response.json();
    })
    .catch((error) =>
      console.error("Problème lors de la récupération des tâches: ", error)
    );

  setTable(tasks);
}

export function sortDisplayTasks(table) {
  table.sort(function compareTasks(a, b) {
    if (!a.completed) {
      return -1;
    } else if (a.completed) {
      return +1;
    }
  });
}

export function filterTableDeletedItem(value, table, setTable) {
  const newTasks = table.filter((task) => "div_" + task.id !== value);
  setTable(newTasks);
  fetch(`${SERVER_URL}/api/tasks/${value}`, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json",
    },
  });
}

export function updateTableCompletedItem(value, table, setTable) {
  const itemCompleted = table.map((item) => {
    if (item.id === parseInt(value.id, 10)) {
      fetch(
        `http://${SERVER_URL}/api/tasks/${parseInt(value.id, 10)}/${
          value.checked
        }`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application.json",
          },
          body: JSON.stringify({ ...item, completed: value.checked }),
        }
      );
      return { ...item, completed: value.checked };
    } else {
      return item;
    }
  });
  setTable(itemCompleted);
}

export function updateTableNewItem(val, table, setTable, userId) {
  const newItem = {
    id: Date.now(),
    userId: userId,
    name: val.new_task.value,
    completed: false,
    selected: false,
  };
  console.log(newItem);

  if (val.new_task.value) {
    setTable([...table, newItem]);
    fetch(`http://${SERVER_URL}/api/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...newItem }),
    });
  } else {
    alert("Merci d' indiquer correctement une tâche");
  }

  val.new_task.value = "";
}

export function userDeconnexion(event, setTable, setUser, setAuth) {
  event.preventDefault();
  setTable([]);
  setUser(null);
  setAuth(false);
}
