

function generateRandomWeather() {
    var temperature = Math.floor(Math.random() * (90 - 60 + 1)) + 60;
    var humidity = Math.floor(Math.random() * (70 - 30 + 1)) + 30;
    var conditions = ["Sunny", "Cloudy", "Rainy", "Stormy"];
    var weatherCondition = conditions[Math.floor(Math.random() * conditions.length)];

    return {
        temperature: temperature,
        humidity: humidity,
        condition: weatherCondition,
    };
}


function getWeatherReport() {
    var start_date = new Date();
    var num_days = 7;
    var table = document.querySelector("table");

    for (var i = 0; i < num_days; i++) {
        var current_date = new Date(start_date.getTime() + i * 24 * 60 * 60 * 1000);
        var weatherData = generateRandomWeather();

        var row = table.insertRow(-1);
        var dateCell = row.insertCell(0);
        var temperatureCell = row.insertCell(1);
        var humidityCell = row.insertCell(2);
        var conditionCell = row.insertCell(3);

        dateCell.innerHTML = current_date.toISOString().split('T')[0];
        temperatureCell.innerHTML = weatherData.temperature + "°F";
        humidityCell.innerHTML = weatherData.humidity + "%";
        conditionCell.innerHTML = weatherData.condition;
    }
}


getWeatherReport();
