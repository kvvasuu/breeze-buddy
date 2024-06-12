<template>
  <div class="main-container">
    <div class="inside-container">
      <WeatherDisplay></WeatherDisplay>
      <ForecastHourly></ForecastHourly>
      <ForecastWeekly></ForecastWeekly>
    </div>
  </div>
</template>

<script>
import ForecastHourly from "./ForecastHourly/ForecastHourly.vue";
import ForecastWeekly from "./ForecastWeekly/ForecastWeekly.vue";
import WeatherDisplay from "./WeatherDisplay.vue";

export default {
  components: {
    WeatherDisplay,
    ForecastHourly,
    ForecastWeekly,
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.main-container {
  position: relative;
  width: 100%;

  background-image: linear-gradient(
    160deg,
    rgba(0, 116, 184, 0.3) 0%,
    rgba(107, 173, 166, 0.3) 100%
  );
  border-radius: inherit;
  box-shadow: 0.2rem 1rem 2rem rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
}
.inside-container {
  height: 96%;
  width: 96%;
  overflow-x: hidden;
  overflow-y: auto;
  background-color: transparent;
  border-radius: inherit;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
