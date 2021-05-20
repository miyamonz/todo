import { atom, useAtom, WritableAtom } from "jotai";

export const fileHandleAtom: WritableAtom<
  FileSystemFileHandle | null,
  FileSystemFileHandle
> = atom(
  (get) => {
    try {
      return get(fileHandleAtom);
    } catch (e) {
      return null;
    }
  },
  (_get, set, handle: FileSystemFileHandle) => {
    set(fileHandleAtom, handle);
  }
);
