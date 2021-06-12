import { atom } from "jotai";
import type { Atom, WritableAtom, PrimitiveAtom } from "jotai";

import { getWeakCacheItem, setWeakCacheItem } from "./weakCache";

import { useAtom } from "jotai";
type Getter = {
  <Value>(atom: Atom<Value | Promise<Value>>): Value;
  <Value>(atom: Atom<Promise<Value>>): Value;
  <Value>(atom: Atom<Value>): Value;
};

type Setter = {
  <Value>(atom: WritableAtom<Value, undefined>): void;
  <Value, Update>(atom: WritableAtom<Value, Update>, update: Update): void;
};

const filterAtomCache = new WeakMap();

const isWritable = <Value, Update>(
  atom: Atom<Value> | WritableAtom<Value, Update>
): atom is WritableAtom<Value, Update> =>
  !!(atom as WritableAtom<Value, Update>).write;

export function filterAtom<Item, Key>(
  atoms: PrimitiveAtom<Item>[],
  filter: (item: Item) => boolean
): Atom<PrimitiveAtom<Item>[]>;

export function filterAtom<Item, Key>(
  atoms: Atom<Item>[],
  filter: (item: Item) => boolean
): Atom<Atom<Item>[]>;

export function filterAtom<Item>(
  atoms: PrimitiveAtom<Item>[] | Atom<Item>[],
  filter: (item: Item) => boolean
) {
  const deps: object[] = [atoms, filter];
  const cachedAtom = getWeakCacheItem(filterAtomCache, deps);
  if (cachedAtom) {
    return cachedAtom;
  }
  type ItemAtom = PrimitiveAtom<Item> | Atom<Item>;
  const read = (get: Getter) => {
    return atoms.filter((anAtom) => {
      return filter(get(anAtom));
    });
  };
  const filteredAtom = atom(read);
  setWeakCacheItem(filterAtomCache, deps, filteredAtom);
  return filteredAtom;
}

export function useFilterAtoms<T>(
  atoms: PrimitiveAtom<T>[],
  filter: (item: T) => boolean
) {
  const [filteredAtoms] = useAtom(filterAtom(atoms, filter));

  return filteredAtoms;
}
