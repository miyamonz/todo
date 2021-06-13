import { atom } from "jotai";
import { focusAtom } from "jotai/optics";

import { State } from "./type";
export type { State };
import { jsonAtom } from "./jsonAtom";
export { jsonAtom };

import { tasksAtom, useTaskAtoms, useRemoveTask } from "./tasks";
export { tasksAtom, useTaskAtoms, useRemoveTask };

import { fromUnixTime, startOfDay } from "date-fns";

export const projectsAtom = focusAtom(jsonAtom, (optic) =>
  optic.prop("projects")
);

export const datesAtom = atom((get) => {
  const tasks = get(tasksAtom);
  const dates = tasks.map((task) => fromUnixTime(task.updated));

  const datesWithoutTime = dates.map((d) => startOfDay(d));
  return datesWithoutTime.filter(
    (date, i, self) =>
      self.findIndex((d) => d.getTime() === date.getTime()) === i
  );
});
