import React, { useEffect } from "react";
import { atom, useAtom } from "jotai";
import { splitAtom } from "jotai/utils";
import { focusAtom } from "jotai/optics";
import "./App.css";

import { jsonAtom } from "./indexedDB";
import { newTask, TaskItem } from "./Task";
import { setGist } from "./gist";

import debounce from "just-debounce-it";

import { fromUnixTime, set } from "date-fns";

const _setGist = debounce((arg: any) => setGist(arg), 1000);

const tasksAtom = focusAtom(jsonAtom, (optic) => optic.prop("tasks"));
const datesAtom = atom((get) => {
  const tasks = get(tasksAtom);
  const dates = tasks.map((task) => fromUnixTime(task.updated));

  const datesWithoutTime = dates.map((d) =>
    set(d, { hours: 0, minutes: 0, seconds: 0, milliseconds: 0 })
  );
  return datesWithoutTime.filter(
    (date, i, self) =>
      self.findIndex((d) => d.getTime() === date.getTime()) === i
  );
});
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
    _setGist(json);
  }, [json]);

  const [taskAtoms, removeTask] = useAtom(taskAtomsAtom);
  const addTask = useAddTask();

  const [dates] = useAtom(datesAtom);
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
