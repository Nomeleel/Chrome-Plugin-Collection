window.onload = function() {
    console.log('目标页面已加载...');
    alert('目标页面已加载...');

    let codeDetail = document.querySelector('div.mu-paper.mu-drawer.mu-paper-round.mu-paper-2');
    //let codeDetail = document.getElementById('copy_code');
    // copy_code class="zoom_box
    console.log(codeDetail);
    alert(codeDetail);
    let textButton = document.createElement('button');
    textButton.appendChild(document.createTextNode('Copy Text'));
    textButton.setAttribute('class', 'zoom_box');

    textButton.addEventListener('click', function(event) {
        // CSS的数据结构简单，方便处理
        let code = document.querySelector('code.language-css');
        let codeStr = '';
        Array.from(code.childNodes).forEach(e => codeStr += e instanceof Text ? e.textContent : e.innerText);
        alert(codeStr);
    }, false);

    codeDetail.appendChild(textButton);
}