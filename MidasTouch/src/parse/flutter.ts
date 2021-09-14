
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