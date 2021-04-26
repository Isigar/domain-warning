function bindDelete(productionDomains, domainList) {
    let deleteBtn = document.getElementsByClassName('removeDomain');

    for (var i = 0; i < deleteBtn.length; i++) {
        let dltBtn = deleteBtn.item(i);
        dltBtn.addEventListener('click', () => {
            let domain = dltBtn.dataset.domain;
            productionDomains.forEach((prDomain, it) => {
                if (prDomain === domain) {
                    productionDomains.splice(it, 1);
                }
            });

            chrome.storage.sync.set({
                "productionDomains": productionDomains
            }, () => {
                refreshList(productionDomains, domainList);
            })
        });
    }
}

window.onload = function () {
    let domainList = document.getElementById('domainList');
    let addButton = document.getElementById('addButton');
    chrome.storage.sync.get("productionDomains", ({productionDomains}) => {
        productionDomains.forEach((domain) => {
            domainList.append(addDomainToList(domain));
        });

        bindDelete(productionDomains, domainList);

        addButton.addEventListener('click', () => {
            let inputText = document.getElementById('addTextInput');
            let value = inputText.value;
            if (value && value.length > 3) {
                productionDomains.push(value);
                chrome.storage.sync.set({
                    "productionDomains": productionDomains
                }, () => {
                    //Create new list
                    refreshList(productionDomains, domainList);
                });
            }
        });
    });
}

function refreshList(productionDomains, domainList) {
    //Reset list
    domainList.innerHTML = '';

    //Apply new
    productionDomains.forEach((domain) => {
        domainList.append(addDomainToList(domain));
    });

    bindDelete(productionDomains, domainList);
}

function addDomainToList(domain) {
    let li = document.createElement('li');
    let content = document.createTextNode(domain);
    li.appendChild(content)

    let removeBtn = document.createElement('button');
    removeBtn.classList.add('btn');
    removeBtn.classList.add('btn-small');
    removeBtn.classList.add('btn-danger');
    removeBtn.innerHTML = '&times;';
    removeBtn.dataset.domain = domain;
    removeBtn.classList.add('removeDomain');
    li.append(removeBtn);
    return li;
}
