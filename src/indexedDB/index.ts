import { kvsIndexedDB } from "@kvs/indexeddb";

import { getGist } from "../gist";
import { atom } from "jotai";
import type { WritableAtom } from "jotai";

import type { State } from "../store";

type StorageSchema = {
  json: State;
  fileHandle?: FileSystemFileHandle;
  gistId: string;
  gistToken: string;
};

export async function getStorage() {
  return await kvsIndexedDB<StorageSchema>({
    name: "todo",
    version: 1,
  });
}

//@ts-ignore
window.storage = await getStorage();

export async function getIndexedDBAtom(): Promise<WritableAtom<State, State>> {
  const storage = await getStorage();
  const key = "json";
  const fromGist = await getGist();
  const json = JSON.parse(fromGist);
  console.log(json);
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
