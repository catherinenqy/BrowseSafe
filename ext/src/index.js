function displayLoad() {
    var overlay = document.createElement('div');
    overlay.id = "overlay";
    overlay.style.cssText = 'background-image: url("http://papers.co/wallpaper/papers.co-sm58-cool-pastel-blur-gradation-blue-25-wallpaper.jpg");position: fixed; display: block; width: 100%;height: 100%;top: 0;left: 0;right: 0;bottom: 0;background-color: rgba(0,0,0,1); z-index: 999; cursor: pointer;';

    var loadingText = document.createElement('div');
    loadingText.style.cssText = 'display: block;position: absolute; top: 50%;left: 50%;font-size: 30px;color: #696969;transform: translate(-50%,-50%);-ms-transform: translate(-50%,-50%); z-index: 1000;';
    loadingText.innerHTML = 'scanning web page for trigger warnings<br>';

    overlay.appendChild(loadingText);
    document.body.insertBefore(overlay, document.body.firstChild);

    setTimeout(function () {
        loadingText.style.display = "none";
        overlay.style.display = "none";
    }, 4000);
}

function displayTriggerWarning() {
    var overlay2 = document.createElement('div');
    overlay2.id = "overlay2";
    overlay2.style.cssText = 'background-image: url("http://papers.co/wallpaper/papers.co-sm58-cool-pastel-blur-gradation-blue-25-wallpaper.jpg");position: fixed; display: block; width: 100%;height: 100%;top: 0;left: 0;right: 0;bottom: 0;background-color: rgba(0,0,0,1); z-index: 999; cursor: pointer;';

    var triggerText = document.createElement('div');
    triggerText.style.cssText = 'display: block;position: absolute; top: 50%;left: 50%;font-size: 30px;color: #696969;transform: translate(-50%,-50%);-ms-transform: translate(-50%,-50%); z-index: 1000;';
    triggerText.innerHTML = 'We have found a Trigger Warning on this web page.<br><br> Close the web page to avoid seeing this trigger.<br><br>Wait 10 seconds to continue onto the web page<br>';

    overlay2.appendChild(triggerText);
    document.body.insertBefore(overlay2, document.body.firstChild);

    setTimeout(function () {
        overlay2.style.display = "none";
    }, 10000);
}

function processImages() {

    var images = document.getElementsByTagName("img")
    var data = []

    for (var i = 0; i < images.length; i++) {
        data.push({ url: images[i].src })
    }

    var subscriptionKey = "2379cdad9b2045679f65962821c5ecda";
    var url = new URL('https://eastus.api.cognitive.microsoft.com/vision/v2.0/analyze')

    var params = {
        "visualFeatures": "Description",
        "details": "",
        "language": "en",
    };
    url.search = new URLSearchParams(params)

    for (let i = 0; i < data.length; i++) {
        fetch(url,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Ocp-Apim-Subscription-Key': subscriptionKey,
                },
                body: JSON.stringify(data[i]), // body data type must match "Content-Type" header
            }).then(r => r.json().then(response => {
                if (response.description.tags.includes("weapon")) {
                    if (document.getElementById("overlay2") == null) {
                        displayTriggerWarning();
                    }
                }
            }))
    }
}

displayLoad()
processImages()


