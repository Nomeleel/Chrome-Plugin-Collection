import { parser } from './parse';
import { snippetMap } from './snippet';

function copyTextButton(): HTMLButtonElement {
    let textButton: HTMLButtonElement = document.createElement('button');
    textButton.appendChild(document.createTextNode('Copy Text'));
    textButton.setAttribute('class', 'zoom_box');
    textButton.onclick = buttonClickListener;
    //textButton.addEventListener('click', buttonClickListener, false);

    return textButton;
}

function buttonClickListener(this: GlobalEventHandlers, event: MouseEvent): any {
    let dataStr: string = getCSSDataStr();
    let dataMap = parseDataMap(dataStr);
    dataMap['text'] = getTextValue();
    let text = fillValueInSnippet(getSnippet('text'), dataMap);

    console.log(text);
}

// CSS的数据结构简单，方便处理
function getCSSDataStr(): string {
    let dataStr = '';
    let code: HTMLElement = document.querySelector('code.language-css');
    Array.from(code.childNodes).forEach(e => dataStr += getElementText(e));
    console.log(dataStr);

    return dataStr;
}

function getElementText(element: any): string {
    if (element instanceof Text) {
        return element.textContent
    }

    if (element instanceof HTMLElement) {
        return element.innerText
    }

    return '';
}

function parseDataMap(str: string): Map<string, any> {
    let dataMap = new Map<string, any>();
    str = str.replace(/\n/g, '');
    let dataPairList = str.split(';');
    dataPairList.forEach(e => {
        let pair = e.split(':');
        if (pair.length == 2) {
            dataMap[pair[0]] = parser(pair[0])(pair[1]);
        }
    });

    console.log(dataMap);
    return dataMap;
}

// TODO imp.
function parseDataMapByRegExp(str: string): Map<string, any> {
    let dataMap = new Map<string, any>();
    let reg = /(\S*):(\S*);/;
    let result = reg.exec(str);

    console.log(result);

    return dataMap;
}

function getTextValue(): string {
    let textDiv: HTMLElement = document.querySelector('div.item_content');

    return textDiv == null ? '' : textDiv.innerText;
}

function getSnippet(type: string): string {
    let snippet: string = '';
    let snippetItem: any = snippetMap[type];
    if (snippetItem != null) {
        if (snippetItem instanceof String) {
            snippet = snippet;
        } else if (snippetItem instanceof Array) {
            snippet = snippetItem.join('\n');
        } else {
            // Nothing
        }
    }

    return snippet;
}

function fillValueInSnippet(template: string, dataMap: Map<string, any>): string {
    return template.replace(/\$\{\S*\}/g, str => dataMap[str.slice(2, -1)]);
}

window.onload = function () {
    console.log('目标页面已加载...');
    alert('目标页面已加载...');

    let codeDetail = document.querySelector('div.mu-paper.mu-drawer.mu-paper-round.mu-paper-2');

    codeDetail.appendChild(copyTextButton());
}