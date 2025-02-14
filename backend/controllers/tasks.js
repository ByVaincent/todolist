import Task from "../Models/Task.js";

function createTasks(req, res, next) {
  const newTask = new Task({
    ...req.body,
  });
  newTask
    .save()
    .then((task) =>
      res
        .status(200)
        .json({ message: `Nouvelle tâche créée avec succès: ${task}` })
    )
    .catch((error) => res.status(400).json({ error }));
}

function getAllTasks(req, res, next) {
  Task.find({ userId: req.params.userid })
    .then((tasks) => res.status(200).json(tasks))
    .catch((error) => res.status(400).json({ error }));
}

function updateSelectedTask(req, res, next) {
  Task.updateOne(
    { id: req.params.id },
    { completed: req.params.completed }
  ).then(() => res.status(200).json({ message: "Task updated!" }));
}

function deleteTask(req, res, next) {
  Task.deleteOne({ id: req.params.id })
    .then(() =>
      res.status(200).json({ message: "Tâche supprimée avec succès!" })
    )
    .catch((error) => res.status(400).json({ error }));
}

function deleteTestTasks() {
  Task.deleteMany({
    userId: "67ae60d2bcf9f65053798760",
  })
    .then(() => {
      console.log("Tâches supprimées");
    })
    .catch((error) => {
      console.log(error.message);
    });
}

export default {
  createTasks,
  getAllTasks,
  updateSelectedTask,
  deleteTask,
  deleteTestTasks,
};
