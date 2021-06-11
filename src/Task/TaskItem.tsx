import React from "react";
import { useAtom } from "jotai";
import type { PrimitiveAtom } from "jotai";
import type { Task } from "./type";

import { HStack, Button, Textarea } from "@chakra-ui/react";

type TaskAtom = PrimitiveAtom<Task>;
const TaskItem: React.FC<{ taskAtom: TaskAtom; remove(task: TaskAtom): void }> =
  ({ taskAtom, remove }) => {
    const [task, setTask] = useAtom(taskAtom);
    const setDone = (b: boolean) => setTask((prev) => ({ ...prev, done: b }));
    return (
      <HStack>
        <Textarea
          value={task.text}
          w={800}
          rows={task.text.split("\n").length}
          bg={task.done ? "gray.300" : "white.300"}
          color={task.done ? "gray.600" : "black.300"}
          fontSize={task.done ? "sm" : "xl"}
          onChange={(e) =>
            setTask((prev) => ({ ...prev, text: e.target.value }))
          }
        />
        <Button onClick={() => setDone(!task.done)}>done</Button>
        <Button onClick={() => remove(taskAtom)}>x</Button>
      </HStack>
    );
  };

export const TaskName: React.FC<{ taskAtom: TaskAtom }> = ({ taskAtom }) => {
  const [task, setTask] = useAtom(taskAtom);
  return (
    <Textarea
      value={task.text}
      w={800}
      rows={task.text.split("\n").length}
      bg={task.done ? "gray.300" : "white.300"}
      color={task.done ? "gray.600" : "black.300"}
      fontSize={task.done ? "sm" : "xl"}
      onChange={(e) => setTask((prev) => ({ ...prev, text: e.target.value }))}
    />
  );
};
export const TaskDone: React.FC<{
  taskAtom: TaskAtom;
}> = ({ taskAtom }) => {
  const [task, setTask] = useAtom(taskAtom);
  const setDone = (b: boolean) => setTask((prev) => ({ ...prev, done: b }));
  return <Button onClick={() => setDone(!task.done)}>done</Button>;
};
export const TaskRemove: React.FC<{
  taskAtom: TaskAtom;
  remove(task: TaskAtom): void;
}> = ({ taskAtom, remove }) => {
  return <Button onClick={() => remove(taskAtom)}>x</Button>;
};

export default TaskItem;
