
export function parseStr(str: string): string {
  return str;
}

export function parsePx(str: string): number {
  return parseFloat(str.replace('px', ''));
}

export function toBeforeFixed(str: string, num: number): string {
  // 尽可能补位，不去截断，以免丢失精度
  if (str.length < num) {
      return new Array(num - str.length).fill(0).join('') + str;
  }

  return str;
}

export function parseHEX(str: string): string {
  return toBeforeFixed(parseInt(str).toString(16).toUpperCase(), 2);
}

export function parseAlpha(str: string): string {
  return parseHEX(`${parseFloat(str) * 255}`);
}