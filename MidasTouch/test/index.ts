import { parseDataMap } from "../src/parse/common";
import { parser } from "../src/parse/flutter";
import { snippetMap } from "../src/snippet/flutter";
import { copyToClipboard } from "../src/util/common";
import { fillValueInSnippet } from "../src/util/snippet";

window.onload = () => {
  console.log('目标页面已加载...');

  let go = document.getElementById('go');
  go.addEventListener('click', () => {
    let source : HTMLTextAreaElement = document.getElementById('source') as HTMLTextAreaElement;
    let dataMap = parseDataMap(source.value, parser);
    
    let target : HTMLTextAreaElement = document.getElementById('target') as HTMLTextAreaElement;
    target.value = fillValueInSnippet('text', snippetMap, dataMap);
  });

  let copy = document.getElementById('copy');
  copy.addEventListener('click', () => {
    let target : HTMLTextAreaElement = document.getElementById('target') as HTMLTextAreaElement;
    copyToClipboard(target.value);
  });
}
