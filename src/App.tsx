import React from "react";
import { atom, useAtom, WritableAtom } from "jotai";
import "./App.css";

import { saveAs, openFile, saveFile } from "./NFS";

const fileHandleAtom: WritableAtom<FileSystemFileHandle, FileSystemFileHandle> =
  atom(null!, (_get, set, handle: FileSystemFileHandle) => {
    set(fileHandleAtom, handle);
    handle
      .getFile()
      .then((file) => file.text())
      .then((text) => set(textAtom, text));
  });
const textAtom = atom("");

function App() {
  const [, setFileHandle] = useAtom(fileHandleAtom);
  const [text, setText] = useAtom(textAtom);
  return (
    <div className="App">
      <header className="App-header">
        <p>todo</p>
        <p>
          <button onClick={() => openFile().then(setFileHandle)}>open</button>
          <button onClick={() => saveAs(text)}>save as</button>
        </p>
        <textarea value={text} onChange={(e) => setText(e.target.value)} />
      </header>
    </div>
  );
}

export default App;
