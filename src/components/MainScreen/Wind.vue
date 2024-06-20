<template>
  <div class="wind-container container" :class="{ 'container-dark': !isDay }">
    <div class="wind-caption">
      {{ t.wind }}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        fill="currentColor"
      >
        <path
          d="M288 32c0 17.7 14.3 32 32 32h32c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H352c53 0 96-43 96-96s-43-96-96-96H320c-17.7 0-32 14.3-32 32zm64 352c0 17.7 14.3 32 32 32h32c53 0 96-43 96-96s-43-96-96-96H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H384c-17.7 0-32 14.3-32 32zM128 512h32c53 0 96-43 96-96s-43-96-96-96H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H160c17.7 0 32 14.3 32 32s-14.3 32-32 32H128c-17.7 0-32 14.3-32 32s14.3 32 32 32z"
        />
      </svg>
    </div>
    <div class="wind-container-inner">
      <div class="wind-values">
        <div class="wind" id="wind">
          <div class="value">{{ passWindSpeed }}</div>
          <div class="caption">
            <div class="unit">{{ passWindUnit }}</div>
            <div class="type">{{ t.wind }}</div>
          </div>
        </div>
        <div class="wind" id="gust">
          <div class="value">{{ passGustSpeed }}</div>
          <div class="caption">
            <div class="unit">{{ passWindUnit }}</div>
            <div class="type">{{ t.gust }}</div>
          </div>
        </div>
      </div>
      <div class="compass">
        <div class="arrow"></div>
        <div class="direction"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["currentWeather"],
  inject: ["isDay", "t", "windUnit"],
  data() {
    return {
      currentDate: new Date(),
    };
  },
  computed: {
    currentHour() {
      return this.currentDate.getHours() + 1;
    },
    passWindSpeed() {
      return Math.round(
        this.currentWeather[0].hour[this.currentHour][`wind_${this.windUnit}`]
      );
    },
    passGustSpeed() {
      console.log(this.currentWeather[0].hour[this.currentHour]);
      return Math.round(
        this.currentWeather[0].hour[this.currentHour][`gust_${this.windUnit}`]
      );
    },
    passWindUnit() {
      switch (this.windUnit) {
        case "kph":
          return "km/h";
        case "mph":
          return "mph";
        default:
          return "km/h";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.wind-container {
  width: 24.5rem;
  border-radius: 1.6rem;
  padding: 1rem;
  box-shadow: 0.1rem 0.2rem 0.3rem rgba(0, 0, 0, 0.1);
  user-select: none;
}

.wind-caption {
  position: relative;
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  text-shadow: 0.1rem 0.1rem 0.1rem rgba(0, 0, 0, 0.2);
  font-weight: bold;
  opacity: 0.8;
  margin: 0.1rem 0.3rem 0.3rem 1.3rem;
  svg {
    position: absolute;
    height: 0.8rem;
    left: -1.3rem;
    filter: drop-shadow(0.1rem 0.1rem 0.1rem rgba(0, 0, 0, 0.2));
  }
}

.wind-container-inner {
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

.wind {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  min-width: 12rem;
  .value {
    font-size: 2.2rem;
    min-width: 2.6rem;
    margin: 0.4rem 0.4rem 0.4rem 0;
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
  .caption {
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

//@media

@media only screen and (max-width: 1000px) {
  .wind-container {
    width: 28rem;
    margin: 1rem 0 0 0;
  }
}

@media only screen and (max-width: 600px) {
  .wind-container {
    width: 20rem;
  }
}
</style>
