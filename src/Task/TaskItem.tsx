import React from "react";
import { useAtom } from "jotai";
import type { PrimitiveAtom } from "jotai";
import type { Task } from "./type";

type TaskAtom = PrimitiveAtom<Task>;
const TaskItem: React.FC<{ taskAtom: TaskAtom; remove(task: TaskAtom): void }> =
  ({ taskAtom, remove }) => {
    const [task, setTask] = useAtom(taskAtom);
    const setDone = (b: boolean) => setTask((prev) => ({ ...prev, done: b }));
    return (
      <div>
        <textarea
          value={task.text}
          style={{ width: "50vw", background: task.done ? "gray" : "white" }}
          onChange={(e) =>
            setTask((prev) => ({ ...prev, text: e.target.value }))
          }
        />
        <button onClick={() => setDone(true)}>done</button>
        <button onClick={() => remove(taskAtom)}>x</button>
      </div>
    );
  };

export default TaskItem;
