<template>
  <ContainerBig>
    <template #header
      ><svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 448 512"
        fill="currentColor"
      >
        <path
          d="M128 0c17.7 0 32 14.3 32 32V64H288V32c0-17.7 14.3-32 32-32s32 14.3 32 32V64h48c26.5 0 48 21.5 48 48v48H0V112C0 85.5 21.5 64 48 64H96V32c0-17.7 14.3-32 32-32zM0 192H448V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V192zm64 80v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H80c-8.8 0-16 7.2-16 16zm128 0v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H208c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H336zM64 400v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H80c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H208zm112 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H336c-8.8 0-16 7.2-16 16z"
        />
      </svg>
      {{ t.forecast }} ({{ forecast.length }} {{ t.days }})
    </template>
    <div class="days-container">
      <Day
        v-for="(day, index) in forecast"
        :key="index"
        :day="day"
        :dayName="passDayOfWeek(index)"
        :tempMinMax="getMinMaxTemp"
        :actual="index === 0"
        :currentTemp="currentWeather[`temp_${$store.state.tempUnit}`]"
        :iconSrc="passIconSrc(day)"
        @toggle-modal="() => $emit('toggle-modal')"
      ></Day>
    </div>
  </ContainerBig>
</template>

<script>
import Day from "./Day.vue";
import { iconMap } from "../../../functions";

export default {
  components: {
    Day,
  },
  props: ["forecast", "currentWeather"],
  inject: ["t"],
  emits: ["toggle-modal"],
  data() {
    return {
      currentDate: new Date(),
      daysOfWeek: [
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
        "sunday",
      ],
    };
  },
  methods: {
    passDayOfWeek(value) {
      const day = this.currentDate.getDay() - 1;
      if (value === 0) return { full: this.t.today, short: this.t.today };
      else
        return {
          full: this.t.daysOfWeek[this.daysOfWeek[(value + day) % 7]],
          short:
            this.t.daysOfWeek[this.daysOfWeek[(value + day) % 7].slice(0, 3)],
        };
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
                .map((hour) => hour[`temp_${this.$store.state.tempUnit}`])
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
                .map((hour) => hour[`temp_${this.$store.state.tempUnit}`])
                .filter((el) => el !== undefined)
            )
          )
        )
      );
      return { minTemp, maxTemp };
    },
  },
};
</script>

<style lang="scss" scoped>
.days-container {
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  margin: 0;
  user-select: none;
}
svg {
  position: absolute;
  height: 0.9rem;
  width: 1rem;
  top: 0;
  left: -1.3rem;
  filter: drop-shadow(0.1rem 0.1rem 0.1rem rgba(0, 0, 0, 0.2));
}
</style>
