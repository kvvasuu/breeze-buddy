<template>
  <div class="weather-display" :class="{ 'scale-down': showModal }">
    <Transition name="slide-horizontal-fade" mode="out-in">
      <div class="location" :key="currentWeather.location.name">
        {{ currentWeather.location.name }}
        <span class="country">{{ passCountry }}</span>
        <Transition name="notification-slide">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
            fill="currentColor"
            class="geolocation-icon"
            v-if="geolocationIcon"
          >
            <path
              d="M429.6 92.1c4.9-11.9 2.1-25.6-7-34.7s-22.8-11.9-34.7-7l-352 144c-14.2 5.8-22.2 20.8-19.3 35.8s16.1 25.8 31.4 25.8H224V432c0 15.3 10.8 28.4 25.8 31.4s30-5.1 35.8-19.3l144-352z"
            />
          </svg>
        </Transition>
        <Clock :time="passLocalTime" :key="passLocalTime"> </Clock>
      </div>
    </Transition>
    <div class="icon-container">
      <Transition name="slide-horizontal-fade" mode="out-in">
        <img
          class="icon"
          :src="passIconSrc"
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
          {{ $store.getters.t.low }}: {{ passMinTemp }}
        </div>
      </Transition>
      <Transition name="slide-horizontal-fade" mode="out-in">
        <div class="temp" :key="passMaxTemp">
          {{ $store.getters.t.high }}: {{ passMaxTemp }}
        </div>
      </Transition>
    </div>
  </div>
</template>

<script>
import Clock from "../Clock.vue";
import codes from "../../codes.json";
import { iconMap } from "../../functions";

export default {
  components: {
    Clock,
  },
  props: ["currentWeather", "geolocationIcon"],
  inject: ["showModal", "localTime"],
  computed: {
    passTemperature() {
      return this.currentWeather.current[
        `temp_${this.$store.state.tempUnit}`
      ] === "-"
        ? this.currentWeather.current[`temp_${this.$store.state.tempUnit}`]
        : Math.round(
            this.currentWeather.current[`temp_${this.$store.state.tempUnit}`]
          );
    },
    passMinTemp() {
      return this.currentWeather.forecast.forecastday[0].day[
        `mintemp_${this.$store.state.tempUnit}`
      ] === ""
        ? "-"
        : Math.min(
            ...this.currentWeather.forecast.forecastday[0].hour.map((el) =>
              Math.round(el[`temp_${this.$store.state.tempUnit}`])
            )
          );
    },
    passMaxTemp() {
      return this.currentWeather.forecast.forecastday[0].day[
        `maxtemp_${this.$store.state.tempUnit}`
      ] === ""
        ? "-"
        : Math.max(
            ...this.currentWeather.forecast.forecastday[0].hour.map((el) =>
              Math.round(el[`temp_${this.$store.state.tempUnit}`])
            )
          );
    },
    passIconSrc() {
      let iconName = iconMap[this.currentWeather.current.condition.code];
      if (!this.$store.state.isDay) {
        iconName++;
      }
      return new URL(`../../assets/icons/${iconName}.webp`, import.meta.url)
        .href;
    },
    passLocalTime() {
      const regex = /\b([01]?[0-9]|2[0-3]):([0-5][0-9])(?::([0-9][0-9]))?\b/gm;
      return this.localTime
        ? this.localTime.match(regex).toString().split(":")
        : false;
    },
    passCountry() {
      if (this.currentWeather.location.country) {
        let code = codes.find(
          (el) =>
            el.name.toLowerCase() ===
            this.currentWeather.location.country.toLowerCase()
        );
        return code ? `(${code.code})` : "";
      } else return "";
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
  transition: scale 0.6s ease;
}

.location {
  font-size: 1.6rem;
  font-family: "Helvetica Bold";
  text-shadow: 0.1rem 0.1rem 0.3rem rgba(0, 0, 0, 0.3);
  .country {
    font-size: 0.7rem;
  }
}

.geolocation-icon {
  position: absolute;
  margin: 0 0 0 0.6rem;
  height: 1.2rem;
  width: 1.2rem;
  transition: all 0.5 ease;
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
