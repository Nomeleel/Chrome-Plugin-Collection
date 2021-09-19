import { toBeforeFixed } from "../util/common";

/**
 * input:  string  
 * output: string
 */
export function parseStr(str: string): string {
  return str;
}

/**
 * input:  7.7px  77px  
 * output: 7.7    77
 */
export function parsePx(str: string): number {
  return parseFloat(str.replace('px', ''));
}

/**
 * input:  10  
 * output: 0A
 */
export function parseHEX(str: string): string {
  return toBeforeFixed(parseInt(str).toString(16).toUpperCase(), 2);
}

/**
 * input:  0.2  
 * output: 33
 */
export function parseAlpha(str: string): string {
  return parseHEX(`${parseFloat(str) * 255}`);
}

export function parseDataMap(str: string, parser: Function): Map<string, any> {
  let dataMap = new Map<string, any>();
  str = str.replace(/\n/g, '');
  let dataPairList = str.split(';');
  dataPairList.forEach(e => {
      let pair = e.split(':');
      if (pair.length == 2) {
          dataMap.set(pair[0], parser(pair[0])(pair[1].trim()));
      }
  });
  
  return dataMap;
}