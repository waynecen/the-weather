// Helper functions
export function addZero(i) {
	return i < 10 ? (i = "0" + i) : i;
}

export function nearestTenth(i) {
	return Math.round(i * 10) / 10;
}

export function toFahrenheit(celsius) {
	return (fahrenheit = (celsius * 9) / 5 + 32);
}

export function toCelsius(fahrenheit) {
	return (celsius = ((fahrenheit - 32) * 5) / 9);
}
