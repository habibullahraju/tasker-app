import { useState } from "react";
import AddTaskModal from "./AddTaskModal";
import NoTaskFound from "./NoTaskFound";
import SearchTask from "./SearchTask";
import TaskActions from "./TaskActions";
import TaskList from "./TaskList";

export default function TaskBoard() {
  const defaultTask = {
    "id" : crypto.randomUUID(),
    "title": "Learn React",
    "description" : "i want to learn react such that can treat it like my slave and make it do whatever i want to do",
    "tags" : ["web", "react", "js"],
    "priority": "hight",
    "isFavorite": true
  };
  const [tasks, setTasks] = useState([defaultTask]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [taskToUpdate, setTaskToUpdate] = useState(null);

  function handleOnEditAddTask(newTask, isAdd) {
    if (isAdd) {
      setTasks([...tasks, newTask]);
    } else {
      setTasks(
        tasks.map((task) => {
          if (task.id === newTask.id) {
            setTaskToUpdate(null);
            return newTask;
          }
          return task;
        })
      );
    }

    setShowAddModal(!showAddModal);
  }
  function handleEditTask(task) {
    console.log(task);
    setTaskToUpdate(task);
    setShowAddModal(true);
  }
  function handleCloseModal() {
    setShowAddModal(!showAddModal);
    setTaskToUpdate(null);
  }
  function handleDeleteTask(taskId) {
    const taskIdAfterDelete = tasks.filter((task) => task.id !== taskId);
    setTasks(taskIdAfterDelete);
  }
  function handleTaskDeleteAll() {
    tasks.length = 0;
    setTasks([...tasks]);
  }
  function handleFavorite(taskId) {
    const taskIndex = tasks.findIndex((task) => task.id === taskId);
    const newTasks = [...tasks];
    newTasks[taskIndex].isFavorite = !newTasks[taskIndex].isFavorite;
    setTasks(newTasks);
  }
  function handleSearch(searchTerm) {
    const taskFiltered = tasks.filter((task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setTasks([...taskFiltered]);
  }
  return (
    <section className="mb-20" id="tasks">
      {showAddModal && (
        <AddTaskModal
          onCloseModal={handleCloseModal}
          taskToUpdate={taskToUpdate}
          onSave={handleOnEditAddTask}
        />
      )}
      <div className="container">
        <div className="p-2 flex justify-end">
          <SearchTask onSearch={handleSearch} />
        </div>
        <div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">
          <TaskActions
            taskDeleteAllClick={handleTaskDeleteAll}
            onAddClick={() => setShowAddModal(true)}
          />
          {tasks.length > 0 ? (
            <TaskList
              onFav={handleFavorite}
              onDelete={handleDeleteTask}
              onEdit={handleEditTask}
              tasks={tasks}
            />
          ) : (
            <NoTaskFound />
          )}
        </div>
      </div>
    </section>
  );
}
