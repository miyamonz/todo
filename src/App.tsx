import React, { useEffect } from "react";
import { useAtom } from "jotai";
import { splitAtom } from "jotai/utils";
import { focusAtom } from "jotai/optics";
import "./App.css";

import { jsonAtom } from "./indexedDB";
import { newTask, TaskItem } from "./Task";
import { setGist } from "./gist";

const tasksAtom = focusAtom(jsonAtom, (optic) => optic.prop("tasks"));
const taskAtomsAtom = splitAtom(tasksAtom);

function useAddTask() {
  const [, setTasks] = useAtom(tasksAtom);
  const addTask = () => {
    setTasks((prev) => [...prev, newTask()]);
  };

  return addTask;
}

function App() {
  const [json] = useAtom(jsonAtom);
  useEffect(() => {
    setGist(json);
  }, [json]);

  const [taskAtoms, removeTask] = useAtom(taskAtomsAtom);
  const addTask = useAddTask();
  return (
    <div className="App">
      <header className="App-header">
        <p>todo</p>
        <ul>
          {taskAtoms.map((taskAtom) => {
            return (
              <li key={`${taskAtom}`}>
                <TaskItem
                  taskAtom={taskAtom}
                  remove={() => removeTask(taskAtom)}
                />
              </li>
            );
          })}
        </ul>
        <button onClick={() => addTask()}>add</button>
      </header>
    </div>
  );
}

export default App;
