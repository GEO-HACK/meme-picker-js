import { catsData } from "./data.js";

const emotionRadios = document.getElementById("emotion-radios");
const getImageBtn = document.getElementById("get-image-btn");
const gifsOnlyOption = document.getElementById("gifs-only-option");
const memeModal = document.getElementById("meme-modal");
const memeModalInner = document.getElementById("meme-modal-inner");
const memeModalBtn = document.getElementById("meme-modal-close-btn");

memeModalBtn.addEventListener("click", function(){
    memeModal.style.display = "none"
})


emotionRadios.addEventListener("change", highlightCheckedOption )
getImageBtn.addEventListener("click", renderCat)



function highlightCheckedOption(e){
    const radios = document.getElementsByClassName('radio')
    for (let radio of radios){//iterating through the radios
        radio.classList.remove('highlight')
    }
    document.getElementById(e.target.id).parentElement.classList.add('highlight')

}

function getMatchingCatsArray(){
    

    if(document.querySelector('input[name="emotion"]:checked')){
        const selectedEmotion = document.querySelector('input[name="emotion"]:checked').value
        const isGif = gifsOnlyOption.checked


        const MatchingCatsArray = catsData.filter(function(cat){
            if(isGif){
                return cat.emotionTags.includes(selectedEmotion) && cat.isGif
            }
            else{
                return cat.emotionTags.includes(selectedEmotion)

            }
           
        })
        return MatchingCatsArray
        
          
    }

}
function getSingleCatObjects(){
    const catsArray = getMatchingCatsArray()//invoking the function that wioll return a value
    

    if(catsArray.length === 1){
        return catsArray[0]
        
    }
    else{
        const randomIndex = Math.floor(Math.random() * catsArray.length)
        return catsArray[randomIndex]
    }
   
   
    
  


}
function renderCat(){
    const catObject  = getSingleCatObjects()
    memeModalInner.innerHTML = `
              <img
               class = "cat-image"
               src="images/${catObject.image}" 
               alt="${catObject.alt}">`

               memeModal.style.display = "flex"

}

function getEmotionsArray(cats){
    const emotionsArray = []

    for (let cat of cats){
        for (let emotion of cat.emotionTags){


            if(!emotionsArray.includes(emotion)){
                emotionsArray.push(emotion)

            }  
        }
    }  
    return emotionsArray
}



function renderEmotionsRadios(cats){
    let radioItems = ``
    const emotions = getEmotionsArray(cats)
    for(let emotion of emotions){
        radioItems += `
        <div class="radio">
            <label for="${emotion}">${emotion}</label>
                <input
                    type="radio"
                    id="${emotion}"
                    value="${emotion}"
                    name="emotion"
                    >
            </div>
            `
    }
    emotionRadios.innerHTML = radioItems
}
renderEmotionsRadios(catsData)
