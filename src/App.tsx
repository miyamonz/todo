import React from "react";

import { Layout } from "./Layout";

import Home from "./Home";
import Projects from "./Projects";
import { Route } from "wouter";

import { useUpdateAtom } from "jotai/utils";
import { useFilterAtoms } from "./jotaiUtils/filterAtom";
import TaskListTabs from "./components/TaskListTabs";
import { tasksAtom, useTaskAtoms } from "./store";
import { newTask } from "./Task";
import type { Task } from "./Task";

function App() {
  return (
    <Layout>
      <Route path="/">
        <Home />
      </Route>
      <Route path="/projects/:id">
        {({ id }) => <TaskListByProject id={id} />}
      </Route>
      <Route path="/projects">
        <Projects />
      </Route>
    </Layout>
  );
}

function useAddTask(id: string) {
  const setTasks = useUpdateAtom(tasksAtom);
  const addTask = React.useCallback(() => {
    setTasks((prev) => [...prev, newTask({ projectId: id })]);
  }, [id]);
  return addTask;
}

function TaskListByProject({ id }: { id: string }) {
  const filterToday = React.useCallback((t: Task) => t.projectId === id, [id]);
  const taskAtoms = useTaskAtoms();
  const filteredAtoms = useFilterAtoms(taskAtoms, filterToday);
  const addTask = useAddTask(id);

  return <TaskListTabs taskAtoms={filteredAtoms} addTask={addTask} />;
}

export default App;
