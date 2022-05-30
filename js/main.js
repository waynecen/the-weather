/* Imports */
import { addZero, nearestTenth, toFahrenheit, toCelsius } from "./helper.js";

/* Global */
const months = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
];

const days = [
	"Sunday",
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday",
];

// Date
function getTime() {
	const currentDate = new Date();
	let dayName = days[currentDate.getDay()];
	let day = currentDate.getDate();
	let month = months[currentDate.getMonth()];
	let year = currentDate.getFullYear().toString().substring(2, 4);
	let hour = currentDate.getHours();
	let minutes = addZero(currentDate.getMinutes());

	const date = document.querySelector("#date");
	date.innerText = `${hour}:${minutes} | ${dayName}, ${month} ${day} '${year}`;
}
getTime();
setInterval(getTime, 1000);

// Enter search function
document
	.querySelector(".search-bar")
	.addEventListener("keyup", function (event) {
		if (event.key == "Enter" || event.keyCode === 13) {
			getWeather(`${document.querySelector(".search-bar").value}`);
		}
	});

// Fetch data from OpenWeather API
async function getWeather(city) {
	const response = await fetch(
		`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=fd6e9060ca22fc3927fa2ef4564a17d5&units=metric`,
		{ mode: "cors" }
	);
	const weatherData = await response.json();

	const location = document.querySelector("#location");
	const temperature = document.querySelector("#temperature");
	const icon = document.querySelector(".icon");
	const description = document.querySelector("#description");
	const humidity = document.querySelector("#humidity");
	const tempMin = document.querySelector("#tempMin");
	const tempMax = document.querySelector("#tempMax");
	const feelsLike = document.querySelector("#feelsLike");
	const wind = document.querySelector("#wind");

	temperature.innerText = Math.round(weatherData.main.temp * 2) / 2 + "°C";
	location.innerText = weatherData.name;
	description.innerText = weatherData.weather[0].description;
	icon.src = `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;
	icon.alt = `icon of ${weatherData.weather[0].description}`;
	tempMax.innerText = `${nearestTenth(weatherData.main.temp_max)}°`;
	tempMin.innerText = `${nearestTenth(weatherData.main.temp_min)}°`;
	humidity.innerText = `${weatherData.main.humidity}%`;
	feelsLike.innerText = `${nearestTenth(weatherData.main.feels_like)}°`;
	wind.innerText = `${nearestTenth(weatherData.wind.speed)}m/s`;
	visibility.innerText = `${nearestTenth(weatherData.visibility / 1000)}km`;
}
getWeather("Toronto");
