import React from "react";
import { useAtom } from "jotai";
import type { WritableAtom } from "jotai";
import { splitAtom } from "jotai/utils";
import { Stack, Button } from "@chakra-ui/react";

import { newTask, TaskItem } from "./Task";
import type { Task } from "./Task";

type SetStateAction<Value> = Value | ((prev: Value) => Value);
type TasksAtom = WritableAtom<Task[], SetStateAction<Task[]>>;

function useAddTask(tasksAtom: TasksAtom) {
  const [, setTasks] = useAtom(tasksAtom);
  const addTask = () => {
    setTasks((prev) => [...prev, newTask()]);
  };

  return addTask;
}

type Prop = {
  tasksAtom: TasksAtom;
};
const TasksList: React.FC<Prop> = ({ tasksAtom }) => {
  const taskAtomsAtom = splitAtom(tasksAtom);
  const [taskAtoms, removeTask] = useAtom(taskAtomsAtom);
  const addTask = useAddTask(tasksAtom);

  return (
    <Stack>
      {taskAtoms.map((taskAtom) => {
        return (
          <TaskItem
            key={`${taskAtom}`}
            taskAtom={taskAtom}
            remove={() => removeTask(taskAtom)}
          />
        );
      })}
      <Button onClick={() => addTask()}>add</Button>
    </Stack>
  );
};

export default TasksList;
