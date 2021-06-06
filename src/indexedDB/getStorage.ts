import { kvsIndexedDB } from "@kvs/indexeddb";
import type { State } from "../store";

export type StorageSchema = {
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
