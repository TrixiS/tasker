import "./App.css";
import { useTaskStore } from "./stores/tasks";
import { TaskList } from "./components/TaskList";
import { AddTaskButton, TaskItem } from "./components/TaskItem";

function App() {
  const { tasks } = useTaskStore();

  return (
    <div className="container">
      <h1 className="text-zinc-200 font-extrabold leading-tight text-6xl gradient">
        Tasker
      </h1>
      <div className="flex flex-row mb-2 items-start w-full">
        <AddTaskButton />
      </div>
      <TaskList>
        {tasks.map((task, index) => (
          <TaskItem index={index} task={task} key={index.toString()} />
        ))}
      </TaskList>
    </div>
  );
}

export default App;
