import { parseAlpha, parseHEX, parsePx, parseStr } from "./common";

function parseFontWeight(str: string): string {
    switch (str) {
        // 各个语言会有统一的FontWeight定义，通常是[100,900]
        // 这里添加与css中的FontWeight枚举字段不统一的case
        case '100':
            return 'Thin';
        case '200':
            return 'extraLight';
        case '300':
            return 'light';
        case '500':
            return 'medium';
        case '600':
            return 'semiBold';
        case '800':
            return 'extraBold';
        case '900':
            return 'black';
        default:
            return str;
    }
}

function parseRGBA(str: string): string {
    let rgba = str.match(/\d+/g);

    if (rgba.length == 4) {
        return '#' + parseHEX(rgba[0]) + parseHEX(rgba[1]) +
            parseHEX(rgba[2]) + parseAlpha(rgba[3]);
    }

    return '#FFFFFFFF';
}

function parseRGBHEX(str: string): string {
    return str.replace('#', '#FF');
}

export let parseMap = {
    'width': parsePx,
    'height': parsePx,
    'font-size': parsePx,
    'font-family': parseStr,
    'font-weight': parseFontWeight,
    'color': parseRGBHEX
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