import React, { useEffect } from "react";
import { useAtom } from "jotai";
import { splitAtom } from "jotai/utils";
import { focusAtom } from "jotai/optics";
import "./App.css";

import { jsonAtom } from "./indexedDB";
import { openFile, handleAtom, writeToHandleFileAtom } from "./NFS";
import { newTask, TaskItem } from "./Task";

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
  const [, setFileHandle] = useAtom(handleAtom);

  const [, writeTo] = useAtom(writeToHandleFileAtom);
  const [json] = useAtom(jsonAtom);
  useEffect(() => {
    writeTo(JSON.stringify(json, null, 2));
  }, [json]);

  const [taskAtoms, removeTask] = useAtom(taskAtomsAtom);
  const addTask = useAddTask();
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
