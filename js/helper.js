// Helper functions
function addZero(i) {
	return i < 10 ? (i = "0" + i) : i;
}

function nearestTenth(i) {
	return Math.round(i * 10) / 10;
}

function toFahrenheit(celsius) {
	return (fahrenheit = (celsius * 9) / 5 + 32);
}

function toCelsius(fahrenheit) {
	return (celsius = ((fahrenheit - 32) * 5) / 9);
}

function filterInput(location) {
	if (location) {
		let filteredLocation = location.split(" ").join("");
		return filteredLocation;
	}
}

export { addZero, nearestTenth, toFahrenheit, toCelsius, filterInput };
