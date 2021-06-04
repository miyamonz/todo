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
          w={500}
          background={task.done ? "gray" : "white"}
          onChange={(e) =>
            setTask((prev) => ({ ...prev, text: e.target.value }))
          }
        />
        <Button onClick={() => setDone(true)}>done</Button>
        <Button onClick={() => remove(taskAtom)}>x</Button>
      </HStack>
    );
  };

export default TaskItem;
