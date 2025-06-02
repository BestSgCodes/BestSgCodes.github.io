const baseURL = `https://api.weatherapi.com/v1/current.json?key=5c2792f72c8e4988ab2155424251704&q=28.7041, 77.1025&aqi=no`;
let list = document.querySelector(".weather-list");
let weatherText = document.querySelector(".current-weather-text");
let weatherLogo = document.querySelector(".current-weather-logo4");
let minutes = document.querySelectorAll(".timing1");
let baseCount = 60;
let count1 = parseInt(minutes[0].textContent) - 1;
let count2 = parseInt(minutes[1].textContent) - 1;
let count3 = parseInt(minutes[2].textContent) - 1;
let count4 = parseInt(minutes[3].textContent) - 1;

let countdownFunc = () => {
    if (baseCount <= 0) {
        baseCount = 60;
        count1--
        count2--
        count3--
        count4--
    }
        
    baseCount--

    
    minutes[0].textContent = `${count1} : ${baseCount}`
    minutes[1].textContent = `${count2} : ${baseCount}`
    minutes[2].textContent = `${count3} : ${baseCount}`
    minutes[3].textContent = `${count4} : ${baseCount}`

    if (count1 < 0) {
    minutes[0].textContent = `Arrived` ; 
    } else if (count2 < 0) {
    minutes[1].textContent = `Arrived`
    } if (count3 < 0) {
    minutes[2].textContent = `Arrived` ;  
    } else if (count4 < 0) {
    minutes[3].textContent = `Arrived`
    }
}

setInterval(countdownFunc, 1000); 

const updateData = async () => {
    let data = await fetch(baseURL);
    let response = await data.json();
    console.log(response)
    let celsius = await response.current.temp_c;
    let weather = await response.current.condition.text;
    let weatherIcon = await response.current.condition.icon;
    
    weatherLogo.src = `${weatherIcon}`
    list.textContent= `${celsius}C`
    weatherText.textContent = `${weather}`
}

window.onload = updateData();