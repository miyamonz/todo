import { atom } from "jotai";
import { setGist } from "../gist";
import debounce from "just-debounce-it";

import type { State } from "./type";
const _setGist = debounce((arg: any) => setGist(arg), 100);

import { jsonAtom as dbAtom } from "../indexedDB";

const jsonAtom = atom<State, State>(
  (get) => get(dbAtom),
  (_get, set, newJson) => {
    set(dbAtom, newJson);
    _setGist(newJson);
  }
);
export { jsonAtom };
