<template>
  <div class="weather-display">
    <div class="location">{{ currentWeather.location.name }}</div>
    <div class="icon-container">
      <img
        class="icon"
        src="../../assets/favicon.png"
        alt="Breeze Buddy"
        draggable="false"
      />
    </div>
    <div class="temperature">{{ passTemperature }}</div>
    <div class="conditions">{{ currentWeather.current.condition.text }}</div>
    <div class="temp-range">
      <div class="temp">L: {{ passMinTemp }}</div>
      <div class="temp">H: {{ passMaxTemp }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["currentWeather"],
  computed: {
    passTemperature() {
      return this.currentWeather.current.temp_c === "-"
        ? this.currentWeather.current.temp_c
        : Math.round(this.currentWeather.current.temp_c);
    },
    passMinTemp() {
      return Math.round(
        this.currentWeather.forecast.forecastday[0].day.mintemp_c
      );
    },
    passMaxTemp() {
      return Math.round(
        this.currentWeather.forecast.forecastday[0].day.maxtemp_c
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.weather-display {
  width: auto;
  height: auto;
  margin: 2rem 1rem 1rem 1rem;
  user-select: none;
}

.location {
  font-size: 1.6rem;
  font-family: "Helvetica Bold";
  text-shadow: 0.1rem 0.1rem 0.6rem rgba(0, 0, 0, 0.3);
}

.icon {
  height: 10rem;
  filter: drop-shadow(0.2rem 1rem 1rem rgba(0, 0, 0, 0.5));
  margin: 2rem;
}

.temperature {
  position: relative;
  font-size: 6rem;
  text-shadow: 0.1rem 0.1rem 0.3rem rgba(0, 0, 0, 0.3);
  &:after {
    position: absolute;
    font-size: 5rem;
    content: "\00B0";
  }
}

.conditions {
  font-size: 1.6rem;
  text-shadow: 0.1rem 0.1rem 0.3rem rgba(0, 0, 0, 0.3);
  color: rgba(255, 255, 255, 0.7);
}

.temp-range {
  position: relative;
  text-shadow: 0.1rem 0.1rem 0.2rem rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
}
.temp {
  font-size: 1.1rem;
  margin: 0.6rem 1rem 0 1rem;
  &:after {
    position: absolute;
    content: "\00B0";
  }
}
</style>
