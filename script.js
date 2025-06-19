const baseURL = `https://api.weatherapi.com/v1/current.json?key=8a83676d2eee453b97a152649250206&q=28.7041, 77.1025&aqi=no`;
let list = document.querySelector(".weather-list");
let weatherText = document.querySelector(".current-weather-text");
let weatherLogo = document.querySelector(".current-weather-logo4");
let minutes = document.querySelectorAll(".timing1");
let navbar = document.querySelector(".navbar");
let toggleBtn = document.querySelector(".fa-bars");
let navBg = document.querySelector(".nav-bg");
let constitution = document.querySelector("#constitution")
let isClicked = false;

const baseTimes = [
    parseInt((minutes[0].textContent) - 1),
    parseInt(minutes[1].textContent) - 1,
    parseInt(minutes[2].textContent) - 1,
    parseInt(minutes[3].textContent) - 1,
]

let baseCount = 60;
let count1 = parseInt(minutes[0].textContent) - 1;
let count2 = parseInt(minutes[1].textContent) - 1;
let count3 = parseInt(minutes[2].textContent) - 1;
let count4 = parseInt(minutes[3].textContent) - 1;

const reset1 = () => {
count1 = baseTimes[0];
}

const reset2 = () => {
    count2 = baseTimes[1];
}

const reset3 = () => {
    count3 = baseTimes[2];
}

const reset4 = () => {
    count4 = baseTimes[3];
}

let countdownFunc = () => {
    if (baseCount <= 0) {
        baseCount = 60;
        count1--;
        count2--;
        count3--;
        count4--;
    } else if (baseCount < 10) {
    minutes[0].textContent = `${count1} : 0${baseCount}`;
    minutes[1].textContent = `${count2} : 0${baseCount}`;
    minutes[2].textContent = `${count3} : 0${baseCount}`;
    minutes[3].textContent = `${count4} : 0${baseCount}`;
    } else if (baseCount>=10) {
            
    minutes[0].textContent = `${count1} : ${baseCount}`;
    minutes[1].textContent = `${count2} : ${baseCount}`;
    minutes[2].textContent = `${count3} : ${baseCount}`;
    minutes[3].textContent = `${count4} : ${baseCount}`;
    }
        
    baseCount--;

    if (count1 < 0) {
        minutes[0].textContent = `Arrived`;
        setTimeout(reset1, 30000);
    }
    if (count2 < 0) {
        minutes[1].textContent = `Arrived`;
        setTimeout(reset2, 30000);
    }
    if (count3 < 0) { 
        minutes[2].textContent = `Arrived`;
        setTimeout(reset3, 30000);
    }
    if (count4 < 0) { 
        minutes[3].textContent = `Arrived`;
        setTimeout(reset4, 30000);
    }

}

setInterval(countdownFunc, 1000); 

const updateData = async () => {
    let response = await fetch(baseURL);
    let data = await response.json();
    let celsius = await data.current.temp_c;
    let weather = await data.current.condition.text;
    let weatherIcon = await "https:" + data.current.condition.icon;
    weatherLogo.src = `${weatherIcon}`;
    list.textContent= `${celsius}C`;
    weatherText.textContent = `${weather}`;
}

window.onload =() =>{
    updateData()
 }

toggleBtn.addEventListener("click", () => {
     if (isClicked) {
        navbar.style.left = "-200px";
        navbar.style.animation = "toggleMenu2 0.5s ease-out";
        navBg.style.opacity = "0";
        navBg.style.animation = "";
        toggleBtn.style.transform = "rotate(0deg)";
        toggleBtn.style.color = "white";
        isClicked = false;
  } else {
        navbar.style.left = "0px";
        navbar.style.animation = "toggleMenu1 0.5s ease-in";
        navBg.style.opacity = "0.5";
        navBg.style.animation = "bgColor 1s ease-in";
        toggleBtn.style.transform = "rotate(45deg)";
        toggleBtn.style.color = "gold";
        isClicked = true;
  }
})

