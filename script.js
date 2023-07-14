//the call to bored API
fetch("https://www.boredapi.com/api/activity").then(function(response){
    //console.log(response.status)
    return response.json()
}).then(function(data){
    var suggestion = data.activity
    console.log(suggestion)
    //do something with the data
})

//the call to giphy API