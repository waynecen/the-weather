# <div align="center"><center>[the.weather](https://the-weather-six.vercel.app/)</div>

Weather app utilizing OpenWeather's public API to give current weather data and weekly forecasts for any searched location.
  
## :star2: Features
- Search weather by specifying the city, city & state, or city & country
- Display current weather, time, and weekly forecast
- Provides additional details (humidity, chance of rain, visibility)
  
## 🏃 Motivation & Challenges
I created this project to learn how to fetch and display data from an API. This project taught me how to utilize async/await functions and helped improve my problem solving skills. I was able to utilize methods in JavaScript to help display the data more efficiently.

#### Writing helper functions for reusability and readability:
```
function addZero(i) {
  return i < 10 ? (i = "0" + i) : i;
}

function nearestTenth(i) {
  return Math.round(i * 10) / 10;
}
```
#### Creating a day rotation to supply the correct day name for the weekly forecast based on current date:
```
  let dayRotation = 
    days[
      currentDate.getDay() + (i + 1) > 6
        ? 0 + i - currentDate.getDay()
        : currentDate.getDay() + (i + 1)
    ];
  dayNameEl.innerText = dayRotation;
```
---

## :construction: Under construction
- [ ] Error handling on locations that don't exist
- [ ] Toggle between metric/imperial system
- [ ] Hourly forecast
- [ ] Mobile-friendly
- [ ] Change background image based on weather

Preview
---
![screenshot of weather app](https://github.com/waynecen/the-weather/blob/main/preview_the-weather.png)
