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

// Default weather location
const defaultCity = "Toronto";

// Current weather selectors
const temperature = document.querySelector("#temperature");
const location = document.querySelector("#location");
const icon = document.querySelector(".icon");
const description = document.querySelector("#description");
const humidity = document.querySelector("#humidity");
const tempMin = document.querySelector("#tempMin");
const tempMax = document.querySelector("#tempMax");
const feelsLike = document.querySelector("#feelsLike");
const wind = document.querySelector("#wind");

// Date & time
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
			// Clear search after enter
			document.querySelector(".search-bar").value = "";
		}
	});

// Fetch coordinates from city
async function getWeather(city) {
	try {
		const response = await fetch(
			`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=fd6e9060ca22fc3927fa2ef4564a17d5&units=metric`,
			{ mode: "cors" }
		);

		const weatherData = await response.json();
		location.innerText = weatherData.name;
		return weatherData.coord;
	} catch (err) {
		console.log("error");
	}
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

	// Current forecast
	temperature.innerText = Math.round(data.current.temp * 2) / 2 + "°C";
	description.innerText = data.current.weather[0].description;
	icon.src = `http://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png`;
	icon.alt = `icon of ${data.current.weather[0].description}`;
	tempMax.innerText = `H: ${nearestTenth(data.daily[0].temp.max)}°`;
	tempMin.innerText = `L: ${nearestTenth(data.daily[0].temp.min)}°`;
	humidity.innerText = `${data.current.humidity}%`;
	precipitation.innerText = `${data.daily[0].pop * 100}%`;
	feelsLike.innerText = `${nearestTenth(data.current.feels_like)}°`;
	wind.innerText = `${nearestTenth(data.current.wind_speed)}m/s`;
	visibility.innerText = `${nearestTenth(data.current.visibility / 1000)}km`;

	// 8-day forecast
	const dayCard = document.querySelectorAll(".dayCard");
	dayCard.forEach((element, i) => {
		const currentDate = new Date();

		// Create HTML elements for first-time data
		if (element.childElementCount == 0) {
			const dayNameEl = document.createElement("h3");
			const imgEl = document.createElement("img");
			const descEl = document.createElement("div");
			const wrapperEl = document.createElement("div");
			const tempWrapperEl = document.createElement("div");
			const tempMaxEl = document.createElement("div");
			const tempMinEl = document.createElement("div");

			// Add Classes
			dayNameEl.classList.add("card-header");
			imgEl.classList.add("icons");
			descEl.classList.add("desc");
			wrapperEl.classList.add("flex-row");
			tempWrapperEl.classList.add("temp-wrapper");
			tempMaxEl.classList.add("tempMax");
			tempMinEl.classList.add("tempMin");

			// Add classes to update queries
			imgEl.classList.add("update-icons");
			descEl.classList.add("update-desc");
			tempMaxEl.classList.add("update-tempMax");
			tempMinEl.classList.add("update-tempMin");

			// Fill in data
			let dayRotation =
				days[
					currentDate.getDay() + (i + 1) > 6
						? 0 + i - currentDate.getDay()
						: currentDate.getDay() + (i + 1)
				];
			dayNameEl.innerText = dayRotation;
			imgEl.src = `http://openweathermap.org/img/wn/${
				data.daily[i + 1].weather[0].icon
			}@2x.png`;
			descEl.innerText = data.daily[i + 1].weather[0].description;
			tempMaxEl.innerText = `H: ${Math.round(
				data.daily[i + 1].temp.max
			)}°`;
			tempMinEl.innerText = `L: ${Math.round(
				data.daily[i + 1].temp.min
			)}°`;

			element.append(dayNameEl);
			element.append(wrapperEl);
			element.append(tempWrapperEl);
			wrapperEl.append(imgEl);
			wrapperEl.append(descEl);
			tempWrapperEl.append(tempMaxEl);
			tempWrapperEl.append(tempMinEl);
		}
	});

	// Update 8-day forecast data
	const updateIcons = document.querySelectorAll(".update-icons");
	const updateDesc = document.querySelectorAll(".update-desc");
	const updateTempMax = document.querySelectorAll(".update-tempMax");
	const updateTempMin = document.querySelectorAll(".update-tempMin");

	updateIcons.forEach((element, i) => {
		element.src = `http://openweathermap.org/img/wn/${
			data.daily[i + 1].weather[0].icon
		}@2x.png`;
	});
	updateDesc.forEach((element, i) => {
		element.innerText = data.daily[i + 1].weather[0].description;
	});
}
getForecast(43.7001, -79.4163);
