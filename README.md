# Breeze Buddy <img src="https://raw.githubusercontent.com/kvvasuu/breeze-buddy/main/src/assets/favicon.png" alt="icon" width="24"/>

![App demo](https://raw.githubusercontent.com/kvvasuu/breeze-buddy/main/demo.gif "App demo")

## :globe_with_meridians: General info

Welcome to Breeze Buddy! My app provides quick and easy access to current weather information.<br>
Breeze Buddy automatically detects your location to deliver accurate weather forecasts, but you can also enter the name of any place to see the weather conditions there.

The application has been deployed on Netlify - [https://breezebuddy.netlify.app/](https://breezebuddy.netlify.app/)

## :eight_pointed_black_star: Features:

1. **Automatic Location Detection:** Upon launching the Breeze Buddy app, it automatically detects your location and displays weather information based on it.

2. **Location Search:** Enter the name of a place in the search field to get weather data for the selected location.

3. **Dark Mode:** Dark mode is set depending on the local time of chosen location. :new_moon:

4. **Main Screen:**

   - :pushpin:**Location:** Current location.
   - :watch:**Local Time:** Current time in the selected location.
   - :partly_sunny:**Weather Icon:** Graphical representation of the current weather conditions.
   - :thermometer:**Temperature:** Current temperature in the selected location.
   - :sunny:**Weather Conditions:** Description of weather conditions (e.g., sunny, cloudy).
   - :thermometer:**Temperature range:** Today's minimum and maximum temperature.

5. **Weather Forecast:**<br>
   Forecast for the next few days displayed below the main information.<br>
   Tap on a day to open a modal with detailed forecast information.

6. **Additional Weather Data:**
   - :wind_face:**Wind:** Current wind speed and direction.
   - :stopwatch:**Pressure:** Current atmospheric pressure.
   - :droplet:**Humidity:** Current air humidity.

## :checkered_flag: Languages and Units:

Breeze Buddy is available in three languages: English ![GB](https://raw.githubusercontent.com/stevenrskelton/flag-icon/master/png/16/country-4x3/gb.png), Polish ![PL](https://raw.githubusercontent.com/stevenrskelton/flag-icon/master/png/16/country-4x3/pl.png), and German ![DE](https://raw.githubusercontent.com/stevenrskelton/flag-icon/master/png/16/country-4x3/de.png).<br>
You can select your preferred language during the first launch of the app or later in the settings section.

**Changing the Language:**

1. **Welcome Screen:** Choose your language during the first launch of the app.
2. **Settings:** Go to the settings section to change the language at any time.

**Changing Units:**
In the settings section, you can also adjust the units of the displayed weather parameters (e.g., Celsius to Fahrenheit, wind speed from km/h to mph, etc.).

## :arrow_forward: Using the App:

1. **Launching the App:**
   Upon launching the Breeze Buddy, it automatically detects your location and displays current weather data.
   When you first start it, the browser should ask whether to allow geolocation.
   If geolocation is not supported or is not allowed, this feature is unavailable.

2. **Location Search:**
   To check the weather in another location, enter the name of the location in the search field, then select location from list.

3. **Main Screen:**
   Browse current weather conditions, the forecast for the next few days, and additional weather data.

4. **Settings:**
   Go to the settings section to change the app language or the units of the displayed weather parameters.

## :grey_question: Info: 

The current version of the application runs on the free version of WeatherAPI, so only 3 days of weather forecast are displayed.<br>
If you want, you can register at [WeatherAPI.com](https://www.weatherapi.com/) and obtain your own key, which you can provide in the application code as a request parameter.

Most of the assets, i.e. background, weather condition icons, compass, gauges, etc., were made by me using <img src="https://cdn3.emoji.gg/emojis/8027-blender.png" width="14px" height="14px" alt=""> Blender, <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Adobe_Photoshop_CC_icon.svg/512px-Adobe_Photoshop_CC_icon.svg.png" width="14px" height="14px" alt=""> Adobe Photoshop and <img src="https://raw.githubusercontent.com/wjramos/flat.icns/inkscape/pngs/inkscape.png" width="14px" height="14px" alt=""> InkScape.<br>
Some of the icons, i.e. buttons, icons before component titles and the location tag come from [FontAwesome](https://fontawesome.com/)

If you have any questions or issues with the Breeze Buddy app, please contact.

## Technologies:

- Vue
- Vuex
- [WeatherAPI](https://www.weatherapi.com/)
- FontAwesome
- Blender
- Photoshop

## Setup

```
# install dependencies
npm install

# serve with hot reload at localhost:5173
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
