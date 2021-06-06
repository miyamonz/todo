import { getStorage } from "../indexedDB/getStorage";
const name = "todo.json";
const storage = await getStorage();
const id = await storage.get("gistId");
const token = await storage.get("gistToken");

/**
 * Gist の db.json の内容を取得
 * @param id Gist ID /Example: https://gist.github.com/username/{HERE}
 * @returns 内容
 */
export const getGist = async () => {
  const json = await fetch("https://api.github.com/gists/" + id).then((res) =>
    res.json()
  );
  return json.files[name].content;
};

export const setGist = async (body: {}) => {
  const res = await fetch("https://api.github.com/gists/" + id, {
    method: "PATCH",
    headers: {
      Accept: "application/vnd.github.v3+json",
      Authorization: "token " + token,
    },
    body: JSON.stringify({
      description: "Updated at " + new Date().toLocaleString(),
      files: {
        [name]: {
          content: JSON.stringify(body),
        },
      },
    }),
  });
  const json = await res.json();
  const { content } = json.files[name];
  return JSON.parse(content);
};
