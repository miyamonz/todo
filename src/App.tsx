import React, { useEffect } from "react";
import { atom, useAtom } from "jotai";
import { splitAtom } from "jotai/utils";
import { focusAtom } from "jotai/optics";
import "./App.css";

import { jsonAtom } from "./indexedDB";
import { openFile, handleAtom, writeToHandleFileAtom } from "./NFS";
import { newTask, TaskItem } from "./Task";

const textAtom = atom((get) => JSON.stringify(get(jsonAtom)));
const isJsonAtom = atom((get) => {
  try {
    JSON.parse(get(textAtom));
    return true;
  } catch (e) {
    return false;
  }
});

const tasksAtom = focusAtom(jsonAtom, (optic) => optic.prop("tasks"));
const taskAtomsAtom = splitAtom(tasksAtom);

function App() {
  const [, setFileHandle] = useAtom(handleAtom);
  const [, writeTo] = useAtom(writeToHandleFileAtom);
  const [json] = useAtom(jsonAtom);
  const [tasks, setTasks] = useAtom(tasksAtom);
  const [taskAtoms, removeTask] = useAtom(taskAtomsAtom);
  const addTask = () => {
    setTasks((prev) => [...prev, newTask()]);
  };
  useEffect(() => {
    writeTo(JSON.stringify(json, null, 2));
  }, [json]);
  return (
    <div className="App">
      <header className="App-header">
        <p>todo</p>
        <p>
          <button onClick={() => openFile().then(setFileHandle)}>open</button>
        </p>
        <ul>
          {taskAtoms.map((taskAtom) => {
            return (
              <li key={`${taskAtom}`}>
                <TaskItem
                  taskAtom={taskAtom}
                  remove={(task) => removeTask(task)}
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
