<template>
  <div class="main-container" :class="{ 'scale-down': showModal }">
    <Teleport to="body">
      <Transition name="notification" mode="out-in">
        <ContainerNotification v-if="notificationVisible">
          <template #header>{{ notificationContent.header }}</template>
          <template v-if="notificationContent.info" #info>{{
            notificationContent.info
          }}</template>
        </ContainerNotification>
      </Transition>
    </Teleport>
    <WeatherDisplay
      :currentWeather="weather"
      :geolocationIcon="isCurrentLocation"
    ></WeatherDisplay>
    <div class="buttons">
      <div
        class="icon"
        :class="{
          'location-icon-shake': pinShakeAnimation,
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
            v-if="showSearchInput"
            :placeholder="$store.getters.t.search"
            v-model.trim="searchInput"
            v-debounce:300ms="getAutocomplete"
            :debounce-events="['click', 'keydown']"
            autocomplete="off"
            ref="search"
            autofocus
          />

          <img
            src="../../assets/spinner.gif"
            class="loader"
            v-else-if="loading && !showSearchInput"
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
        <ul
          class="autocomplete-list"
          v-if="autocompleteList[0] === 'noResults'"
        >
          <li class="no-results">
            <span class="country">{{ $store.getters.t.noResults }}</span>
          </li>
        </ul>
        <ul class="autocomplete-list" v-else-if="autocompleteList.length != 0">
          <li
            v-for="location in autocompleteList"
            @click="getWeather(location.id, false)"
            :key="location.id"
          >
            {{ location.name }}
            <span class="country">{{
              location.country ? `(${location.country})` : ""
            }}</span>
          </li>
        </ul>
      </div>

      <div class="icon" @click="() => $emit('show-settings')">
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
    <Transition
      :name="transitionChange ? 'slide-horizontal-fade' : 'slide-fade'"
      mode="out-in"
    >
      <ForecastHourly
        v-if="weatherDone"
        :weather="weather.forecast.forecastday"
        :key="weather.location.name"
      ></ForecastHourly>
    </Transition>
    <Transition
      :name="transitionChange ? 'slide-horizontal-fade' : 'slide-fade'"
      mode="out-in"
    >
      <ForecastWeekly
        v-if="weatherDone"
        :forecast="weather.forecast.forecastday"
        :currentWeather="weather.current"
        :key="weather.location.name"
        @toggle-modal="() => $emit('toggle-modal')"
      ></ForecastWeekly>
    </Transition>
    <div class="other-values">
      <Transition
        :name="transitionChange ? 'slide-horizontal-fade' : 'slide-fade'"
        mode="out-in"
      >
        <Wind
          v-if="weatherDone"
          :currentWeather="weather.forecast.forecastday"
          :key="weather.location.name"
        ></Wind>
      </Transition>
      <Transition
        :name="transitionChange ? 'slide-horizontal-fade' : 'slide-fade'"
        mode="out-in"
        ><Pressure
          v-if="weatherDone"
          :currentWeather="weather.current"
          :key="weather.location.name"
        ></Pressure
      ></Transition>
      <Transition
        :name="transitionChange ? 'slide-horizontal-fade' : 'slide-fade'"
        mode="out-in"
        ><Humidity
          v-if="weatherDone"
          :currentWeather="weather.current"
          :key="weather.location.name"
        ></Humidity
      ></Transition>
    </div>
  </div>
</template>

<script>
import ForecastHourly from "./ForecastHourly/ForecastHourly.vue";
import ForecastWeekly from "./ForecastWeekly/ForecastWeekly.vue";
import WeatherDisplay from "./WeatherDisplay.vue";
import Pressure from "./Pressure.vue";
import Humidity from "./Humidity.vue";
import Wind from "./Wind.vue";
import axios from "axios";
import { latinise } from "../../functions";
import { computed } from "vue";
import ContainerNotification from "../Containers/ContainerNotification.vue";

export default {
  components: {
    WeatherDisplay,
    ForecastHourly,
    ForecastWeekly,
    Wind,
    Pressure,
    Humidity,
    ContainerNotification,
  },
  emits: ["show-settings", "toggle-modal"],
  inject: ["showModal"],
  provide() {
    return {
      localTime: computed(() => this.weather.location.localtime),
    };
  },
  data() {
    return {
      showSearchInput: false,
      isGeolocationDone: false,
      pinShakeAnimation: false,
      transitionChange: false,
      position: { lat: 0, lon: 0, name: "" },
      weather: {
        location: {
          name: this.$store.getters.t.myLocation,
        },
        current: {
          temp_c: "-",
          temp_f: "-",
          condition: {
            code: 100,
            text: this.$store.getters.t.unknown,
          },
        },
        forecast: {
          forecastday: [
            {
              day: {
                mintemp_c: "",
                maxtemp_c: "",
                mintemp_f: "",
                maxtemp_f: "",
              },
            },
          ],
        },
      },
      weatherDone: false,
      searchInput: "",
      autocompleteList: [],
      refreshIntervalID: 0,
      notificationContent: {},
      notificationVisible: false,
      isCurrentLocation: false,
      loading: false,
    };
  },
  methods: {
    toggleShowSearchInput() {
      this.showSearchInput = !this.showSearchInput;
    },
    async getWeather(value, isRefresh) {
      let q = "";
      if (value === undefined && this.isGeolocationDone && !isRefresh) {
        q = `${this.position.lat},${this.position.lon}`;
      } else if (isRefresh) {
        q = `${this.weather.location.lat},${this.weather.location.lon}`;
      } else {
        q = `id:${value}`;
        this.autocompleteList = [];
      }

      if (q !== "" && !this.loading) {
        if (!isRefresh) {
          this.loading = true;
          this.weather = {
            location: {
              name: this.$store.getters.t.myLocation,
            },
            current: {
              temp_c: "-",
              temp_f: "-",
              condition: {
                code: 100,
                text: this.$store.getters.t.unknown,
              },
            },
            forecast: {
              forecastday: [
                {
                  day: {
                    mintemp_c: "",
                    maxtemp_c: "",
                    mintemp_f: "",
                    maxtemp_f: "",
                  },
                },
              ],
            },
          };
        }

        try {
          return await axios
            .get("https://api.weatherapi.com/v1/forecast.json", {
              params: {
                key: "7daa3061b866483791e125836241307",
                q: q,
                aqi: "no",
                lang: this.$store.getters.lang,
                days: 3,
              },
            })
            .then((response) => {
              if (
                (this.isGeolocationDone &&
                  Math.round(response.data.location.lat * 10) / 10 ===
                    Math.round(this.position.lat * 10) / 10 &&
                  Math.round(response.data.location.lon * 10) / 10 ===
                    Math.round(this.position.lon * 10) / 10) ||
                (this.isGeolocationDone &&
                  this.position.name === response.data.location.name)
              ) {
                this.isCurrentLocation = true;
              } else this.isCurrentLocation = false;

              this.$store.commit("changeIsDay", !!response.data.current.is_day);
              localStorage.setItem("isDay", this.$store.state.isDay);

              if (this.refreshIntervalID === 0) {
                this.refreshIntervalID = setInterval(() => {
                  this.refresh();
                }, 70000);
              }

              if (response.data.current && response.data.forecast) {
                this.weatherDone = true;
                this.weather = response.data;
              }

              if (response.data && !isRefresh)
                setTimeout(() => {
                  this.transitionChange = true;
                }, 3000);
              if (this.showSearchInput && !isRefresh) {
                this.searchInput = "";
                this.toggleShowSearchInput();
              }
              setTimeout(() => {
                this.loading = false;
              }, 1500);
              return response.data.location;
            })
            .catch((error) => {
              if (this.showSearchInput) {
                this.toggleShowSearchInput();
              }
              setTimeout(() => {
                this.loading = false;
                if (error.response) {
                  this.showNotification(error.response.data.error.message);
                } else this.showNotification(error.message);
                this.searchInput = "";
              }, 1500);

              console.log(error);
            });
        } catch (error) {
          if (this.showSearchInput) {
            this.toggleShowSearchInput();
          }

          setTimeout(() => {
            this.loading = false;
            this.showNotification(error.message);
            this.searchInput = "";
          }, 1500);

          console.error(error);
        }
      }
    },
    async getLocationWeather() {
      if ("geolocation" in navigator) {
        navigator.permissions.query({ name: "geolocation" }).then((result) => {
          if (result.state === "denied") {
            this.showNotification(
              `Geolocation permission: ` + result.state,
              "Turn on the geolocation to use this feature."
            );
            this.pinShake();
          } else {
            navigator.geolocation.getCurrentPosition(
              (position) => {
                this.isGeolocationDone = true;
                if (
                  this.weather.location.lat !==
                    Math.round(position.coords.latitude * 100) / 100 &&
                  this.weather.location.lon !==
                    Math.round(position.coords.longitude * 100) / 100
                ) {
                  this.position.lat = position.coords.latitude;
                  this.position.lon = position.coords.longitude;
                  this.getWeather().then((location) => {
                    this.position.name = location.name;
                    this.position.lat = location.lat;
                    this.position.lon = location.lon;
                  });
                } else {
                  this.pinShake();
                }
              },
              (error) => {
                this.isGeolocationDone = false;
                this.pinShake();
                this.showNotification(
                  "Geolocation must be on.",
                  "Turn on the geolocation to use this feature."
                );
                console.log(error);
              },
              { enableHighAccuracy: true, maximumAge: 10000000 }
            );
          }
        });
      } else {
        this.showNotification(
          "Geolocation impossible.",
          "Geolocation is not supported on your device."
        );
      }
    },
    getAutocomplete() {
      if (this.searchInput !== "") {
        let q = latinise(this.searchInput);
        axios
          .get("https://api.weatherapi.com/v1/search.json", {
            params: {
              key: "7daa3061b866483791e125836241307",
              q: q,
            },
          })
          .then((response) => {
            response.data.length === 0
              ? (this.autocompleteList[0] = "noResults")
              : (this.autocompleteList = response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        this.autocompleteList = [];
      }
    },
    onVisibilityChange() {
      if (document.visibilityState === "hidden") {
        return;
      } else {
        this.refresh();
      }
    },
    refresh() {
      if (!this.loading) {
        console.log("REFRESH");
        this.getWeather(undefined, true);
      }
    },
    pinShake() {
      if (!this.pinShakeAnimation) {
        this.pinShakeAnimation = true;
        setTimeout(() => {
          this.pinShakeAnimation = false;
        }, 1200);
      }
    },
    showNotification(header, info) {
      if (!this.notificationVisible) {
        this.notificationVisible = true;
        this.notificationContent.header = header;
        this.notificationContent.info = info;
        setTimeout(() => {
          this.notificationVisible = false;
          this.notificationContent = {};
        }, 3000);
      }
    },
  },
  beforeMount() {
    document.addEventListener(
      "visibilitychange",
      this.onVisibilityChange,
      false
    );
    this.getLocationWeather();
  },

  unmounted() {
    clearInterval(this.refreshIntervalID);
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
  box-shadow: 0.2rem 0.3rem 1rem rgba(0, 0, 0, 0.2);
  justify-content: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  backdrop-filter: blur(0.4rem);
  overflow: hidden;
  padding: 2rem 0;
  transition: all 0.6s ease;
}

.scale-down {
  scale: 0.98;
}

.buttons {
  width: 52rem;
  height: 4rem;
  margin: 1rem 0 0.6rem 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;
}

.other-values {
  width: 54rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
}

.icon {
  color: $font-color;
  height: 3rem;
  width: 3rem;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  filter: drop-shadow(0.1rem 0.1rem 0.12rem rgba(0, 0, 0, 0.5));
  cursor: pointer;
  svg {
    height: 2rem;
  }
  &:hover {
    opacity: 1;
    filter: drop-shadow(0.1rem 0.1rem 0.1rem rgba(255, 255, 255, 0.3));
    scale: 1.2;
  }
}

.location-icon-shake {
  animation: shake 1s infinite;
  transform-origin: bottom;
}

.search-container {
  position: relative;
}

.search-input {
  border-radius: 1rem;
  text-align: center;
  height: 2rem;
  background-color: rgba(255, 255, 255, 0.5);
  outline: none;
  border: none;
  color: rgb(35, 188, 199);
  max-width: 10rem;
  transition: all 0.3s ease;
  font-family: Helvetica Bold;
  text-transform: uppercase;
  z-index: 3;
  &::placeholder {
    color: rgba(35, 188, 199, 0.8);
    opacity: 1;
  }
  &:focus {
    box-shadow: 0.1rem 0.2rem 0.3rem rgba(0, 0, 0, 0.2);
    translate: 0 -1px;
    color: $font-color;
    background-color: rgb(35, 188, 199);
    &::placeholder {
      color: rgba(250, 250, 250, 0.5);
    }
  }
  &:hover {
    translate: 0 -1px;
  }
}

.search-input:focus + .autocomplete-list {
  opacity: 1;
}
.autocomplete-list {
  position: absolute;
  padding: 1rem 0 0 0;
  top: 2.5rem;
  opacity: 0;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 2rem;
  text-align: center;
  width: 8.25rem;
  list-style: none;
  height: auto;
  outline: none;
  background-color: rgb(35, 188, 199);
  border: none;
  color: rgba(255, 255, 255, 0.9);
  transition: all 0.3s ease;
  font-family: Helvetica Bold;
  font-size: 0.8rem;
  padding: 0;
  margin: 0;
  z-index: 2;
  box-shadow: 0.1rem 0.2rem 0.3rem rgba(0, 0, 0, 0.2);
  li {
    padding: 0.4rem;
    margin: 0;
    background-color: rgb(35, 188, 199);
    transition: all 0.3s ease;
    &:hover:not(.no-results) {
      color: rgb(35, 188, 199);
      background-color: rgba(255, 255, 255, 0.9);
      cursor: pointer;
    }
    &:first-of-type {
      border-top-left-radius: 0.8rem;
      border-top-right-radius: 0.8rem;
    }
    &:last-of-type {
      border-bottom-left-radius: 0.8rem;
      border-bottom-right-radius: 0.8rem;
    }
    .country {
      font-size: 0.7rem;
    }
  }
}

.loader {
  width: 2.4rem;
  height: 2.4rem;
  margin: 0.2rem 0 0 0;
  filter: drop-shadow(0.1rem 0.1rem 0.1rem rgba(0, 0, 0, 0.2));
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
  .other-values {
    width: 30rem;
    display: flex;
  }
}

@media only screen and (max-width: 600px) {
  .buttons {
    width: 20rem;
  }
  .main-container {
    min-height: 100vh;
    justify-content: flex-start;
    scale: 1 !important;
    backdrop-filter: none;
  }
  .other-values {
    width: 22rem;
    display: flex;
  }
}
</style>
