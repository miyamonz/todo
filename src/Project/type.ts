import type { PrimitiveAtom } from "jotai";
export interface Project {
  title: string;
  id: string;
  created: number; //unixtime
  archived: boolean;
}
export function newProject(title: string) {
  return {
    title,
    id: Math.floor(Math.random() * 10 ** 15).toString(),
    created: +new Date(),
    archived: false,
  };
}
export type ProjectAtom = PrimitiveAtom<Project>;
