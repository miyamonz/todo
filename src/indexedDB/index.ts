import { kvsIndexedDB } from "@kvs/indexeddb";
import { atom } from "jotai";
import { saveFile } from "../NFS";
import type { WritableAtom } from "jotai";

import type { State } from "../store";

type StorageSchema = {
  json: State;
  fileHandle?: FileSystemFileHandle;
};

export async function getStorage() {
  return await kvsIndexedDB<StorageSchema>({
    name: "todo",
    version: 1,
  });
}

export async function getIndexedDBAtom(): Promise<WritableAtom<State, State>> {
  const storage = await getStorage();
  const key = "json";
  const json = (await storage.get(key)) ?? { tasks: [] };
  if (json) {
    const anAtom = atom<State, State>(json, (_get, set, json) => {
      storage.set(key, json);
      set(anAtom, json);
    });
    return anAtom;
  }
  throw new Error("not found in indexedDB");
}

export const jsonAtom = await getIndexedDBAtom();
