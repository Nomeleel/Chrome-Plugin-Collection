
window.onload = () => {
  let tableList: NodeListOf<HTMLTableElement> = document.querySelectorAll('table');
  tableList.forEach((table) => {
    let btn: HTMLButtonElement = document.createElement('button');
    let text: HTMLSpanElement = document.createElement('span');
    text.innerText = '导出'
    btn.appendChild(text);
    btn.onclick = () => {
      // Use first body
      if (table.tBodies?.item(0)?.rows?.item(0)) {
        let body = table.tBodies[0].rows;
        let hasHead = table.tHead?.rows?.item(0) != null;
        let head = hasHead ? table.tHead?.rows?.item(0) : body[0]
        
        for (let index = hasHead ? 0 : 1; index < body.length; index++) {
          console.log(`body row: ${Array.from(body[index].cells).map((cell) => cell.innerText)}`);
          // for (const cell of body[index].cells) {
          //   console.log(`cell: ${cell.innerText}`);
          // }
        }

        // console.log(`table head: ${head.cells}`);
        // console.log(`table body length: ${table.tBodies[0].rows.length}`);
        // console.log(`table rows length: ${table.rows.length}`);
      }

    }

    (table.parentNode ?? table).appendChild(btn);
  });
}
