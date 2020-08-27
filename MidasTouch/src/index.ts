import { parser } from './parse';
import { snippetMap } from './snippet';

//import '../static/style/style';

function copyTextSpan(): HTMLSpanElement {
    let textSpan: HTMLSpanElement = document.createElement('span');
    textSpan.appendChild(document.createTextNode('复制Text'));
    textSpan.setAttribute('id', 'copy_text_span');
    textSpan.setAttribute('class', 'right');
    textSpan.onclick = clickListener;
    //textButton.addEventListener('click', buttonClickListener, false);

    return textSpan;
}

function clickListener(this: GlobalEventHandlers, event: MouseEvent): any {
    let dataStr: string = getCSSDataStr();
    let dataMap = parseDataMap(dataStr);
    dataMap.set('text', getTextValue());
    let text = fillValueInSnippet(getSnippet('text'), dataMap);
    let result = copyToClipboard(text);
    if (result) {
        showSuccess();
    }
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
            dataMap.set(pair[0], parser(pair[0])(pair[1]));
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
    let snippetItem: any = snippetMap.get(type);
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
    return template.replace(/\$\{\S*\}/g, str => dataMap.get(str.slice(2, -1)));
}

function copyToClipboard(str: string): boolean {
    let textarea: HTMLTextAreaElement = document.createElement('textarea');
    textarea.setAttribute('id', 'clipboard_input');
    textarea.value = str;
    document.body.appendChild(textarea);
    textarea.select();

    let result: boolean = document.execCommand('copy');

    textarea.remove();

    return result;
}

function showSuccess(): void {
    let span: HTMLElement = document.getElementById('copy_text_span');
    let pos = span.getBoundingClientRect();

    let successDiv: HTMLElement = document.querySelector('div.copy_success');
    successDiv.setAttribute('style', `top: ${pos.y - 34}px; left: 115px;`);
    setTimeout(() => {
        successDiv.setAttribute('style', 'display: none');
    }, 3000);
}

// function addStyle() {
//     document.head.appendChild(document.createElement('style'));
//     let sheet: CSSStyleSheet = document.styleSheets[document.styleSheets.length - 1];
//     sheet.insertRule(style , sheet.cssRules.length);
// }

window.onload = function () {
    console.log('目标页面已加载...');
    alert('目标页面已加载...');

    // let codeDetail = document.querySelector('div.mu-paper.mu-drawer.mu-paper-round.mu-paper-2');
    // console.log(codeDetail);
    // codeDetail.appendChild(copyTextSpan());

    let codeDetail = document.querySelector('div.mu-paper.mu-drawer.mu-paper-round.mu-paper-2');
    codeDetail.addEventListener('click', function(event) {
        console.log('Add span...');
        let subtitleDiv = document.querySelector('div.code_detail div.subtitle');
        console.log(subtitleDiv);
        if (!document.getElementById('copy_text_span')) {
            subtitleDiv?.appendChild(copyTextSpan());
        }
    }, false);

}
