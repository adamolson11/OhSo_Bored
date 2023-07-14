//the call to bored API
fetch("https://www.boredapi.com/api/activity")
.then(function(response){
    //console.log(response.status)
    return response.json()
}).then(function(data){
    var suggestion = data.activity
    console.log(suggestion)
    //do something with the data
})

//the call to giphy API
//'q' is where the suggestion from bored API will go
//all others are unimportant
//for now 'q' is set to 'test'
fetch("https://api.giphy.com/v1/gifs/search?api_key=PRySORNjXGxSwtXPYa9rBLmB9WAFuRDa&q=test&limit=25&offset=0&rating=g&lang=en&bundle=messaging_non_clips")
.then(function(response){
    //console.log(response.status)
    return response.json()
}).then(function(data){
    var GIF = data.data[0]
    var GIFImage = GIF.images.original.url
    console.log(GIFImage)
})