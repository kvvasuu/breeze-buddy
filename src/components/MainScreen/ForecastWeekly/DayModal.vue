<template>
  <ContainerModal @toggle-modal="() => this.$emit('toggle-modal')">
    <template #header>
      <div class="day-name">{{ dayName.full }}</div>
      <div class="day-date">{{ passDate }}</div>
    </template>
    <div class="container-inner">
      <div class="column left">
        <div class="icon-container">
          <img class="icon" :src="passIconSrc" draggable="false" />
        </div>

        <div class="temperature-outer">
          <div class="temperature">
            {{ passTemperature }}
          </div>
          <div class="feelslike">
            {{ $store.getters.t.feelslike }}: {{ passFellsLikeTemperature }}&deg
          </div>
        </div>
      </div>
      <div class="column right">
        <div class="conditions">{{ weather.day.condition.text }}</div>
        <div class="other-data-container">
          <div class="other-data">
            <div class="rain">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                fill="currentColor"
                class="data-icon"
              >
                <path
                  d="M96 320c-53 0-96-43-96-96c0-42.5 27.6-78.6 65.9-91.2C64.7 126.1 64 119.1 64 112C64 50.1 114.1 0 176 0c43.1 0 80.5 24.3 99.2 60c14.7-17.1 36.5-28 60.8-28c44.2 0 80 35.8 80 80c0 5.5-.6 10.8-1.6 16c.5 0 1.1 0 1.6 0c53 0 96 43 96 96s-43 96-96 96H96zM81.5 353.9c12.2 5.2 17.8 19.3 12.6 31.5l-48 112c-5.2 12.2-19.3 17.8-31.5 12.6S-3.3 490.7 1.9 478.5l48-112c5.2-12.2 19.3-17.8 31.5-12.6zm120 0c12.2 5.2 17.8 19.3 12.6 31.5l-48 112c-5.2 12.2-19.3 17.8-31.5 12.6s-17.8-19.3-12.6-31.5l48-112c5.2-12.2 19.3-17.8 31.5-12.6zm244.6 31.5l-48 112c-5.2 12.2-19.3 17.8-31.5 12.6s-17.8-19.3-12.6-31.5l48-112c5.2-12.2 19.3-17.8 31.5-12.6s17.8 19.3 12.6 31.5zM313.5 353.9c12.2 5.2 17.8 19.3 12.6 31.5l-48 112c-5.2 12.2-19.3 17.8-31.5 12.6s-17.8-19.3-12.6-31.5l48-112c5.2-12.2 19.3-17.8 31.5-12.6z"
                />
              </svg>
              {{ $store.getters.t.rainChance }}:
              {{ weather.day.daily_chance_of_rain }}%
            </div>
            <div class="humidity">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 384 512"
                fill="currentColor"
                class="data-icon"
              >
                <path
                  d="M192 512C86 512 0 426 0 320C0 228.8 130.2 57.7 166.6 11.7C172.6 4.2 181.5 0 191.1 0h1.8c9.6 0 18.5 4.2 24.5 11.7C253.8 57.7 384 228.8 384 320c0 106-86 192-192 192zM96 336c0-8.8-7.2-16-16-16s-16 7.2-16 16c0 61.9 50.1 112 112 112c8.8 0 16-7.2 16-16s-7.2-16-16-16c-44.2 0-80-35.8-80-80z"
                />
              </svg>
              {{ $store.getters.t.humidity }}: {{ weather.day.avghumidity }}%
            </div>
            <div class="wind">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                fill="currentColor"
                class="data-icon"
              >
                <path
                  d="M288 32c0 17.7 14.3 32 32 32h32c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H352c53 0 96-43 96-96s-43-96-96-96H320c-17.7 0-32 14.3-32 32zm64 352c0 17.7 14.3 32 32 32h32c53 0 96-43 96-96s-43-96-96-96H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H384c-17.7 0-32 14.3-32 32zM128 512h32c53 0 96-43 96-96s-43-96-96-96H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H160c17.7 0 32 14.3 32 32s-14.3 32-32 32H128c-17.7 0-32 14.3-32 32s14.3 32 32 32z"
                />
              </svg>
              {{ $store.getters.t.wind }}: {{ passWindSpeed }}
            </div>
          </div>
          <div class="other-data">
            <div class="pressure">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                fill="currentColor"
                class="data-icon"
              >
                <path
                  d="M0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm320 96c0-26.9-16.5-49.9-40-59.3V88c0-13.3-10.7-24-24-24s-24 10.7-24 24V292.7c-23.5 9.5-40 32.5-40 59.3c0 35.3 28.7 64 64 64s64-28.7 64-64zM144 176a32 32 0 1 0 0-64 32 32 0 1 0 0 64zm-16 80a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm288 32a32 32 0 1 0 0-64 32 32 0 1 0 0 64zM400 144a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"
                />
              </svg>
              {{ $store.getters.t.pressure }}: {{ passPressure }}
            </div>
            <div class="visibility">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 576 512"
                fill="currentColor"
                class="data-icon"
              >
                <path
                  d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"
                />
              </svg>
              {{ $store.getters.t.visibility }}: {{ passVisibility }}
            </div>
            <div class="uv">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                fill="currentColor"
                class="data-icon"
              >
                <path
                  d="M361.5 1.2c5 2.1 8.6 6.6 9.6 11.9L391 121l107.9 19.8c5.3 1 9.8 4.6 11.9 9.6s1.5 10.7-1.6 15.2L446.9 256l62.3 90.3c3.1 4.5 3.7 10.2 1.6 15.2s-6.6 8.6-11.9 9.6L391 391 371.1 498.9c-1 5.3-4.6 9.8-9.6 11.9s-10.7 1.5-15.2-1.6L256 446.9l-90.3 62.3c-4.5 3.1-10.2 3.7-15.2 1.6s-8.6-6.6-9.6-11.9L121 391 13.1 371.1c-5.3-1-9.8-4.6-11.9-9.6s-1.5-10.7 1.6-15.2L65.1 256 2.8 165.7c-3.1-4.5-3.7-10.2-1.6-15.2s6.6-8.6 11.9-9.6L121 121 140.9 13.1c1-5.3 4.6-9.8 9.6-11.9s10.7-1.5 15.2 1.6L256 65.1 346.3 2.8c4.5-3.1 10.2-3.7 15.2-1.6zM160 256a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zm224 0a128 128 0 1 0 -256 0 128 128 0 1 0 256 0z"
                />
              </svg>
              UV: {{ weather.day.uv }}
            </div>
          </div>
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
      return `${this.$store.getters.t.months[this.months[month]]}, ${day}`;
    },
    passIconSrc() {
      let iconName = iconMap[this.weather.day.condition.code];
      return new URL(`../../../assets/icons/${iconName}.png`, import.meta.url)
        .href;
    },
    passTemperature() {
      return Math.round(
        this.weather.day[`avgtemp_${this.$store.state.tempUnit}`]
      );
    },
    passFellsLikeTemperature() {
      return Math.round(
        this.weather.hour
          .map((el) => el[`feelslike_${this.$store.state.tempUnit}`])
          .reduce((a, b) => a + b) / 24
      );
    },
    passWindSpeed() {
      switch (this.$store.state.windUnit) {
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
    passPressure() {
      return this.$store.state.pressureUnit === "mb"
        ? `${Math.round(
            this.weather.hour
              .map((el) => el.pressure_mb)
              .reduce((a, b) => a + b) / 24
          )} hPa`
        : `${Math.round(
            this.weather.hour
              .map((el) => el.pressure_in)
              .reduce((a, b) => a + b) / 24
          )} inHg`;
    },
    passVisibility() {
      return this.$store.state.windUnit === "mph"
        ? `${this.weather.day.avgvis_miles} mi`
        : `${this.weather.day.avgvis_km} km`;
    },
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

.column {
  display: flex;
  align-items: center;
  flex-direction: row;
  &.right {
    flex-direction: column;
    align-items: flex-start;
  }
}

.icon {
  height: 8rem;
  filter: drop-shadow(0.2rem 0.4rem 0.2rem rgba(0, 0, 0, 0.2));
  filter: brightness(110%);
  margin: 0;
}

.temperature {
  position: relative;
  font-size: 6rem;
  text-shadow: 0.1rem 0.1rem 0.2rem rgba(0, 0, 0, 0.3);
  margin: -0.4rem 2.4rem -0.4rem 1rem;
  &:after {
    position: absolute;
    font-size: 5rem;
    content: "\00B0";
  }
}

.feelslike {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 0 0 -1rem;
  justify-content: center;
  font-size: 0.8rem;
}

.conditions {
  font-size: 1.2rem;
  text-align: left;
  text-shadow: 0.1rem 0.1rem 0.2rem rgba(0, 0, 0, 0.3);
  color: rgba(255, 255, 255, 1);
  margin: 0 0 0 0.6rem;
  font-weight: bold;
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

.other-data-container {
  display: flex;
  flex-direction: row;
}

.other-data {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 0.6rem 1rem 0 0.6rem;
  height: 5.5rem;
  div {
    font-size: 1.3rem;
  }
  .data-icon {
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
    flex-direction: column;
  }
  .column {
    &.left {
      margin: 0 0 0.6rem 0;
    }
    &.right {
      align-items: center;
    }
  }
  .conditions {
    margin: 0 0 1rem 0;
  }
  .other-data {
    margin: 0.6rem 0 0 0;
  }
  .icon {
    height: 10rem;
  }
  .temperature {
    font-size: 5rem;
  }
}

@media only screen and (max-width: 1000px) {
  .container-inner {
    flex-wrap: wrap;
    justify-content: space-around;
  }
  .column {
    flex-direction: column;
    &.right {
      justify-content: space-between;
    }
  }
  .other-data-container {
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: space-between;
    .other-data {
      height: 6.2rem;
    }
  }
}
</style>
