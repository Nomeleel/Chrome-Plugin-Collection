function getSnippet(snippetMap: Map<string, Array<string> | string>, type: string): string {
  let snippetItem: any = snippetMap.get(type);
  if (snippetItem != null) {
    if (snippetItem instanceof Array) {
      return snippetItem.join('\n');
    }
  }
}

function removeUnuseSnippetField(str: string): string {
  return str.replace(/(?<=\n)\t*\S*:\s?\S*\$\{\S*\}\S*\n/g, '');
}

export function fillValueInSnippet(type: string, snippetMap: Map<string, Array<string> | string>, dataMap: Map<string, any>): string {
  let template = getSnippet(snippetMap, type);
  let text = template.replace(/\$\{\S*\}/g, str => dataMap.get(str.slice(2, -1)) ?? str);
  return removeUnuseSnippetField(text);
}