//the call to bored API
var mainButton = document.querySelector("#boredButton")
var dropdownHeader = document.querySelector(".dropbtn")
var dropdownOptions = document.querySelector(".dropdown-content")
var boredAPIResponse = document.querySelector(".boredAPI")
var cards = document.querySelectorAll(".card")
var modal = document.getElementById("modalTriggerCard")
//this will be the button to toggle the modal appearing or not
var modalToggle = document.getElementById("toggleModal")

var urlOgMetaTag = document.querySelector('[property="og:url"]')
var facebookShare = document.querySelector(".fb-share-button")
var ogTitleMetaTag = document.querySelector('[property="og:title"]')
var ogImageMetaTag = document.querySelector('[property="og:image"]')

var facebookScript = `(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v3.0";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));`


facebookShare.setAttribute("data-href",window.location.href)
urlOgMetaTag.setAttribute("content",window.location.href)




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
        ogTitleMetaTag.setAttribute("content",suggestion)//do something with the data
        getGIF(suggestion)
        for (var i = 0; i < cards.length; i++){
            var card = cards[i]
            if (card.id != "modalTriggerCard"){
              card.classList.remove("is-hidden")
            }            
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
            ogImageMetaTag.setAttribute("content",GIFImage)//console.log(GIFImage)
            GIFEl.src = GIFImage
        }
      var script = document.createElement('script')
      script.innerText = facebookScript
      document.body.appendChild(script)

    })
}

function selectOption(event){
    var selectedOption = event.target.innerText
    dropdownHeader.innerText = selectedOption
    
}

function toggleModal(){
  var list = modal.classList
  if (list.length === 1){
    list.add("is-hidden")
    modalToggle.innerText = "Show Modal"
  } else {
    list.remove("is-hidden")
    modalToggle.innerText = "Hide Modal"
  }
}
//event listeners for the modal

modalToggle.addEventListener("click", toggleModal)

document.addEventListener('DOMContentLoaded', () => {
    // Functions to open and close a modal
    function openModal($el) {
      $el.classList.add('is-active');
    }
  
    function closeModal($el) {
      $el.classList.remove('is-active');
    }
  
    function closeAllModals() {
      (document.querySelectorAll('.modal') || []).forEach(($modal) => {
        closeModal($modal);
      });
    }
  
    // Add a click event on buttons to open a specific modal
    (document.querySelectorAll('.js-modal-trigger') || []).forEach(($trigger) => {
      const modal = $trigger.dataset.target;
      const $target = document.getElementById(modal);
  
      $trigger.addEventListener('click', () => {
        openModal($target);
      });
    });
  
    // Add a click event on various child elements to close the parent modal
    (document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button') || []).forEach(($close) => {
      const $target = $close.closest('.modal');
  
      $close.addEventListener('click', () => {
        closeModal($target);
      });
    });
  
    // Add a keyboard event to close all modals
    document.addEventListener('keydown', (event) => {
      if (event.code === 'Escape') {
        closeAllModals();
      }
    });
  });

//event listeners for the dropdown and main button

mainButton.addEventListener("click", getThingToDo)
dropdownOptions.addEventListener("click", selectOption)

