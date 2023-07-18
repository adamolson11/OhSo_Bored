//the call to bored API
var mainButton = document.querySelector(".button")
var dropdownHeader = document.querySelector(".dropbtn")
var dropdownOptions = document.querySelector(".dropdown-content")
var boredAPIResponse = document.querySelector(".boredAPI")
var GIFEl = document.querySelector(".giphy-gif")

function getThingToDo(){
    fetch("https://www.boredapi.com/api/activity")
    .then(function(response){
        //console.log(response.status)
        return response.json()
    }).then(function(data){
        var suggestion = data.activity
        boredAPIResponse.innerHTML = suggestion
        //do something with the data
        getGIF(suggestion)
    })
}

function getGIF(query){
    //the call to giphy API
    //'q' is where the suggestion from bored API will go
    //all others are unimportant
    fetch("https://api.giphy.com/v1/gifs/search?api_key=PRySORNjXGxSwtXPYa9rBLmB9WAFuRDa&q=" + query + "&limit=25&offset=0&rating=g&lang=en&bundle=messaging_non_clips")
    .then(function(response){
        //console.log(response.status)
        return response.json()
    }).then(function(json){
        var GIF = json.data[0]
        var GIFImage = GIF.images.original.url
        //console.log(GIFImage)
        GIFEl.src = GIFImage
    })
}

function selectOption(event){
    var selectedOption = event.target.innerText
    dropdownHeader.innerText = selectedOption
    
}

//event listener for the dropdown to select which option the user wants
mainButton.addEventListener("click", getThingToDo)
dropdownOptions.addEventListener("click", selectOption)