import React from "react";
import { useUpdateAtom } from "jotai/utils";

import { newTask } from "./Task";
import type { Task } from "./Task";

import TaskListTabs from "./components/TaskListTabs";
import { tasksAtom, useTaskAtoms } from "./store";
import { useFilterAtoms } from "./jotaiUtils/filterAtom";

function useAddTask() {
  const setTasks = useUpdateAtom(tasksAtom);
  const addTask = React.useCallback(() => {
    setTasks((prev) => [...prev, newTask()]);
  }, []);
  return addTask;
}

function Home() {
  const filter = React.useCallback((t: Task) => t.projectId === undefined, []);
  const taskAtoms = useTaskAtoms();
  const filteredAtoms = useFilterAtoms(taskAtoms, filter);
  const addTask = useAddTask();
  return <TaskListTabs taskAtoms={filteredAtoms} addTask={addTask} />;
}

export default Home;
