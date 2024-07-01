# Breeze Buddy

## General info

Welcome to Breeze Buddy! My app provides quick and easy access to current weather information.
Breeze Buddy automatically detects your location to deliver accurate weather forecasts, but you can also enter the name of any place to see the weather conditions there.

The application has been deployed on Netlify - [https://breezebuddy.netlify.app/](https://breezebuddy.netlify.app/)

## Features:
1. **Automatic Location Detection:** Upon launching the Breeze Buddy app, it automatically detects your location and displays weather information based on it.
2. **Location Search:** Enter the name of a place in the search field to get weather data for the selected location.
3. **Main Screen:**
   - **Location:** Current location.
   - **Local Time:** Current time in the selected location.
   - **Weather Icon:** Graphical representation of the current weather conditions.
   - **Temperature:** Current temperature in the selected location.
   - **Weather Conditions:** Description of weather conditions (e.g., sunny, cloudy).
   - **Temperature range:** Today's minimum and maximum temperature.
4. **Weather Forecast:** Forecast for the next few days displayed below the main information.
5. **Additional Weather Data:**
   - **Wind:** Current wind speed and direction.
   - **Pressure:** Current atmospheric pressure.
   - **Humidity:** Current air humidity.

## Technologies:

- Vue
- WeatherAPI.com
- FontAwesome
- Blender
- Photoshop

## Setup

```
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run all tests
npm test
```

Powered by <a href="https://www.weatherapi.com/" title="Free Weather API">WeatherAPI.com</a>
