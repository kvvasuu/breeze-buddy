<template>
  <div class="main-container">
    <WeatherDisplay :currentWeather="currentWeather"></WeatherDisplay>
    <div class="buttons">
      <div
        class="icon"
        :class="{
          'location-icon-shake': !isGeolocationDone,
        }"
        @click="getLocationWeather"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 384 512"
          fill="currentColor"
        >
          <path
            d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"
          />
        </svg>
      </div>
      <div class="search-container">
        <Transition name="bounce" mode="out-in">
          <input
            class="search-input"
            id="search"
            type="text"
            placeholder="Search"
            v-if="showSearchInput"
            v-model="searchInput"
            @keydown.enter="getCurrentWeather(searchInput)"
            @blur="getCurrentWeather(searchInput)"
            autocomplete="off"
          />
          <div class="icon" v-else @click="toggleShowSearchInput">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              fill="currentColor"
            >
              <path
                d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"
              />
            </svg>
          </div>
        </Transition>
      </div>

      <div class="icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
          fill="currentColor"
        >
          <path
            d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"
          />
        </svg>
      </div>
    </div>
    <ForecastHourly></ForecastHourly>
    <ForecastWeekly></ForecastWeekly>
  </div>
</template>

<script>
import ForecastHourly from "./ForecastHourly/ForecastHourly.vue";
import ForecastWeekly from "./ForecastWeekly/ForecastWeekly.vue";
import WeatherDisplay from "./WeatherDisplay.vue";
import axios from "axios";
import { latinise, Latinise } from "../../latinise";

export default {
  components: {
    WeatherDisplay,
    ForecastHourly,
    ForecastWeekly,
  },
  data() {
    return {
      showSearchInput: false,
      isGeolocationDone: false,
      coords: {},
      currentWeather: {
        location: {
          name: "My Location",
        },
        current: {
          temp_c: "0",
          condition: {
            text: "Unknown",
          },
        },
      },
      searchInput: "",
    };
  },
  methods: {
    toggleShowSearchInput() {
      this.showSearchInput = !this.showSearchInput;
    },
    async getCurrentWeather(value) {
      let q = "";
      if (value === undefined && this.isGeolocationDone) {
        q = `${this.coords.lat},${this.coords.long}`;
      } else q = latinise(value).trim();
      if (q !== "")
        try {
          const response = await axios.get(
            "https://api.weatherapi.com/v1/current.json",
            {
              params: {
                key: "e4ee231ca8574dfc85f123549241106",
                q: q,
                aqi: "no",
                lang: "en",
              },
            }
          );
          this.currentWeather = response.data;
          this.searchInput = "";
          if (this.showSearchInput) {
            this.toggleShowSearchInput();
          }
        } catch (error) {
          console.error(error);
        }
    },
    async getLocationWeather() {
      if ("geolocation" in navigator) {
        navigator.permissions.query({ name: "geolocation" }).then((result) => {
          if (result.state === "denied") {
            console.log(`Geolocation permission:` + result.state);
          } else {
            navigator.geolocation.getCurrentPosition(
              (position) => {
                this.isGeolocationDone = true;
                this.coords.lat = position.coords.latitude;
                this.coords.long = position.coords.longitude;
                this.getCurrentWeather();
              },
              () => {
                this.isGeolocationDone = false;
                console.log("Location must by on.");
              },
              { enableHighAccuracy: true, maximumAge: 10000000 }
            );
          }
        });
      } else {
        console.log("Geolocation impossible.");
      }
    },
  },
  beforeMount() {
    this.getLocationWeather();
  },
};
</script>

<style lang="scss" scoped>
$font-color: rgb(250, 250, 250);

.main-container {
  position: relative;
  width: 100%;
  background-image: linear-gradient(
    160deg,
    rgba(0, 116, 184, 0.2) 0%,
    rgba(107, 173, 166, 0.2) 100%
  );
  border-radius: inherit;
  box-shadow: 0.2rem 1rem 2rem rgba(0, 0, 0, 0.3);
  justify-content: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  backdrop-filter: blur(6rem);
}

.buttons {
  width: 52rem;
  height: 4rem;
  margin: 1rem 0 -1rem 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;
}

.icon {
  color: $font-color;
  height: 3rem;
  width: 3rem;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  filter: drop-shadow(0.1rem 0.1rem 0.2rem rgba(0, 0, 0, 0.603));
  cursor: pointer;
  svg {
    height: 2rem;
  }
  &:hover {
    opacity: 1;
    filter: drop-shadow(0.1rem 0.1rem 0.2rem rgba(255, 255, 255, 0.3));
    scale: 1.2;
  }
}

.location-icon-shake {
  animation: shake 1s infinite;
  transform-origin: bottom;
}

.search-input {
  border-radius: 2rem;
  text-align: center;
  height: 2rem;
  background-color: rgba(255, 255, 255, 0.5);
  outline: none;
  border: none;
  color: rgba(35, 188, 199, 0.8);
  max-width: 10rem;
  transition: all 0.3s ease;
  font-family: Helvetica Bold;
  text-transform: uppercase;
  &::placeholder {
    color: rgba(35, 188, 199, 0.8);
    opacity: 1;
  }
  &:focus {
    box-shadow: 0.1rem 0.2rem 0.3rem rgba(0, 0, 0, 0.2);
    translate: 0 -1px;
    color: $font-color;
    background-color: rgba(35, 188, 199, 0.8);

    &::placeholder {
      color: rgba(250, 250, 250, 0.5);
    }
  }
  &:hover {
    translate: 0 -1px;
  }
}

//Transitions

.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes shake {
  0% {
    transform: rotate(0);
  }
  30% {
    transform: rotate(0);
  }
  40% {
    transform: rotate(4deg);
  }
  50% {
    transform: rotate(-4deg);
  }
  60% {
    transform: rotate(4deg);
  }
  100% {
    transform: rotate(0);
  }
}

//@media

@media only screen and (max-width: 1000px) {
  .buttons {
    width: 28rem;
  }
}

@media only screen and (max-width: 600px) {
  .buttons {
    width: 20rem;
  }
  .main-container {
    background-image: linear-gradient(
      160deg,
      rgba(0, 116, 184, 0.1) 0%,
      rgba(107, 173, 166, 0.1) 100%
    );
  }
}
</style>
