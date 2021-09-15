
export function fillValueInSnippet(template: string, dataMap: Map<string, any>): string {
  return template.replace(/\$\{\S*\}/g, str => dataMap.get(str.slice(2, -1)));
}