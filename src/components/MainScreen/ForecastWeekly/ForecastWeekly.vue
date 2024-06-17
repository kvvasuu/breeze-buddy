<template>
  <div class="forecast-weekly" :style="{ 'background-image': toggleColor }">
    <div class="forecast-caption">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 448 512"
        fill="currentColor"
      >
        <path
          d="M128 0c17.7 0 32 14.3 32 32V64H288V32c0-17.7 14.3-32 32-32s32 14.3 32 32V64h48c26.5 0 48 21.5 48 48v48H0V112C0 85.5 21.5 64 48 64H96V32c0-17.7 14.3-32 32-32zM0 192H448V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V192zm64 80v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H80c-8.8 0-16 7.2-16 16zm128 0v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H208c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H336zM64 400v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H80c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H208zm112 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H336c-8.8 0-16 7.2-16 16z"
        />
      </svg>
      Forecast ({{ forecast.length }} days)
    </div>
    <div class="days-container">
      <Day
        v-for="(day, index) in forecast"
        :key="index"
        :day="day"
        :dayName="passDayOfWeek(index)"
        :tempMinMax="getMinMaxTemp"
        :actual="index === 0"
        :currentTemp="currentWeather.temp_c"
        :iconSrc="passIconSrc(day)"
      ></Day>
    </div>
  </div>
</template>

<script>
import Day from "./Day.vue";
import { iconMap } from "../../../functions";

export default {
  components: {
    Day,
  },
  props: ["forecast", "currentWeather"],
  inject: ["isDay"],
  data() {
    return {
      currentDate: new Date(),
      daysOfWeek: ["Mon.", "Tue.", "Wed.", "Thu.", "Fri.", "Sat.", "Sun."],
    };
  },
  methods: {
    passDayOfWeek(value) {
      const day = this.currentDate.getDay() - 1;
      if (value === 0) return "Today";
      else return this.daysOfWeek[(value + day) % 7];
    },
    passIconSrc(day) {
      if (day.day.condition !== undefined) {
        let iconName = iconMap[day.day.condition.code];
        return new URL(`../../../assets/icons/${iconName}.png`, import.meta.url)
          .href;
      }
    },
  },
  computed: {
    getMinMaxTemp() {
      const minTemp = Math.round(
        Math.min(
          ...this.forecast.map((el) =>
            Math.min(
              ...el.hour
                .map((hour) => hour.temp_c)
                .filter((el) => el !== undefined)
            )
          )
        )
      );
      const maxTemp = Math.round(
        Math.max(
          ...this.forecast.map((el) =>
            Math.max(
              ...el.hour
                .map((hour) => hour.temp_c)
                .filter((el) => el !== undefined)
            )
          )
        )
      );
      return { minTemp, maxTemp };
    },
    toggleColor() {
      return this.isDay
        ? `linear-gradient(
    30deg,
    rgba(0, 116, 184, 0.5) 0%,
    rgba(107, 173, 166, 0.5) 100%
  )`
        : `linear-gradient(
    30deg,
    rgba(0, 60, 95, 0.5) 0%,
    rgba(62, 99, 95, 0.5) 100%
  )`;
    },
  },
};
</script>

<style lang="scss" scoped>
.forecast-weekly {
  width: 52rem;
  margin: 1rem 0 2rem 0;
  border-radius: 1.6rem;
  padding: 1rem;
  box-shadow: 0.1rem 0.2rem 0.3rem rgba(0, 0, 0, 0.1);
  user-select: none;
}

.forecast-caption {
  position: relative;
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  text-shadow: 0.1rem 0.1rem 0.6rem rgba(0, 0, 0, 0.3);
  font-weight: bold;
  margin: 0.1rem 0.3rem 0.3rem 1.3rem;
  opacity: 0.8;
  svg {
    position: absolute;
    height: 1rem;
    left: -1.3rem;
  }
}

hr {
  border: 0;
  height: 1px;
  background-image: linear-gradient(
    to right,
    rgba(255, 255, 255, 0) 0%,
    rgba(240, 240, 240, 0.5) 10%,
    rgba(240, 240, 240, 0.5) 90%,
    rgba(0, 0, 0, 0) 100%
  );
  margin-bottom: 0;
}

.days-container {
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  margin: 0;
  user-select: none;
}
@media only screen and (max-width: 1000px) {
  .forecast-weekly {
    width: 28rem;
  }
}

@media only screen and (max-width: 600px) {
  .forecast-weekly {
    width: 20rem;
  }
}
</style>
