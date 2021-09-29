function getSnippet(snippetMap: Map<string, Array<string> | string>, type: string): string {
  let snippetItem: any = snippetMap.get(type);
  if (snippetItem != null) {
    if (snippetItem instanceof Array) {
      return snippetItem.join('\n');
    }
    return snippetItem;
  }
}

function removeUnuseSnippetField(str: string): string {
  return str.replace(/(?<=\n)\t*\S*:\s?\S*\$\{\S*\}\S*\n/g, '');
}

export function fillValueInSnippet(type: string, snippetMap: Map<string, Array<string> | string>, dataSource: Map<string, any> | string): string {
  let template = getSnippet(snippetMap, type);
  let text = template.replace(/\$\{\S*\}/g, str => {
    if (typeof dataSource === 'string') return dataSource;

    let field = str.slice(2, -1);
    if (field.includes(':')) {
      let pair = field.split(':');
      let value = dataSource.get(pair[0]);
      return value ? fillValueInSnippet(pair[1], snippetMap, value) : str;
    }
    return dataSource.get(field) ?? str;
  });
  return removeUnuseSnippetField(text);
}