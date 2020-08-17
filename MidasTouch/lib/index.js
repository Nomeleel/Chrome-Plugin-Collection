import { parser } from './parse.js'

/*window.onload = function() {
    console.log('目标页面已加载...');
    alert('目标页面已加载...');

    let codeDetail = document.querySelector('div.mu-paper.mu-drawer.mu-paper-round.mu-paper-2');

    codeDetail.appendChild(copyTextButton());
}
*/
function copyTextButton() {
    let textButton = document.createElement('button');
    textButton.appendChild(document.createTextNode('Copy Text'));
    textButton.setAttribute('class', 'zoom_box');

    textButton.addEventListener('click', buttonClickListener, false);

    return textButton;
}

function buttonClickListener(event) {
    // CSS的数据结构简单，方便处理
    let code = document.querySelector('code.language-css');
    let codeStr = '';
    Array.from(code.childNodes).forEach(e => codeStr += e instanceof Text ? e.textContent : e.innerText);
    console.log(codeStr);

    let dataMap = parseDataMap(codeStr);

    console.log(dataMap);

    let text = fillValueInTemplate(template)

    console.log(dataMap);
}

export function parseDataMap(str) {
    let dataMap = {};
    str = str.replace(/\n/g, '');
    let dataPairList = str.split(';');
    dataPairList.forEach(e => {
        let pair = e.split(':');
        if (pair.length == 2) {
            dataMap[pair[0]] = parser(pair[0])(pair[1]);
        }
    });

    return dataMap;
}

// TODO imp.
function parseDataMapByRegExp(str) {
    let dataMap = {};
    let reg = /(\S*):(\S*);/;
    let result = reg.exec(str);
    
    console.log(result);

    return dataMap;
}

export function fillValueInTemplate(template) {
    return template.replace(/\$\{\S*\}/g, str => dataMap[str.slice(2, -1)]);
}