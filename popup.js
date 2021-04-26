function addDomainToList(domain) {
    let li = document.createElement('li');
    let content = document.createTextNode(domain);
    li.appendChild(content)
    return li;
}

window.onload = function () {
    let domainList = document.getElementById('domainList');
    let addButton = document.getElementById('addButton');
    let currentDomain = document.getElementById('currentDomain');

    chrome.storage.sync.get("productionDomains", ({productionDomains}) => {
        console.log(productionDomains);
        productionDomains.forEach((domain) => {
            domainList.append(addDomainToList(domain));
        });

        addButton.addEventListener('click', () => {
            let inputText = document.getElementById('addTextInput');
            let value = inputText.value;
            if (value && value.length > 3) {
                productionDomains.push(value);
                chrome.storage.sync.set({
                    "productionDomains": productionDomains
                },() => {
                    //Reset list
                    domainList.innerHTML = '';

                    //Create new list
                    console.log(productionDomains);
                    productionDomains.forEach((domain) => {
                        domainList.append(addDomainToList(domain));
                    })
                });
            }
        });
    });
}
