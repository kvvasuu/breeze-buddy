<template>
  <div class="wind-container container" :class="{ 'container-dark': !isDay }">
    <div class="wind-caption">{{ t.wind }}</div>
    <div class="wind-container-inner">
      <div class="wind-values">
        <div class="wind" id="wind">
          <div class="value">{{ passWindSpeed }}</div>
          <div class="caption">
            <div class="unit"></div>
            <div class="type"></div>
          </div>
        </div>
        <div class="wind" id="gust">
          <div class="value">{{ passGustSpeed }}</div>
          <div class="caption">
            <div class="unit"></div>
            <div class="type"></div>
          </div>
        </div>
      </div>
      <div class="compass">
        <div class="direction"></div>
        <div class="arrow"></div>
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
      return this.currentWeather[0].hour[this.currentHour][
        `wind_${this.windUnit}`
      ];
    },
    passGustSpeed() {
      console.log(this.currentWeather[0].hour[this.currentHour]);
      return this.currentWeather[0].hour[this.currentHour][
        `gust_${this.windUnit}`
      ];
    },
  },
};
</script>

<style lang="scss" scoped>
.wind-container {
  width: 52rem;
  margin: 1rem 0 2rem 0;
  border-radius: 1.6rem;
  padding: 1rem;
  box-shadow: 0.1rem 0.2rem 0.3rem rgba(0, 0, 0, 0.1);
  user-select: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.wind-caption {
  position: relative;
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  text-shadow: 0.1rem 0.1rem 0.1rem rgba(0, 0, 0, 0.2);
  font-weight: bold;
  margin: 0.1rem 0.3rem 0.3rem 1.3rem;
  opacity: 0.8;
}

.wind-container-inner {
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

//@media

@media only screen and (max-width: 1000px) {
  .wind-container {
    width: 28rem;
  }
}

@media only screen and (max-width: 600px) {
  .wind-container {
    width: 20rem;
  }
}
</style>
