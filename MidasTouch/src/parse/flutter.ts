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
      default:
          return parseStr;
  }
}