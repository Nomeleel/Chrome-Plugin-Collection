import { parseDataMap } from './index.js';

let testStr = 
`width:209px;
height:29px;
font-size:30px;
font-family:PingFang SC;
font-weight:bold;
color:rgba(68,68,68,1);`

let testStr2 = `width:209px;height:29px;font-size:30px;font-family:PingFang SC;font-weight:bold;color:rgba(68,68,68,1);`

let testStr3 = `width:209px;`

let dataMap = parseDataMap(testStr);

console.log(dataMap);
console.log(dataMap['font-size']);

let textTemplate = 'width: ${width}; height: ${height}';

console.log(textTemplate.replace(/\$\{\S*\}/g, str => dataMap[str.slice(2, -1)]));
