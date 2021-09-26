
let snippetMap: Map<string, Array<string> | string>;
export async function getSnippetMap(): Promise<Map<string, Array<string> | string>> {
  if (!snippetMap) {
    try {
      let rep = await fetch(chrome.extension.getURL('snippets.json'));
      let json = await rep.json();
      snippetMap = new Map<string, Array<string> | string>();
      for (const key in json) snippetMap.set(key, json[key]);
    } catch (error) {
      console.log(error);
    }
  }
  return snippetMap;
}