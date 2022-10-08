import { useTaskStore } from "../stores/tasks";
import { motion } from "framer-motion";
import type { Task } from "../stores/tasks";

export type TaskProps = {
  index: number;
};

const createNewTask = (): Task => {
  return {
    text: "",
    completed: false,
  };
};

export const TaskItem: React.FC<TaskProps & { task: Task }> = ({
  index,
  task,
  ...props
}) => {
  const { setTask } = useTaskStore();

  return (
    <motion.li
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      exit={{ opacity: 0 }}
      className="flex flex-row bg-zinc-800 w-full rounded-lg p-4 border border-zinc-700 items-center"
    >
      <CompleteTaskButton index={index} completed={task.completed} />
      <input
        className="bg-transparent focus:outline-none text-zinc-400 focus:text-zinc-300 w-full ml-2"
        value={task.text}
        onChange={(e) => {
          setTask(index, { text: e.target.value });
        }}
        {...props}
      />
      <RemoveTaskButton index={index} />
    </motion.li>
  );
};

export const AddTaskButton: React.FC = () => {
  const { tasks, addTask } = useTaskStore();

  const handleOnClick = () => {
    addTask(createNewTask());
  };

  const checkCreatingTask = () => {
    return tasks.length > 0 && tasks[0].text.length === 0;
  };

  return (
    <button
      className="flex flex-row items-center gap-1 text-lg font-bold text-zinc-200 bg-green-600 hover:bg-green-700 py-2 px-8 rounded-lg disabled:bg-green-800 disabled:text-zinc-400"
      onClick={handleOnClick}
      disabled={checkCreatingTask()}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2.5}
        stroke="currentColor"
        className="w-5 h-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
        />
      </svg>
      Add task
    </button>
  );
};

const RemoveTaskButton: React.FC<{ index: number }> = ({ index }) => {
  const { removeTask } = useTaskStore();

  const handleOnClick = () => {
    removeTask(index);
  };

  return (
    <button
      onClick={handleOnClick}
      className="text-zinc-500 hover:text-red-500 ml-1"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
        />
      </svg>
    </button>
  );
};

export const CompleteTaskButton: React.FC<
  TaskProps & Pick<Task, "completed">
> = ({ index, completed }) => {
  const { setTask } = useTaskStore();

  const handleOnClick = () => {
    setTask(index, { completed: !completed });
  };

  return (
    <button
      onClick={handleOnClick}
      className={`${
        completed
          ? "text-green-500 border-r"
          : "text-zinc-500 hover:text-zinc-300 border-r"
      } border-zinc-700 pr-2`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4.5 12.75l6 6 9-13.5"
        />
      </svg>
    </button>
  );
};
