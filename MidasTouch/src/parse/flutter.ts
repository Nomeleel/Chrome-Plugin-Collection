import { appendMap, getAllMap, setMap } from "../util/map";
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
  return str.replace('#', 'FF').toUpperCase();
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
    map.set('blur', parsePx(shadom[2]));
    map.set('color', parseRGBHEX(shadom[3]));
  }
  return map;
}

/**
 * input:  2px solid #123456
 * output: {
 *   'all': {
 *      'width': 2,
 *      'style': solid,
 *      'color': FF123456
 *    }
 * }
 */
function parseBorder(str: string): Map<string, any> {
  let map = new Map();
  let border = str.split(' ');
  if (border.length == 3) {
    let all = setMap(
      'width', parsePx(border[0]),
      'style', parseBorderStyle(border[1]),
      'color', parseRGBHEX(border[2])
    );
    return getAllMap(all);
  }
  return map;
}

/**
 * input:  dotted solid double dashed none
 * output: solid  solid solid  solid  none
 */
function parseBorderStyle(str: string): string {
  return str === 'none' ? str : 'solid';
}

/**
 * input:  2px
 * output: {
 *   'all': 2
 * }
 */
function parseBorderRadius(str: string): Map<string, any> {
  let map = new Map();
  let border = str.split(' ');
  if (border.length == 1) {
    return getAllMap(parsePx(border[0]));
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
    case 'border':
      return parseBorder;
    case 'border-style':
      return parseBorderStyle;
    case 'border-radius':
      return parseBorderRadius;
    default:
      return parseStr;
  }
}