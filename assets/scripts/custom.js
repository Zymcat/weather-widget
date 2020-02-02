"use strict";


// average function
function average(array) {
    let sum = 0;
    for (let i=0; i<array.length; i++){      
        sum = sum + array[i];
    }
    let average = sum / array.length;
    return average
}

let weekDays = ["Sunday", "Monday","Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

// set time now 
function dateNow(){
    setTimeout(dateNow, 1000);
    document.querySelector("#dateForeCasted p").innerHTML = Date().split(" ").slice(1, 5).join(" ");
};
dateNow();

// default city
let city = "Florence"

let weatherKey = keys.weatherKey;

// get weather
async function getWeather() {
    let api_url = "http://api.openweathermap.org/data/2.5/forecast?q="+city+"&units=metric&appid=3a41ba0972142b44abd54a8ab2b2ec7d";
    let response = await fetch(api_url);
    let data = await response.json();
    let cityName = data.city.name; 
    //now
    let dateNow = new Date();
    let dayNow = dateNow.getDay();
    let nowTemp = data.list[0].main.temp;
    let nowDescription = data.list[0].weather[0].description;
    let nowIcon = data.list[0].weather[0].icon;
    document.querySelector("#cityName h1").innerHTML = cityName;
    document.querySelector("#weekDayNow p").innerHTML = weekDays[dayNow];
    document.querySelector("#nowTemp h1").innerHTML = nowTemp.toFixed(1) + '&#8451';
    document.querySelector("#nowDescription").innerHTML = nowDescription;
    document.querySelector("#nowIcon").src = "http://openweathermap.org/img/wn/"+nowIcon+"@2x.png";

    console.log(dayNow);

    let dayTemp = [];
    let nightTemp = [];
    let weekDaysArray = [];
    let dayIcon = [];
    let nightIcon = [];


    for ( let i=0; i<data.list.length; i++) {
        let dat = data.list[i].dt_txt;
        let date = new Date(dat);
        let hours = date.getHours();
        let day = date.getDay();
        let dayWeekDay = weekDays[day];

        if ( hours < 21 && hours > 7) {
         
            dayTemp.push(data.list[i].main.temp);
        } else {
            nightTemp.push(data.list[i].main.temp);
        }
    
        if (hours == 12) {
            weekDaysArray.push(dayWeekDay);
            dayIcon.push(data.list[i].weather[0].icon)
        } else if (hours == 3) {
            nightIcon.push(data.list[i].weather[0].icon)
        }
    }

    let dayTempArray = [];
    let dayTempAvgArray = [];
    let nightTempArray = [];
    let nightTempAvgArray = [];

    // push info to HTML
    for( let i =0; i<5; i++){
        dayTempArray[i] = dayTemp.slice(i * 4, i * 4 + 4);
        dayTempAvgArray[i] = (average(dayTempArray[i])).toFixed(1);
        nightTempArray[i] = nightTemp.slice(i * 4, i * 4 + 4);
        nightTempAvgArray[i] = (average(nightTempArray[i])).toFixed(1);
        document.querySelector("#day"+i+" p").innerHTML = weekDaysArray[i];
        document.querySelector("#day"+i+"_icon img").src = "http://openweathermap.org/img/wn/"+dayIcon[i]+".png";
        document.querySelector("#day"+i+"_night-icon img").src = "http://openweathermap.org/img/wn/"+nightIcon[i]+".png";
        document.querySelector("#day"+i+"_day p").innerHTML = dayTempAvgArray[i] + '&#8451';
        document.querySelector("#day"+i+"_night p").innerHTML =  nightTempAvgArray[i] + '&#8451';
    }
};

getWeather()
.then(response => {
    console.log('getWeather response ok')
})
.catch(error => {
    console.log('error');
    console.error(error);
});

function getInputValue(){
    var inputVal = document.getElementById("myInput").value;
    city = inputVal;

    getWeather()
    .then(response => {
        console.log('veikia')
    })
    .catch(error => {
        console.log('error');
        console.error(error);
    });
    
}

let classes = document.querySelector(".main-color").classList;
    document.querySelector(".color-button .red").addEventListener("click", function(){
         classes.remove(classes.item(1));
         document.querySelector(".main-color").classList.add("darkRed")
    })
    document.querySelector(".color-button .blue").addEventListener("click", function(){
        classes.remove(classes.item(1));
        document.querySelector(".main-color").classList.add("darkBlue")      
    })
    document.querySelector(".color-button .white").addEventListener("click", function(){
        classes.remove(classes.item(1));     
    })





