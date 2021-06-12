import React from "react";

import { Layout } from "./Layout";

import Home from "./Home";
import Projects from "./Projects";
import { Route } from "wouter";

import { useUpdateAtom } from "jotai/utils";
import { useFilterAtom } from "./jotaiUtils/filterAtom";
import TaskList from "./Task/TaskList";
import { tasksAtom } from "./store";
import { newTask } from "./Task";

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
  }, []);
  return addTask;
}

function TaskListByProject({ id }: { id: string }) {
  const filterToday = React.useCallback((t) => t.projectId === id, []);
  const [filteredAtoms, remove] = useFilterAtom(tasksAtom, filterToday);
  const addTask = useAddTask(id);

  return <TaskList taskAtoms={filteredAtoms} add={addTask} />;
}

export default App;
