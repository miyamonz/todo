import { jsonAtom } from "./jsonAtom";
import { focusAtom } from "jotai/optics";
import { splitAtom, useAtomCallback } from "jotai/utils";
import { useAtom } from "jotai";
import { useUpdateAtom } from "jotai/utils";
import { useCallback } from "react";

import type { TaskAtom } from "../Task";

export const tasksAtom = focusAtom(jsonAtom, (optic) => optic.prop("tasks"));
const taskAtomsAtom = splitAtom(tasksAtom);

export function useTaskAtoms() {
  const [taskAtoms] = useAtom(taskAtomsAtom);
  return taskAtoms;
}

export function useRemoveTask() {
  const set = useUpdateAtom(tasksAtom);

  return useCallback((id: string) => {
    set((prev) => prev.filter((task) => task.id !== id));
  }, []);
}

export function useMoveTask() {
  const set = useUpdateAtom(tasksAtom);

  return useCallback((fromId: string, toId: string) => {
    set((prev) => {
      const fromIndex = prev.findIndex((t) => t.id === fromId);
      const toIndex = prev.findIndex((t) => t.id === toId);

      return arrayMove(prev, fromIndex, toIndex);
    });
  }, []);
}

export function useMoveByTaskAtom() {
  const setTasks = useUpdateAtom(tasksAtom);
  return useAtomCallback(
    useCallback((get, _set, [fromAtom, toAtom]: [TaskAtom, TaskAtom]) => {
      const from = get(fromAtom);
      const to = get(toAtom);
      setTasks((prev) => {
        const fromIndex = prev.findIndex((t) => t.id === from.id);
        const toIndex = prev.findIndex((t) => t.id === to.id);

        return arrayMove(prev, fromIndex, toIndex);
      });
    }, [])
  );
}
function arrayMove<T>(array: T[], from: number, to: number) {
  array = array.slice();
  array.splice(to < 0 ? array.length + to : to, 0, array.splice(from, 1)[0]);
  return array;
}
