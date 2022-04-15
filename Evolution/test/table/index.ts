
window.onload = () => {
  let tableList: NodeListOf<HTMLTableElement> = document.querySelectorAll('table');
  tableList.forEach((table) => {
    let btn: HTMLButtonElement = document.createElement('button');
    let text: HTMLSpanElement = document.createElement('span');
    text.innerText = '导出'
    btn.appendChild(text);
    btn.onclick = () => {
      console.log(`table.border: ${table.border}`);
    }

    (table.parentNode ?? table).appendChild(btn);
  });
}
