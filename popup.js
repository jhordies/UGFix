'use strict';

function apply() {
    console.log("Reloading");

    chrome.tabs.getSelected(null, function(tab) {
        var code = 'window.location.reload();';
        chrome.tabs.executeScript(tab.id, {code: code});
    });
    window.close();
}

function onStartStopChange(){
    let key = document.getElementById('startStop').value;
    chrome.storage.sync.set({startStopKey: key}, function() {
        console.log('start stop key is ' + key);
    })
}

function onSpeedDownChange(){
    let key = document.getElementById('speedDown').value;
    chrome.storage.sync.set({speedDownKey: key}, function() {
        console.log('Speed down key is ' + key);
    })
}
function onHideToolBoxChange(){
    let checked = document.getElementById('hideToolBox').checked;
    chrome.storage.sync.set({hideToolBox: checked}, function() {
        console.log('Hide toolbox' + checked);
    })
}

function onSpeedUpChange(){
    let key = document.getElementById('speedUp').value;
    chrome.storage.sync.set({speedUpKey: key}, function() {
        console.log('Speed up key is ' + key);
    })
}

function onHideLeftBannerChange() {
    let checked = document.getElementById('hideLeftBanner').checked;
    chrome.storage.sync.set({hideLeftBanner: checked}, function() {
        console.log('Hide left banner' + checked);
    })
}

function addListeners() {
    document.getElementById("startStop").addEventListener('change',onStartStopChange);
    document.getElementById("speedUp").addEventListener('change',onSpeedUpChange);
    document.getElementById("speedDown").addEventListener('change',onSpeedDownChange);
    document.getElementById("hideToolBox").addEventListener('change',onHideToolBoxChange);
    document.getElementById("hideLeftBanner").addEventListener('change',onHideLeftBannerChange);
    document.getElementById("apply").addEventListener('click',apply);

}


function showRegisteredKeys() {
    chrome.storage.sync.get('startStopKey', function(data) {
        let val = data.startStopKey?data.startStopKey:'play/pause';
        document.getElementById("startStop").value=val;
    });
    chrome.storage.sync.get('speedUpKey', function(data) {
        let val = data.speedUpKey?data.speedUpKey:'next';
        document.getElementById("speedUp").value=val;
    });
    chrome.storage.sync.get('speedDownKey', function(data) {
        let val = data.speedDownKey?data.speedDownKey:'previous';
        document.getElementById("speedDown").value=val;
    });
    chrome.storage.sync.get('hideToolBox', function(data) {
        let val = data.hideToolBox?data.hideToolBox:false;
        document.getElementById("hideToolBox").checked=val;
    });
    chrome.storage.sync.get('hideLeftBanner', function(data) {
        let val = data.hideLeftBanner?data.hideLeftBanner:false;
        document.getElementById("hideLeftBanner").checked=val;
    });
}

showRegisteredKeys();
addListeners();