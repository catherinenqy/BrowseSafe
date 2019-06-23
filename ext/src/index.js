function processImages() {

    var images = document.getElementsByTagName("img")
    var data = []
    var output = []

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
            output.push(response.description.tags)
            console.log(output)
        }))
    }
}

processImages()
