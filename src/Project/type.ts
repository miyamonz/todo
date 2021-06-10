export interface Project {
  title: string;
  id: string;
  created: number; //unixtime
  archived: boolean;
}
export function newProject(title: string) {
  return {
    title,
    id: Math.random().toString(),
    created: +new Date(),
    archived: false,
  };
}
