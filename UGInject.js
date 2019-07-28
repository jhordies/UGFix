var speed = 25;
var my_scope = this;
var scrolling = false;
var startStopKey;
var speedUpKey;
var speedDownKey;
var shouldHideToolBox=false;
var shouldHideLeftBanner=false;
var listener;

var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        if (!mutation.addedNodes) return;

        for (var i = 0; i < mutation.addedNodes.length; i++) {
            if(hideToolbox()&& hideLeftBanner())break;
        }
    })
})

// stop watching using:
//observer.disconnect();

function pageScroll() {
    if(scrolling) {
        window.scrollBy(0, 1);
        scrolldelay = setTimeout(pageScroll, 1000 / speed);
    }else{
        scrolldelay = setTimeout(pageScroll, 100);
    }
}

function findElementWithText(tagname, text) {
    var aTags = document.getElementsByTagName(tagname);
    var searchText = text;
    var found;

    for (var i = 0; i < aTags.length; i++) {
        if (aTags[i].textContent == searchText || aTags[i].innerText == searchText) {
            found = aTags[i];
            break;
        }
    }
    return found;
}

function hideToolbox() {
    var found = findElementWithText("span","Autoscroll");
    if(shouldHideToolBox && found) {
        found.parentNode.parentNode.parentNode.style.display = "none";
    }
    if (found){
        return found.parentNode.parentNode.parentNode;
    }
    return undefined;
}

function hideLeftBanner() {
    var found = findElementWithText("header","MORE VERSIONS");
    if(shouldHideLeftBanner && found) {
        found.parentNode.parentNode.parentNode.parentNode.style.display = "none";
    }
    if(found){
        return found.parentNode.parentNode.parentNode.parentNode;
    }
    return undefined;
}


function ready() {
    listener= new window.keypress.Listener();

    chrome.storage.sync.get('startStopKey', function(data) {
        startStopKey = data.startStopKey?data.startStopKey:'play/pause';


        listener.register_many([
            {
                "keys"          : startStopKey,
                "is_exclusive"  : true,
                "on_keyup"      : function(event) {
                    scrolling=!scrolling;
                    return true
                },
                "this"          : my_scope
            }
        ]);

    });
    chrome.storage.sync.get('speedUpKey', function(data) {
        speedUpKey = data.speedUpKey?data.speedUpKey:'next';

        listener.register_many([
            {
                "keys"          : speedUpKey,
                "is_exclusive"  : true,
                "on_keydown"      : function(event) {
                    speed++;
                    console.log("Increase speed to:"+speed);
                    return true
                },
                "this"          : my_scope
            }
        ]);
    });
    chrome.storage.sync.get('speedDownKey', function(data) {
        speedDownKey = data.speedDownKey?data.speedDownKey:'previous';
        listener.register_many([
            {
                "keys"          : speedDownKey,
                "is_exclusive"  : true,
                "on_keydown"      : function(event) {
                    if(speed>2){
                        speed--;
                    }
                    console.log("Reduce speed to:"+speed);
                    return true
                },
                "this"          : my_scope
            }
        ]);
    });

    chrome.storage.sync.get('hideToolBox', function(data) {
        shouldHideToolBox=data.hideToolBox?data.hideToolBox:false;
        console.log("Should hide toolbox is "+shouldHideToolBox);
    });

    chrome.storage.sync.get('hideLeftBanner', function(data) {
        shouldHideLeftBanner=data.hideLeftBanner?data.hideLeftBanner:false;
        console.log("Should hide left banner is "+shouldHideLeftBanner);
    });

    observer.observe(document.querySelector('button, header'), {
        childList: true
        , subtree: true
        , attributes: false
        , characterData: false
    })


    window.scrollTo(0, 0);
    pageScroll();
}

document.addEventListener("DOMContentLoaded", ready);