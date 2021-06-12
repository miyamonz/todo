import { getStorage } from "./getStorage";
import { getGist } from "../gist";
import { atom } from "jotai";
import type { WritableAtom } from "jotai";

import type { State } from "../store";

(async () => {
  //@ts-ignore
  window.storage = await getStorage();
})();

export async function getIndexedDBAtom(): Promise<WritableAtom<State, State>> {
  const storage = await getStorage();
  const key = "json";
  const fromGist = await getGist();
  const json = JSON.parse(fromGist);
  json.projects = json.projects.map((p) => {
    const id = p.id.includes(".")
      ? Math.floor(Math.random() * 10 ** 12).toString()
      : p.id;
    return { ...p, id };
  });
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
