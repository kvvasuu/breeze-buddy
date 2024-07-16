<template>
  <ContainerMedium>
    <template #header>
      {{ $store.getters.t.wind }}
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
    </template>
    <div class="container-inner">
      <div class="wind-values">
        <div class="wind" id="wind">
          <div class="value">{{ passWindSpeed }}</div>
          <div class="wind-caption">
            <div class="unit">{{ passWindUnit }}</div>
            <div class="type">{{ $store.getters.t.wind }}</div>
          </div>
        </div>
        <div class="wind" id="gust">
          <div class="value">{{ passGustSpeed }}</div>
          <div class="wind-caption">
            <div class="unit">{{ passWindUnit }}</div>
            <div class="type">{{ $store.getters.t.gust }}</div>
          </div>
        </div>
      </div>
      <div class="compass">
        <img
          src="../../assets/compass.webp"
          :class="{ dark: !this.$store.state.isDay }"
        />
        <div class="arrow">
          <img
            src="../../assets/compass-arrow.png"
            alt=""
            :style="{ rotate: passWindDegree }"
            :class="{ dark: !this.$store.state.isDay }"
          />
        </div>
        <div
          class="direction"
          :class="{ 'direction-dark': !this.$store.state.isDay }"
        >
          {{ passWindDirection }}
        </div>
      </div>
    </div>
  </ContainerMedium>
</template>

<script>
export default {
  props: ["currentWeather"],
  inject: ["localTime"],
  computed: {
    passLocalTime() {
      return this.localTime.split(" ")[1].split(":")[0];
    },
    passWindDirection() {
      return this.currentWeather[0].hour[this.passLocalTime].wind_dir;
    },
    passWindDegree() {
      return (
        this.currentWeather[0].hour[this.passLocalTime].wind_degree + "deg"
      );
    },
    passWindSpeed() {
      switch (this.$store.state.windUnit) {
        case "kph":
          return Math.round(
            this.currentWeather[0].hour[this.passLocalTime].wind_kph
          );
        case "mph":
          return Math.round(
            this.currentWeather[0].hour[this.passLocalTime].wind_mph
          );
        case "ms":
          return Math.round(
            this.currentWeather[0].hour[this.passLocalTime].wind_kph *
              0.277777778
          );
      }
    },
    passGustSpeed() {
      switch (this.$store.state.windUnit) {
        case "kph":
          return Math.round(
            this.currentWeather[0].hour[this.passLocalTime].gust_kph
          );
        case "mph":
          return Math.round(
            this.currentWeather[0].hour[this.passLocalTime].gust_mph
          );
        case "ms":
          return Math.round(
            this.currentWeather[0].hour[this.passLocalTime].gust_kph *
              0.277777778
          );
      }
    },
    passWindUnit() {
      switch (this.$store.state.windUnit) {
        case "kph":
          return "km/h";
        case "mph":
          return "mph";
        case "ms":
          return "m/s";
        default:
          return "km/h";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.header-icon {
  position: absolute;
  height: 0.8rem;
  width: 1rem;
  left: -1.3rem;
  filter: drop-shadow(0.1rem 0.1rem 0.1rem rgba(0, 0, 0, 0.2));
  margin: 0 0 0.1rem 0;
}

.container-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
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
.wind-values {
  width: 12rem;
}

.wind {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  min-width: 8rem;
  .value {
    font-size: 2.2rem;
    min-width: 2.6rem;
    margin: 0.4rem 0.4rem 0.4rem 0;
    text-shadow: 0.1rem 0.1rem 0.1rem rgba(0, 0, 0, 0.1);
  }
  &:first-of-type {
    border-bottom: 1px solid;
    border-image: linear-gradient(
        to right,
        rgba(255, 255, 255, 0) 0%,
        rgba(240, 240, 240, 0.5) 10%,
        rgba(240, 240, 240, 0.5) 90%,
        rgba(0, 0, 0, 0) 100%
      )
      1;
  }
  .wind-caption {
    text-align: left;
    .unit {
      font-size: 0.7rem;
      text-shadow: 0.1rem 0.1rem 0.1rem rgba(0, 0, 0, 0.1);
      font-weight: bold;
      opacity: 0.8;
    }
    .type {
      font-size: 0.9rem;
      text-shadow: 0.1rem 0.1rem 0.1rem rgba(0, 0, 0, 0.1);
      font-weight: bold;
    }
  }
}

.compass {
  position: relative;
  height: 10rem;
  width: 10rem;
  img {
    position: absolute;
    top: 0;
    left: 0;
    height: 10rem;
    width: 10rem;
    filter: brightness(170%);
    &.dark {
      filter: brightness(130%);
    }
  }
  .direction {
    position: absolute;
    top: calc(50% - 2rem);
    left: calc(50% - 2rem);
    height: 4rem;
    width: 4rem;
    background-color: rgb(155, 209, 212);
    border-radius: 10rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: Helvetica Bold;
    letter-spacing: 1px;
  }
  .direction-dark {
    background-color: rgb(74, 118, 129);
  }
}

.arrow {
  height: 10rem;
  width: 10rem;
  img {
    position: absolute;
    top: calc(50% - 4.85rem);
    left: calc(50% - 1rem);
    height: 9.7rem;
    width: 2rem;
    transform-origin: center;
    rotate: 0;
    &.dark {
      filter: brightness(90%);
    }
  }
}

//@media

@media only screen and (max-width: 1000px) {
  .wind-values {
    width: 14rem;
  }
}

@media only screen and (max-width: 600px) {
  .wind-values {
    width: 10rem;
  }
  .compass {
    height: 8rem;
    width: 8rem;
    img {
      height: 8rem;
      width: 8rem;
    }
    .direction {
      top: calc(50% - 1.5rem);
      left: calc(50% - 1.5rem);
      height: 3rem;
      width: 3rem;
    }
  }
  .arrow {
    height: 8rem;
    width: 8rem;
    img {
      position: absolute;
      top: calc(50% - 3.88rem);
      left: calc(50% - 0.8rem);
      height: 7.76rem;
      width: 1.6rem;
      transform-origin: center;
      rotate: 0;
    }
  }
}
</style>
