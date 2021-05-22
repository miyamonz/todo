export interface Task {
  text: string;
  created: number; //unixtime
  updated: number; //unixtime
}
export function newTask(): Task {
  const now = Math.floor(+new Date() / 1000);
  return {
    text: "",
    created: now,
    updated: now,
  };
}
