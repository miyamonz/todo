import React from "react";
import { useAtom } from "jotai";
import type { WritableAtom } from "jotai";
import { splitAtom } from "jotai/utils";
import { filterAtom } from "../jotaiUtils/filterAtom";
import { Stack, Button } from "@chakra-ui/react";

import { newTask, TaskItem } from "./";
import type { Task } from "./type";

type SetStateAction<Value> = Value | ((prev: Value) => Value);
type TasksAtom = WritableAtom<Task[], SetStateAction<Task[]>>;

type Prop = {
  tasksAtom: TasksAtom;
  filter?: (task: Task) => boolean;
  addTask: (task: Task) => void;
};
const TaskList: React.FC<Prop> = ({
  tasksAtom,
  filter = () => true,
  addTask,
}) => {
  const taskAtomsAtom = splitAtom(tasksAtom);

  const [taskAtoms, removeTask] = useAtom(taskAtomsAtom);
  const [filteredAtoms] = useAtom(
    filterAtom(taskAtoms, React.useCallback(filter, []))
  );

  return (
    <Stack>
      {filteredAtoms.map((taskAtom) => {
        return (
          <TaskItem
            key={`${taskAtom}`}
            taskAtom={taskAtom}
            remove={() => removeTask(taskAtom)}
          />
        );
      })}
      <Button onClick={() => addTask(newTask())}>add</Button>
    </Stack>
  );
};

export default TaskList;
