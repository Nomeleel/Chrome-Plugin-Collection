import { parsePx, parseStr } from "./common";

/**
 * input:  700  
 * output: bold
 */
function parseFontWeight(str: string): string {
  switch (str) {
    case '400':
      return 'normal';
    case '700':
      return 'bold';
    default:
      return `w${str}`;
  }
}

/**
 * input:  #123456  
 * output: 0xFF123456
 */
function parseRGBHEX(str: string): string {
  return str.replace('#', '0xFF');
}

/**
 * input:  [1px, 1px]
 * output: 1, 1
 */
 function parseArrayOffset(array: string[]): string {
  return array.map(parsePx).join(',');
}

/**
 * input:  1px 1px 0 #000000  
 * output: {
 *   'offset': '1, 1',
 *   'blur': 0,
 *   'color': '00000000'
 * }
 */
function parseShadow(str: string): Map<string, any> {
  let map = new Map();
  let shadom = str.split(' ');
  if (shadom.length == 4) {
    map.set('offset', parseArrayOffset(shadom.slice(0, 2)));
    map.set('blur', shadom[2]);
    map.set('color', parseRGBHEX(shadom[3]));
  }
  return map;
}

export function parser(field: string): Function {
  switch (field) {
    case 'width':
    case 'height':
    case 'font-size':
      return parsePx;
    case 'font-weight':
      return parseFontWeight;
    case 'color':
      return parseRGBHEX;
    case 'text-shadow':
      return parseShadow;
    default:
      return parseStr;
  }
}