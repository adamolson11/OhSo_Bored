//the call to bored API
var mainButton = document.querySelector(".button")
var dropdownHeader = document.querySelector(".dropbtn")
var dropdownOptions = document.querySelector(".dropdown-content")
var boredAPIResponse = document.querySelector(".boredAPI")
var cards = document.querySelectorAll(".card")

function getCategory(){
    var type
    var dropdownHeaderText = dropdownHeader.innerText
    if (dropdownHeaderText === "Categories"){
        type = ''
    } else {
        //the API query takes the category in lowercase
        dropdownHeaderText = dropdownHeaderText[0].toLowerCase() + dropdownHeaderText.substring(1)
        if (dropdownHeaderText === "d.I.Y."){
            dropdownHeaderText = "diy"
        }
        type = '?type=' + dropdownHeaderText
        console.log(type)
    }
    return type
}

function getThingToDo(){
    var type = getCategory()
    
    fetch("https://www.boredapi.com/api/activity" + type)
    .then(function(response){
        //console.log(response.status)
        return response.json()
    }).then(function(data){
        var suggestion = data.activity
        boredAPIResponse.innerHTML = suggestion
        //do something with the data
        getGIF(suggestion)
        for (var i = 0; i < cards.length; i++){
            var card = cards[i]
            card.classList.remove("is-hidden")
        }
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
        for (var i = 0; i < 3; i++){
            var GIFEl = document.querySelector(".giphy-gif" + i)
            var GIF = json.data[i]
            var GIFImage = GIF.images.original.url
            //console.log(GIFImage)
            GIFEl.src = GIFImage
        }
        
    })
}

function selectOption(event){
    var selectedOption = event.target.innerText
    dropdownHeader.innerText = selectedOption
    
}

//event listener for the dropdown to select which option the user wants
mainButton.addEventListener("click", getThingToDo)
dropdownOptions.addEventListener("click", selectOption)