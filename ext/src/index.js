function processImages() {

    var subscriptionKey = "2379cdad9b2045679f65962821c5ecda";
    var url = new URL('https://eastus.api.cognitive.microsoft.com/vision/v2.0/analyze')

    var data = [{url: "https://upload.wikimedia.org/wikipedia/commons/3/3c/Shaki_waterfall.jpg"}, {url: "https://upload.wikimedia.org/wikipedia/commons/3/3c/Shaki_waterfall.jpg"} ]
    
    var params = {
        "visualFeatures": "Categories,Description,Color",
        "details": "",
        "language": "en",
    };
    url.search = new URLSearchParams(params)

    for (let i = 0; i < 1; i++) {
        fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Ocp-Apim-Subscription-Key': subscriptionKey,
        },
        body: JSON.stringify(data[i]), // body data type must match "Content-Type" header
        }).then(r => r.json().then(response => {
            alert(JSON.stringify(response, null, 2))
        }))
    }
}

processImages()
