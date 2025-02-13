import { useEffect, useId, useRef, useState } from "react";
import { DisplayTasks, NewTaskInput, LogIn, SignIn } from "./elements/elements";
import {
  filterTableDeletedItem,
  updateTableCompletedItem,
  sortDisplayTasks,
  updateTableNewItem,
  getTasksFromApi,
  userDeconnexion,
} from "./functions/functions";
import { logInFunction, signInFunction } from "./functions/authFunctions";

const tasksInit = [];

function App() {
  const [tasks, setTasks] = useState(tasksInit);
  const [authentication, setAuthentication] = useState(false);
  const [noAccount, setNoAccount] = useState(false);
  const [userId, setUserId] = useState(null);

  setTimeout(() => {
    getTasksFromApi(setTasks, userId);
  }, 20000);

  sortDisplayTasks(tasks);

  const addNewTask = (v) => {
    updateTableNewItem(v, tasks, setTasks, userId);
  };

  const completedTasks = (v) => {
    updateTableCompletedItem(v, tasks, setTasks);
  };

  const delTask = (v) => {
    filterTableDeletedItem(v, tasks, setTasks);
  };

  const logIn = (v) => {
    logInFunction(v, setAuthentication, setUserId);
  };

  const signIn = (v) => {
    signInFunction(v, setNoAccount);
  };

  const noAccountLink = () => {
    setNoAccount(!noAccount);
  };

  const alreadyHaveAnAccountLink = () => {
    setNoAccount(!noAccount);
  };

  const deconnexion = (e) => {
    userDeconnexion(e, setTasks, setUserId, setAuthentication);
  };
  return (
    <>
      {!authentication && !noAccount && (
        <LogIn onSubmit={logIn} onClick={noAccountLink} />
      )}
      {!authentication && noAccount && (
        <SignIn onSubmit={signIn} onClick={alreadyHaveAnAccountLink}></SignIn>
      )}

      {authentication && (
        <>
          <div className="entete_app">
            <h1>TÂCHES</h1>
            <a href="*" onClick={deconnexion}>
              <button>Déconnexion</button>
            </a>
          </div>
          <NewTaskInput onSubmit={addNewTask} />

          <DisplayTasks
            tasks={tasks}
            onChange={completedTasks}
            onClick={delTask}
          />
        </>
      )}
    </>
  );
}

export default App;
