import React from "react";
import { useUpdateAtom } from "jotai/utils";

import { newTask } from "./Task";

import TaskListTabs from "./components/TaskListTabs";
import { tasksAtom } from "./store";

function useAddTask() {
  const setTasks = useUpdateAtom(tasksAtom);
  const addTask = React.useCallback(() => {
    setTasks((prev) => [...prev, newTask()]);
  }, []);
  return addTask;
}

function Home() {
  const addTask = useAddTask();
  return <TaskListTabs tasksAtom={tasksAtom} addTask={addTask} />;
}

export default Home;
