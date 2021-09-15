
export function toBeforeFixed(str: string, num: number): string {
  // 尽可能补位，不去截断，以免丢失精度
  if (str.length < num) {
      return new Array(num - str.length).fill(0).join('') + str;
  }

  return str;
}

export function copyToClipboard(str: string): boolean {
  let textarea: HTMLTextAreaElement = document.createElement('textarea');
  textarea.setAttribute('id', 'clipboard_input');
  textarea.value = str;
  document.body.appendChild(textarea);
  textarea.select();

  let result: boolean = document.execCommand('copy');

  textarea.remove();

  return result;
}