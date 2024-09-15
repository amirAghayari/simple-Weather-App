`use strict`;

const input = document.querySelector(".city-inp");
const search = document.querySelector(".search");
const result = document.querySelector(".data");

const getWeather = () => {
  let inpValue = input.value;
  if (inpValue.length == 0) {
    result.innerHTML = `<h2> please enter a city name </h2>`;
  } else {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${inpValue}&appid=${key}&units=metrics`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        let dateSunRise = new Date(data.sys.sunrise * 1000);
        let dateSunSet = new Date(data.sys.sunset * 1000);
        const riseHourse = dateSunRise.getHours().toString().padStart(2, "0");
        const riseMinutes = dateSunRise
          .getMinutes()
          .toString()
          .padStart(2, "0");
        const setHours = dateSunSet.getHours().toString().padStart(2, "0");
        const setMinutes = dateSunSet.getMinutes().toString().padStart(2, "0");
        console.log(data);
        result.innerHTML = `<div class="main-div"><h2 class="data-name">${
          data.name
        }</h2>
        <h3 class="weather">${data.weather[0].description} </h3></div>
        
        
        <div class="weather-temp">
        <h2 class="main-temp"> temp : ${(+data.main.temp - 273).toFixed(
          2
        )}&#175; </h2>
        <div class="min-max">
        <h4> Max: ${(+data.main.temp_max - 273).toFixed(2)}</h4>
        <h4> Min: ${(+data.main.temp_min - 273).toFixed(2)}</h4>
        </div></div>
        <div class="wind-sun">
        <h4 class="wind-speed">wind speed : ${data.wind.speed}</h4>
        <h3 class="sun">Sunrise : ${riseHourse}:${riseMinutes}</h3>
        <h3 class="sun">Sunset : ${setHours}:${setMinutes}</h3>
        </div>`;
      })
      .catch(
        () => (result.innerHTML = `<h3 class="error"> city not found </h3>`)
      );
  }
};

window.addEventListener("load", getWeather);
search.addEventListener("click", getWeather);

// <img src="https://openweathermap.org/img/w/${data.weather[0].icon}.png>"
