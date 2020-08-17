import { parseDataMap } from './index.js';

let testStr = 
`width:209px;
height:29px;
font-size:30px;
font-family:PingFang SC;
font-weight:bold;
color:rgba(12,34,56,1);`

let testStr2 = `width:209px;height:29px;font-size:30px;font-family:PingFang SC;font-weight:bold;color:rgba(68,68,68,1);`

let testStr3 = `width:209px;`

let dataMap = parseDataMap(testStr);

console.log(dataMap);
console.log(dataMap['font-size']);

let textTemplate = `{
\t"width": \${width},
\t"height": \${height},
\t"fontSize": \${font-size},
\t"fontFamily": "\${font-family}",
\t"fontWeight": "\${font-weight}",
\t"color": "\${color}"
}`;

console.log(textTemplate.replace(/\$\{\S*\}/g, str => dataMap[str.slice(2, -1)]));

console.log(parseInt('0').toString(16));

console.log('1, 22, 33, 0.06'.match(/(0\.)?\d+/g));
