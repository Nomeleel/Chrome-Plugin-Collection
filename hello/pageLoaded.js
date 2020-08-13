window.onload = function() {
    alert("页面加载完成...");
    window.addEventListener("click", function(event) {
        alert("点击了页面...");

        let pElement = document.createElement("p");
        let node = document.createTextNode("添加一个新的段落");
        pElement.appendChild(node);
        pElement.addEventListener("click", function(event) {
            alert("点击新的段落...")
        }, false);

        let element = document.getElementById("logo");
        element.appendChild(pElement);
    }, false);
}