import { parsePx, parseStr } from "./common";

function parseFontWeight(str: string): string {
  switch (str) {
      case '400':
          return 'normal';
      case '200':
          return 'bold';
      default:
          return `w${str}`;
  }
}

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