function displayLoad(){
    var overlay = document.createElement('div');
    overlay.id = "overlay";
    overlay.style.cssText = 'position: fixed; display: block; width: 100%;height: 100%;top: 0;left: 0;right: 0;bottom: 0;background-color: rgba(0,0,0,1); z-index: 999; cursor: pointer;';

    var text = document.createElement('div');
    text.style.cssText ='position: absolute; top: 50%;left: 50%;font-size: 30px;color: white;transform: translate(-50%,-50%);-ms-transform: translate(-50%,-50%); z-index: 1000;';
    text.innerHTML = 'Scanning page for tw'; 

    var button = document. createElement("button");
    button.innerHTML = "Do Something";

    // document.body.insertAdjacentText(text, document.body.firstChild)
    overlay.appendChild(text);
    document.body.insertBefore(overlay, document.body.firstChild);

    // insertIn(overlay, document.body.firstChild);
    setTimeout(function(){
        overlay.style.display="none";
    }, 4000);
}

function processImages() {

    var images = document.getElementsByTagName("img")
    var data = []
    var tags = []

    for (var i = 0; i < images.length; i++){
        data.push({url: images[i].src})
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
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Ocp-Apim-Subscription-Key': subscriptionKey,
            },
        body: JSON.stringify(data[i]), // body data type must match "Content-Type" header
    }).then(r => r.json().then(response => {
        tags.push(response.description.tags)
        console.log(tags)
        if (response.description.tags.includes("weapon")) {
            if (document.getElementById("overlay") == null) {
                var elemDiv = document.createElement('div');
                elemDiv.id = "overlay";
                elemDiv.style.cssText = 'position: fixed;display: none;width: 100%;height: 100%;top: 0;left: 0;right: 0;bottom: 0;background-color: rgba(0,0,0,1);z-index: 2;cursor: pointer;';
                document.body.insertBefore(elemDiv, document.body.firstChild);

                var text = document.createElement('div');
                text.style.cssText = 'width:100%;height:10%;background:rgb(192,192,192);';
                text.innerHTML = 'Added element with some data'; 
                window.document.body.insertBefore(text, window.document.body.firstChild);

                    //<button id="offbutton"  onclick="off()">here</button>
                }
                
            }
        }))
}
}

displayLoad()
processImages()
