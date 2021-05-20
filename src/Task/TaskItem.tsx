import React from "react";
import { useAtom } from "jotai";
import type { PrimitiveAtom } from "jotai";
import type { Task } from "./type";

type TaskAtom = PrimitiveAtom<Task>;
const TaskItem: React.FC<{ taskAtom: TaskAtom; remove(task: TaskAtom): void }> =
  ({ taskAtom, remove }) => {
    const [task, setTask] = useAtom(taskAtom);
    return (
      <div>
        <input
          value={task.text}
          onChange={(e) =>
            setTask((prev) => ({ ...prev, text: e.target.value }))
          }
        />
        <button onClick={() => remove(taskAtom)}>x</button>
      </div>
    );
  };

export default TaskItem;
