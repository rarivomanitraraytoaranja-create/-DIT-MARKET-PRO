document.addEventListener("DOMContentLoaded", () => {

const searchInput = document.querySelector(".search-box input");

if(searchInput){

searchInput.addEventListener("keyup", () => {

const value = searchInput.value.toLowerCase();

const cards = document.querySelectorAll(".card");

cards.forEach(card => {

const text = card.innerText.toLowerCase();

if(text.includes(value)){
card.style.display = "block";
}else{
card.style.display = "none";
}

});

});

}

const cards = document.querySelectorAll(".card");

cards.forEach((card,index)=>{

card.style.opacity = "0";
card.style.transform = "translateY(30px)";

setTimeout(()=>{

card.style.transition = "0.5s";
card.style.opacity = "1";
card.style.transform = "translateY(0)";

},index * 100);

});

const heroButton = document.querySelector(".hero-btn");

if(heroButton){

heroButton.addEventListener("click",(e)=>{

e.preventDefault();

window.scrollTo({
top:document.body.scrollHeight / 4,
behavior:"smooth"
});

});

}

});
