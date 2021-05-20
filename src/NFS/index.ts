import { openFile, saveFile } from "./funcs";
import { atom } from "jotai";
import { getStorage } from "../indexedDB";

export { openFile, saveFile };

async function getHandleAtom() {
  const storage = await getStorage();
  const key = "fileHandle";
  const handle = await storage.get(key);
  const handleAtom = atom<
    FileSystemFileHandle | undefined,
    FileSystemFileHandle
  >(handle, (_get, set, handle) => {
    storage.set(key, handle);
    set(handleAtom, handle);
  });
  return handleAtom;
}
export const handleAtom = await getHandleAtom();

export const writeToHandleFileAtom = atom(
  null,
  (get, _set, content: string) => {
    const handle = get(handleAtom);
    if (handle) saveFile(content, handle);
    else console.error("there is no handle");
  }
);
