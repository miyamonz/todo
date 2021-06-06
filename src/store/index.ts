import { atom } from "jotai";
import { focusAtom } from "jotai/optics";

import { State } from "./type";
export type { State };
import { jsonAtom } from "./jsonAtom";
export { jsonAtom };

import { fromUnixTime, startOfDay } from "date-fns";

export const tasksAtom = focusAtom(jsonAtom, (optic) => optic.prop("tasks"));

export const datesAtom = atom((get) => {
  const tasks = get(tasksAtom);
  const dates = tasks.map((task) => fromUnixTime(task.updated));

  const datesWithoutTime = dates.map((d) => startOfDay(d));
  return datesWithoutTime.filter(
    (date, i, self) =>
      self.findIndex((d) => d.getTime() === date.getTime()) === i
  );
});
