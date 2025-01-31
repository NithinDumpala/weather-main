



document.addEventListener('DOMContentLoaded', function () {
    const fetchData = async (city) => {
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'e509ac7b4bmshc512aba8fe7baa0p168645jsn95920a403e77',
                'X-RapidAPI-Host': 'weather-by-api-ninjas.p.rapidapi.com'
            }
        };

        try {
            const response = await fetch(`https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=${city}`, options);

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const responseData = await response.json();
            console.log(responseData);

            const cityName = city; 

            document.getElementById('cityentered').innerHTML = cityName;

      
            displayCurrentWeather(responseData);

           
            if (responseData.forecast && responseData.forecast.length >= 7) {
                const sevenDayForecast = responseData.forecast.slice(0, 7);
                displaySevenDayForecast(sevenDayForecast);
            } else {
                console.warn('7-day forecast data not available.');
            }
        } catch (error) {
            console.error(error);
        }
    };

    const displayCurrentWeather = (data) => {
        const {
            cloud_pct,
            temp,
            feels_like,
            humidity,
            min_temp,
            max_temp,
            wind_speed,
            wind_degrees,
            sunset,
            sunrise
        } = data;

        document.getElementById('temp').innerHTML = `${temp}`;
        document.getElementById('cloud_pct').innerHTML = `${cloud_pct}`;
        document.getElementById('feels_like').innerHTML = `${feels_like}`;
        document.getElementById('humidity').innerHTML = `${humidity}`;
        document.getElementById('min_temp').innerHTML = `${min_temp}`;
        document.getElementById('max_temp').innerHTML = `${max_temp}`;
        document.getElementById('wind_speed').innerHTML = `${wind_speed}`;
        document.getElementById('wind_degrees').innerHTML = `${wind_degrees}`;
        document.getElementById('sunset').innerHTML = `${sunset}`;
        document.getElementById('sunrise').innerHTML = `${sunrise}`;
    };

    const displaySevenDayForecast = (forecastData) => {
       
        for (let i = 0; i < forecastData.length; i++) {
            const forecast = forecastData[i];
            const dayElement = document.getElementById(`day${i + 1}`);

            if (dayElement) {
                dayElement.innerHTML = `Day ${i + 1}: ${forecast.temp}°C, ${forecast.humidity}`;
            }
        }
    }; 
    const setDefaultLocation = () => {
   
        fetchData('DELHI');
    };

    const getLocationAndFetchWeather = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                   
                    try {
                        const reverseGeocodeResponse = await fetch(
                            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude},${position.coords.longitude}&key=YOUR_GOOGLE_MAPS_API_KEY`
                        );
                        const reverseGeocodeData = await reverseGeocodeResponse.json();

                        const city = reverseGeocodeData.results[0].address_components.find(
                            (component) => component.types.includes('locality')
                        );

                        document.getElementById('cityentered').innerHTML = city ? city.short_name : 'Unknown';
                        fetchData(city ? city.short_name : 'delhi'); 
                    } catch (reverseGeocodeError) {
                        console.error(reverseGeocodeError);
                       
                        setDefaultLocation();
                    }
                },
                (error) => {
                    console.error(error);
                    
                    setDefaultLocation();
                }
            );
        } else {
     
            setDefaultLocation();
        }
    };

    getLocationAndFetchWeather();


    const searchButton = document.getElementById('searchButton');

    searchButton.addEventListener('click', async (e) => {
        e.preventDefault();
        const locationInput = document.getElementById('locationInput');
        const userEnteredCity = locationInput.value;
        fetchData(userEnteredCity);
    });
});
