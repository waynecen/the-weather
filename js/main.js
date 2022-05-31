/* Imports */
import {
	addZero,
	nearestTenth,
	toFahrenheit,
	toCelsius,
	filterInput,
} from "./helper.js";

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

const defaultCity = "Toronto";

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
setInterval(getTime, 4000);

// Enter search function
document
	.querySelector(".search-bar")
	.addEventListener("keyup", async function (event) {
		if (event.key == "Enter" || event.keyCode === 13) {
			const searchInput = document.querySelector(".search-bar").value;
			let coords = await getWeather(filterInput(searchInput));
			getForecast(coords.lat, coords.lon);
		}
	});

// Fetch coordinates from city
async function getWeather(city) {
	const response = await fetch(
		`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=fd6e9060ca22fc3927fa2ef4564a17d5&units=metric`,
		{ mode: "cors" }
	);

	const weatherData = await response.json();
	const location = document.querySelector("#location");
	location.innerText = weatherData.name;
	return weatherData.coord;
}
getWeather(defaultCity);

// Fetch data for forecast
async function getForecast(lat, lon) {
	const response = await fetch(
		`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=alerts,minutely&appid=fd6e9060ca22fc3927fa2ef4564a17d5&units=metric`,
		{ mode: "cors" }
	);

	const data = await response.json();
	console.log(data);
	const temperature = document.querySelector("#temperature");
	const icon = document.querySelector(".icon");
	const description = document.querySelector("#description");
	const humidity = document.querySelector("#humidity");
	const tempMin = document.querySelector("#tempMin");
	const tempMax = document.querySelector("#tempMax");
	const feelsLike = document.querySelector("#feelsLike");
	const wind = document.querySelector("#wind");

	temperature.innerText = Math.round(data.current.temp * 2) / 2 + "°C";
	description.innerText = data.current.weather[0].description;
	icon.src = `http://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png`;
	icon.alt = `icon of ${data.current.weather[0].description}`;
	tempMax.innerText = `${nearestTenth(data.daily[0].temp.max)}°`;
	tempMin.innerText = `${nearestTenth(data.daily[0].temp.min)}°`;
	humidity.innerText = `${data.current.humidity}%`;
	precipitation.innerText = `${data.daily[0].pop * 100}%`;
	feelsLike.innerText = `${nearestTenth(data.current.feels_like)}°`;
	wind.innerText = `${nearestTenth(data.current.wind_speed)}m/s`;
	visibility.innerText = `${nearestTenth(data.current.visibility / 1000)}km`;
	const dailyData = data;
	return dailyData;
}
getForecast(43.7001, -79.4163);
