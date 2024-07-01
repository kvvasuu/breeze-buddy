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

## Languages and Units:
Breeze Buddy is available in three languages: English, Polish, and German. 
You can select your preferred language during the first launch of the app or later in the settings section.

**Changing the Language:**
1. **Welcome Screen:** Choose your language during the first launch of the app.
2. **Settings:** Go to the settings section to change the language at any time.

**Changing Units:**
In the settings section, you can also adjust the units of the displayed weather parameters (e.g., Celsius to Fahrenheit, wind speed from km/h to mph, etc.).

## Using the App:
1. **Launching the App:** 
Upon launching the Breeze Buddy, it automatically detects your location and displays current weather data.
When you first start it, the browser should ask whether to allow geolocation.
If geolocation is not supported or is not allowed, this feature is unavailable.

2. **Location Search:** 
To check the weather in another location, enter the name of the location in the search field.

3. **Main Screen:** 
Browse current weather conditions, the forecast for the next few days, and additional weather data.

4. **Settings:** 
Go to the settings section to change the app language or the units of the displayed weather parameters.
---
If you have any questions or issues with the Breeze Buddy app, please contact.

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
