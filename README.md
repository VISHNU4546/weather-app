# Weather App

A simple weather application that displays real-time weather data for any city in the world using the OpenWeather API. This app is built entirely on the frontend using HTML, CSS, and JavaScript.

## Live Demo

You can view the live app here: [Weather App](https://weather-app-akki.netlify.app/)

## Features

- **Search by City**: Enter the name of any city to get the current weather details.
- **Weather Details**: Displays temperature, humidity, wind speed, and weather conditions (like clear, cloudy, rain, etc.).
- **Responsive Design**: Works on both desktop and mobile devices.
- **Dynamic Background**: The background changes dynamically based on the weather conditions (e.g., sunny, cloudy, rainy, etc.).

## How to Use

1. Open the [live demo link](https://weather-app-akki.netlify.app/).
2. Enter the name of the city in the search bar.
3. Click the "Search" button or press `Enter`.
4. The app will fetch and display the weather information for the specified city.

## Technology Stack

- **HTML**: For structuring the webpage.
- **CSS**: For styling the webpage.
- **JavaScript**: For making API calls and dynamically updating the weather data.
- **OpenWeather API**: To fetch real-time weather data.

## How It Works

1. The app uses the **OpenWeather API** to get weather data. When a user searches for a city, the app makes an API request using JavaScript `fetch` to retrieve the weather information.
2. The weather details such as temperature, humidity, wind speed, and a description of the current weather conditions are displayed on the page.
3. The app updates the background image based on the weather conditions (e.g., a sunny background for clear weather, a rainy background for rain, etc.).

### API Reference

- The app uses the **OpenWeather API**.
- You can find the OpenWeather API documentation here: [OpenWeather API Docs](https://openweathermap.org/api).
  
To use the API:
- Register for a free API key on the [OpenWeather website](https://home.openweathermap.org/users/sign_up).
- In the app code, replace the placeholder `API_KEY` with your actual API key.

Example API request:
```js
fetch(`https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API_KEY}&units=metric`)
