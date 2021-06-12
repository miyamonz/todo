import type { PrimitiveAtom } from "jotai";
export interface Task {
  text: string;
  id: string;
  created: number; //unixtime
  updated: number; //unixtime
  done: boolean;
  projectId?: string;
}
export interface TaskProp {
  text?: string;
  projectId?: string;
}
export function newTask(prop?: TaskProp): Task {
  const now = Math.floor(+new Date() / 1000);
  return {
    text: "",
    id: now.toString() + Math.floor(Math.random() * 10 ** 5).toString(),
    created: now,
    updated: now,
    done: false,
    ...prop,
  };
}
export type TaskAtom = PrimitiveAtom<Task>;
