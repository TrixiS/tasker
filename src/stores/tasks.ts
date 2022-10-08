import createStore from "zustand";
import { persist } from "zustand/middleware";

export type Task = {
  text: string;
  completed: boolean;
};

export type TaskStore = {
  tasks: Task[];
  addTask: (task: Task) => void;
  setTask: (index: number, newTask: Partial<Task>) => void;
  removeTask: (index: number) => void;
};

export const useTaskStore = createStore<TaskStore>()(
  persist(
    (set, get) => ({
      tasks: [],
      addTask(task) {
        set((state) => ({ tasks: [task, ...state.tasks] }));
      },
      setTask(index, newTask) {
        const tasks = get().tasks;
        Object.assign(tasks[index], newTask);
        set(() => ({ tasks }));
      },
      removeTask(index) {
        const tasks = get().tasks;
        tasks.splice(index, 1);
        set(() => ({ tasks }));
      },
    }),
    {
      name: "tasks",
    }
  )
);
