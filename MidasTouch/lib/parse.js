
function parsePx(str) {
    return  parseFloat(str.replace('px', ''));
}

export let parseMap = {
    'width': parsePx,
    'height': parsePx,
    'font-size': parsePx
}

export function parser(field) {
    switch(field) {
        case 'width':
        case 'height':
        case 'font-size':
            return parsePx;
        default:
            return value => value;
    }
}