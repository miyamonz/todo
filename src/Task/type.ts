export interface Task {
  text: string;
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
    created: now,
    updated: now,
    done: false,
    ...prop,
  };
}
