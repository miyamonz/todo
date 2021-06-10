import type { Task } from "../Task";
import type { Project } from "../Project/type";
export interface State {
  tasks: Task[];
  projects: Project[];
}
