const apiKey = '64f2ee2a8261daa4d9f780f5b365f275'; // Replace with your OpenWeatherMap API key
const searchBtn = document.getElementById('search-btn');
const cityInput = document.getElementById('city-input');
const searchHistory = document.getElementById('search-history');
const currentWeather = document.getElementById('current-weather');
const forecast = document.getElementById('forecast');

searchBtn.addEventListener('click', () => {
    const city = cityInput.value;
    if (city) {
        getWeather(city);
    }
});

function getWeather(city) {
    // Current weather
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => {
            displayCurrentWeather(data);
            addToSearchHistory(city);
        })
        .catch(error => console.error('Error:', error));

    // 5-day forecast
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => displayForecast(data))
        .catch(error => console.error('Error:', error));
}

function displayCurrentWeather(data) {
    currentWeather.innerHTML = `
        <h2 class="title is-4">${data.name} (${new Date().toLocaleDateString()})</h2>
        <p>Temperature: ${data.main.temp}°C</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Wind Speed: ${data.wind.speed} m/s</p>
    `;
}

function displayForecast(data) {
    forecast.innerHTML = '<h3 class="title is-5">5-Day Forecast:</h3>';
    for (let i = 0; i < data.list.length; i += 8) {
        const day = data.list[i];
        forecast.innerHTML += `
            <div class="forecast-item">
                <p>${new Date(day.dt * 1000).toLocaleDateString()}</p>
                <p>Temp: ${day.main.temp}°C</p>
                <p>Humidity: ${day.main.humidity}%</p>
            </div>
        `;
    }
}

function addToSearchHistory(city) {
    const button = document.createElement('button');
    button.textContent = city;
    button.classList.add('button', 'is-fullwidth', 'mb-2');
    button.addEventListener('click', () => getWeather(city));
    searchHistory.prepend(button);
}