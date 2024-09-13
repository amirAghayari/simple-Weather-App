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
        result.innerHTML = `<div><h2>${data.name}</h2>
        <h3 class="weather">${data.weather[0].description} </h3></div>
        <img src="https://openweathermap.org/img/w/${data.weather[0].icon}.png>"



        <h2> temp : ${data.main.temp}&#175; </h2>
        <div>
        <h4>${data.main.temp_max}</h4>
        <h4>${data.main.temp_min}</h4>
        </div>
        <h4>wind speed : ${data.wind.speed}</h4>
        <h3>Sunrise : ${riseHourse}:${riseMinutes}</h3>
        <h3>Sunset : ${setHours}:${setMinutes}</h3>
        `;
      })
      .catch(() => (result.innerHTML = `<h3> city not found </h3>`));
  }
};

window.addEventListener("load", getWeather);
search.addEventListener("click", getWeather);
