let productionDomains = [
    'www.legito.cz',
    'www.legito.com',
    'legito.com',
    'legito.cz',
];

chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({productionDomains});
    console.log('Setting default production domains');
});

//Change tab events
chrome.tabs.onActivated.addListener(function (activeInfo) {
    chrome.storage.sync.get("productionDomains", ({productionDomains}) => {
        chrome.tabs.query({active: true, currentWindow: true}, ([currentTab]) => {
            if (currentTab.url) {
                var url = new URL(currentTab.url)
                var domain = url.hostname

                if (productionDomains.includes(domain)) {
                    chrome.scripting.executeScript({
                        target: {tabId: currentTab.id},
                        function: productionWarning,
                    });
                } else {
                    chrome.scripting.executeScript({
                        target: {tabId: currentTab.id},
                        function: removeProductionWarning,
                    });
                }
            }
        })
    })
});

function removeProductionWarning() {
    let exist = document.getElementById('warning-text-legito');
    if (!exist) {
        return;
    }

    exist.remove();
}

function productionWarning() {
    let exist = document.getElementById('warning-text-legito');
    if (exist) {
        return;
    }

    let warningDiv = document.createElement('div');
    warningDiv.id = 'warning-text-legito';
    warningDiv.style.background = 'red';
    warningDiv.style.color = 'white';
    warningDiv.style.textAlign = 'center';

    let h1 = document.createElement('h1');
    let content = document.createTextNode('PRODUKCE POZOR');
    h1.appendChild(content);

    warningDiv.append(h1);

    let headerMenu = document.getElementById("header-menu");
    if (headerMenu) {
        headerMenu.append(warningDiv);
    } else {
        document.body.prepend(warningDiv);
    }
}

