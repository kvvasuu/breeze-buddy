<template>
  <div class="weather-display" :class="{ 'scale-down': showSettings }">
    <Transition name="slide-horizontal-fade" mode="out-in">
      <div class="location" :key="currentWeather.location.name">
        {{ currentWeather.location.name }}
      </div>
    </Transition>
    <div class="icon-container">
      <Transition name="slide-horizontal-fade" mode="out-in">
        <img
          class="icon"
          :src="iconSrc"
          draggable="false"
          :key="this.currentWeather.current.condition.code"
        />
      </Transition>
    </div>

    <Transition name="slide-horizontal-fade" mode="out-in">
      <div class="temperature" :key="passTemperature">
        {{ passTemperature }}
      </div>
    </Transition>
    <Transition name="slide-horizontal-fade" mode="out-in">
      <div class="conditions" :key="currentWeather.current.condition.text">
        {{ currentWeather.current.condition.text }}
      </div>
    </Transition>

    <div class="temp-range">
      <Transition name="slide-horizontal-fade" mode="out-in">
        <div class="temp" :key="passMinTemp">
          {{ t.low }}: {{ passMinTemp }}
        </div>
      </Transition>
      <Transition name="slide-horizontal-fade" mode="out-in">
        <div class="temp" :key="passMaxTemp">
          {{ t.high }}: {{ passMaxTemp }}
        </div>
      </Transition>
    </div>
  </div>
</template>

<script>
export default {
  props: ["currentWeather", "iconSrc"],
  inject: ["showSettings", "t", "tempUnit", "localTime"],
  computed: {
    passTemperature() {
      return this.currentWeather.current[`temp_${this.tempUnit}`] === "-"
        ? this.currentWeather.current[`temp_${this.tempUnit}`]
        : Math.round(this.currentWeather.current[`temp_${this.tempUnit}`]);
    },
    passMinTemp() {
      return this.currentWeather.forecast.forecastday[0].day[
        `mintemp_${this.tempUnit}`
      ] === undefined
        ? "-"
        : Math.round(
            this.currentWeather.forecast.forecastday[0].day[
              `mintemp_${this.tempUnit}`
            ]
          );
    },
    passMaxTemp() {
      return this.currentWeather.forecast.forecastday[0].day[
        `maxtemp_${this.tempUnit}`
      ] === undefined
        ? "-"
        : Math.round(
            this.currentWeather.forecast.forecastday[0].day[
              `maxtemp_${this.tempUnit}`
            ]
          );
    },
  },
};
</script>

<style lang="scss" scoped>
.weather-display {
  width: auto;
  height: auto;
  margin: 1rem;
  user-select: none;
  transition: scale 1s ease;
}

.location {
  font-size: 1.6rem;
  font-family: "Helvetica Bold";
  text-shadow: 0.1rem 0.1rem 0.6rem rgba(0, 0, 0, 0.3);
}

.icon {
  height: 12rem;
  filter: drop-shadow(0.2rem 0.4rem 0.2rem rgba(0, 0, 0, 0.2));
  margin: 1rem;
  filter: brightness(110%);
}

.temperature {
  position: relative;
  font-size: 6rem;
  text-shadow: 0.1rem 0.1rem 0.2rem rgba(0, 0, 0, 0.3);
  &:after {
    position: absolute;
    font-size: 5rem;
    content: "\00B0";
  }
}

.conditions {
  font-size: 1.6rem;
  text-shadow: 0.1rem 0.1rem 0.2rem rgba(0, 0, 0, 0.3);
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

//@media

@media only screen and (max-width: 600px) {
  .scale-down {
    scale: 0.9 !important;
    transform: translate(0, 0);
  }
}
</style>
