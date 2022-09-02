
window.onload = () => {
  let tableList: NodeListOf<HTMLTableElement> = document.querySelectorAll('table');
  tableList.forEach((table) => {
    let btn: HTMLButtonElement = document.createElement('button');
    let text: HTMLSpanElement = document.createElement('span');
    text.innerText = '导出'
    btn.appendChild(text);

    let scope = table.parentNode ?? table;
    let exportTextarea: HTMLTextAreaElement = document.createElement('textarea');

    btn.onclick = () => {
      let tableData = [];
      // Use first body
      if (table.tBodies?.item(0)?.rows?.item(0)) {
        let body = table.tBodies[0].rows;
        let hasHead = table.tHead?.rows?.item(0) != null;
        let head = hasHead ? table.tHead?.rows?.item(0) : body[0]

        for (let index = hasHead ? 0 : 1; index < body.length; index++) {
          tableData.push(Array.from(body[index].cells).map((cell) => cell.innerText));
        }

        // console.log(`table head: ${head.cells}`);
        // console.log(`table body length: ${table.tBodies[0].rows.length}`);
        // console.log(`table rows length: ${table.rows.length}`);
        let text = JSON.stringify(tableData);
        exportTextarea.textContent = text;
        copyToClipboard(text);
      }

    }

    scope.appendChild(btn);
    scope.appendChild(exportTextarea);
  });
}


function copyToClipboard(str: string): boolean {
  let textarea: HTMLTextAreaElement = document.createElement('textarea');
  textarea.setAttribute('id', 'clipboard_input');
  textarea.value = str;
  document.body.appendChild(textarea);
  textarea.select();

  let result: boolean = document.execCommand('copy');

  textarea.remove();

  return result;
}