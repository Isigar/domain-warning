function addDomainToList(domain){
    let li = document.createElement('li');
    let content = document.createTextNode(domain);
    li.appendChild(content)
    return li;
}

window.onload = function() {
    console.log("onload" + Date())

    let domainList = document.getElementById('domainList');
    let addButton = document.getElementById('addButton');

    chrome.storage.sync.get("productionDomains", ({ productionDomains }) => {
        console.log(productionDomains);
        productionDomains.forEach((domain) => {
            domainList.append(addDomainToList(domain));
        })
    });

    addButton.addEventListener('click',  () => {
       let inputText = document.getElementById('addTextInput');
    });
}
