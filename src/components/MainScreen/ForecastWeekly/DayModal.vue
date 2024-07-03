<template>
  <ContainerModal @toggle-modal="() => this.$emit('toggle-modal')">
    <template #header>
      <div class="day-name">{{ dayName.full }}</div>
      <div class="day-date">{{ passDate }}</div>
    </template>
    <div class="container-inner">
      <div class="icon-container">
        <img class="icon" :src="passIconSrc" draggable="false" />
      </div>

      <div class="temperature">
        {{ passTemperature }}
      </div>
      <div class="other-data">
        <div class="rain">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            fill="currentColor"
            class="header-icon"
          >
            <path
              d="M96 320c-53 0-96-43-96-96c0-42.5 27.6-78.6 65.9-91.2C64.7 126.1 64 119.1 64 112C64 50.1 114.1 0 176 0c43.1 0 80.5 24.3 99.2 60c14.7-17.1 36.5-28 60.8-28c44.2 0 80 35.8 80 80c0 5.5-.6 10.8-1.6 16c.5 0 1.1 0 1.6 0c53 0 96 43 96 96s-43 96-96 96H96zM81.5 353.9c12.2 5.2 17.8 19.3 12.6 31.5l-48 112c-5.2 12.2-19.3 17.8-31.5 12.6S-3.3 490.7 1.9 478.5l48-112c5.2-12.2 19.3-17.8 31.5-12.6zm120 0c12.2 5.2 17.8 19.3 12.6 31.5l-48 112c-5.2 12.2-19.3 17.8-31.5 12.6s-17.8-19.3-12.6-31.5l48-112c5.2-12.2 19.3-17.8 31.5-12.6zm244.6 31.5l-48 112c-5.2 12.2-19.3 17.8-31.5 12.6s-17.8-19.3-12.6-31.5l48-112c5.2-12.2 19.3-17.8 31.5-12.6s17.8 19.3 12.6 31.5zM313.5 353.9c12.2 5.2 17.8 19.3 12.6 31.5l-48 112c-5.2 12.2-19.3 17.8-31.5 12.6s-17.8-19.3-12.6-31.5l48-112c5.2-12.2 19.3-17.8 31.5-12.6z"
            />
          </svg>
          {{ t.rainChance }}: {{ weather.day.daily_chance_of_rain }}%
        </div>
        <div class="humidity">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 384 512"
            fill="currentColor"
            class="header-icon"
          >
            <path
              d="M192 512C86 512 0 426 0 320C0 228.8 130.2 57.7 166.6 11.7C172.6 4.2 181.5 0 191.1 0h1.8c9.6 0 18.5 4.2 24.5 11.7C253.8 57.7 384 228.8 384 320c0 106-86 192-192 192zM96 336c0-8.8-7.2-16-16-16s-16 7.2-16 16c0 61.9 50.1 112 112 112c8.8 0 16-7.2 16-16s-7.2-16-16-16c-44.2 0-80-35.8-80-80z"
            />
          </svg>
          {{ t.humidity }}: {{ weather.day.avghumidity }}%
        </div>
        <div class="wind">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            fill="currentColor"
            class="header-icon"
          >
            <path
              d="M288 32c0 17.7 14.3 32 32 32h32c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H352c53 0 96-43 96-96s-43-96-96-96H320c-17.7 0-32 14.3-32 32zm64 352c0 17.7 14.3 32 32 32h32c53 0 96-43 96-96s-43-96-96-96H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H384c-17.7 0-32 14.3-32 32zM128 512h32c53 0 96-43 96-96s-43-96-96-96H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H160c17.7 0 32 14.3 32 32s-14.3 32-32 32H128c-17.7 0-32 14.3-32 32s14.3 32 32 32z"
            />
          </svg>
          {{ t.wind }}: {{ passWindSpeed }}
        </div>
      </div>
      <div class="other-data">
        <div class="rain">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            fill="currentColor"
            class="header-icon"
          >
            <path
              d="M96 320c-53 0-96-43-96-96c0-42.5 27.6-78.6 65.9-91.2C64.7 126.1 64 119.1 64 112C64 50.1 114.1 0 176 0c43.1 0 80.5 24.3 99.2 60c14.7-17.1 36.5-28 60.8-28c44.2 0 80 35.8 80 80c0 5.5-.6 10.8-1.6 16c.5 0 1.1 0 1.6 0c53 0 96 43 96 96s-43 96-96 96H96zM81.5 353.9c12.2 5.2 17.8 19.3 12.6 31.5l-48 112c-5.2 12.2-19.3 17.8-31.5 12.6S-3.3 490.7 1.9 478.5l48-112c5.2-12.2 19.3-17.8 31.5-12.6zm120 0c12.2 5.2 17.8 19.3 12.6 31.5l-48 112c-5.2 12.2-19.3 17.8-31.5 12.6s-17.8-19.3-12.6-31.5l48-112c5.2-12.2 19.3-17.8 31.5-12.6zm244.6 31.5l-48 112c-5.2 12.2-19.3 17.8-31.5 12.6s-17.8-19.3-12.6-31.5l48-112c5.2-12.2 19.3-17.8 31.5-12.6s17.8 19.3 12.6 31.5zM313.5 353.9c12.2 5.2 17.8 19.3 12.6 31.5l-48 112c-5.2 12.2-19.3 17.8-31.5 12.6s-17.8-19.3-12.6-31.5l48-112c5.2-12.2 19.3-17.8 31.5-12.6z"
            />
          </svg>
          {{ t.rainChance }}: {{ weather.day.daily_chance_of_rain }}%
        </div>
        <div class="humidity">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 384 512"
            fill="currentColor"
            class="header-icon"
          >
            <path
              d="M192 512C86 512 0 426 0 320C0 228.8 130.2 57.7 166.6 11.7C172.6 4.2 181.5 0 191.1 0h1.8c9.6 0 18.5 4.2 24.5 11.7C253.8 57.7 384 228.8 384 320c0 106-86 192-192 192zM96 336c0-8.8-7.2-16-16-16s-16 7.2-16 16c0 61.9 50.1 112 112 112c8.8 0 16-7.2 16-16s-7.2-16-16-16c-44.2 0-80-35.8-80-80z"
            />
          </svg>
          {{ t.humidity }}: {{ weather.day.avghumidity }}%
        </div>
        <div class="wind">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            fill="currentColor"
            class="header-icon"
          >
            <path
              d="M288 32c0 17.7 14.3 32 32 32h32c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H352c53 0 96-43 96-96s-43-96-96-96H320c-17.7 0-32 14.3-32 32zm64 352c0 17.7 14.3 32 32 32h32c53 0 96-43 96-96s-43-96-96-96H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H384c-17.7 0-32 14.3-32 32zM128 512h32c53 0 96-43 96-96s-43-96-96-96H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H160c17.7 0 32 14.3 32 32s-14.3 32-32 32H128c-17.7 0-32 14.3-32 32s14.3 32 32 32z"
            />
          </svg>
          {{ t.wind }}: {{ passWindSpeed }}
        </div>
      </div>
    </div>
  </ContainerModal>
</template>

<script>
import { iconMap } from "../../../functions";
import ContainerModal from "../../Containers/ContainerModal.vue";
import WeatherDisplay from "../WeatherDisplay.vue";

export default {
  components: {
    ContainerModal,
    WeatherDisplay,
  },
  emits: ["toggle-modal"],
  props: ["weather", "dayName"],
  inject: ["isDay", "t", "tempUnit", "windUnit"],
  data() {
    return {
      months: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
    };
  },
  computed: {
    passDate() {
      let day = this.weather.date.split("-")[2] - 0;
      let month = this.weather.date.split("-")[1] - 1;
      return `${this.t.months[this.months[month]]}, ${day}`;
    },
    passIconSrc() {
      let iconName = iconMap[this.weather.day.condition.code];
      if (!this.isDay) {
        iconName++;
      }
      return new URL(`../../../assets/icons/${iconName}.png`, import.meta.url)
        .href;
    },
    passTemperature() {
      return Math.round(this.weather.day[`avgtemp_${this.tempUnit}`]);
    },
    passWindSpeed() {
      switch (this.windUnit) {
        case "kph":
          return `${Math.round(this.weather.day.maxwind_kph)} km/h`;
        case "mph":
          return `${Math.round(this.weather.day.maxwind_mph)} mph`;
        case "ms":
          return `${Math.round(
            this.weather.day.maxwind_kph * 0.277777778
          )} m/s`;
      }
    },
  },
  mounted() {
    console.log(this.weather);
  },
};
</script>

<style lang="scss" scoped>
$font-color: rgb(240, 240, 240);

.container-inner {
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: flex-start;
  border-top: 1px solid;
  margin-bottom: -1rem;
  padding: 0.8rem 0 1rem 0;
  border-image: linear-gradient(
      to right,
      rgba(255, 255, 255, 0) 0%,
      rgba(240, 240, 240, 0.5) 10%,
      rgba(240, 240, 240, 0.5) 90%,
      rgba(0, 0, 0, 0) 100%
    )
    1;
}

.icon {
  height: 6rem;
  filter: drop-shadow(0.2rem 0.4rem 0.2rem rgba(0, 0, 0, 0.2));
  filter: brightness(110%);
  margin: 0;
}

.temperature {
  position: relative;
  font-size: 7rem;
  text-shadow: 0.1rem 0.1rem 0.2rem rgba(0, 0, 0, 0.3);
  margin: -0.4rem 2.4rem -0.4rem 0;
  &:after {
    position: absolute;
    font-size: 5rem;
    content: "\00B0";
  }
}

.conditions {
  font-size: 1rem;
  text-align: center;
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

.other-data {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 0 1rem 0 0.6rem;
  height: 5.5rem;
  div {
    font-size: 1.3rem;
  }
  .header-icon {
    height: 1rem;
    width: 1rem;
    filter: drop-shadow(0.1rem 0.1rem 0.1rem rgba(0, 0, 0, 0.2));
    margin: 0 0.2rem 0 0;
  }
}

//@media

@media only screen and (max-width: 600px) {
  .container-inner {
    width: 100%;
  }
}

@media only screen and (max-width: 1000px) {
  .container-inner {
    flex-direction: column;
  }
}
</style>
