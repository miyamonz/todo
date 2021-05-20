/**
 * @see https://wicg.github.io/file-system-access
 */

async function _writeFile(
  fileHandle: FileSystemFileHandle,
  contents: string | BufferSource | Blob
) {
  const writable = await fileHandle.createWritable();
  await writable.write(contents);
  await writable.close();
}

// 名前を付けて保存
export async function saveAs(contents: string): Promise<FileSystemHandle> {
  const handle = await window.showSaveFilePicker({
    types: [
      {
        description: "todo json",
        accept: {
          "application/json": [".json"],
        },
      },
    ],
  });

  return saveFile(contents, handle);
}

export async function saveFile(
  contents: string,
  handle: FileSystemFileHandle
): Promise<FileSystemHandle> {
  await _writeFile(handle, contents);
  return handle;
}

export async function openFile(): Promise<FileSystemFileHandle> {
  const [fileHandle] = await window.showOpenFilePicker({
    types: [
      {
        description: "json",
        accept: {
          "application/json": [".json"],
        },
      },
    ],
    multiple: false,
  });

  return fileHandle;
}

export function isNativeFileSystemSupported() {
  return "showOpenFilePicker" in window;
}
