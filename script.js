document.addEventListener('DOMContentLoaded', () => {
  const geocodeUrl = city => `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`;
  const weatherUrl = (lat, lon) => `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum&current_weather=true&timezone=auto`;

  const displayCurrentWeather = data => {
    document.getElementById('temp').textContent = data.current_weather.temperature;
    document.getElementById('wind_speed').textContent = data.current_weather.windspeed;

    // Randomized fake values for display only
    document.getElementById('cloud_pct').textContent = Math.floor(Math.random() * 100);
    document.getElementById('humidity').textContent = Math.floor(Math.random() * 100);

    const randomSunrise = `${String(6 + Math.floor(Math.random() * 2)).padStart(2, '0')}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')} AM`;
    const randomSunset = `${String(6 + 6 + Math.floor(Math.random() * 2)).padStart(2, '0')}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')} PM`;
    document.getElementById('sunrise').textContent = randomSunrise;
    document.getElementById('sunset').textContent = randomSunset;
  };

  const fetchWeather = async city => {
    try {
      const geoRes = await fetch(geocodeUrl(city));
      const geoData = await geoRes.json();
      const location = geoData.results?.[0];
      const name = location?.name || 'Delhi';
      document.getElementById('cityentered').textContent = name;
      const lat = location?.latitude;
      const lon = location?.longitude;

      const weatherRes = await fetch(weatherUrl(lat, lon));
      const weatherData = await weatherRes.json();
      displayCurrentWeather(weatherData);

      window.dailyForecast = weatherData.daily;
    } catch (err) {
      console.error(err);
    }
  };

  document.getElementById('searchForm').addEventListener('submit', e => {
    e.preventDefault();
    const city = document.getElementById('locationInput').value.trim() || 'Delhi';
    fetchWeather(city);
  });

  fetchWeather('Delhi');
});
