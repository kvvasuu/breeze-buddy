<template>
  <ContainerModal @toggle-modal="() => this.$emit('toggle-modal')">
    <template #header>
      <div class="day-name">{{ dayName.full }}</div>
      <div class="day-date">{{ passDate }}</div>
    </template>
    <div class="container-inner">
      <div class="icon-container">
        <img class="icon" :src="passIconSrc" draggable="false" />
        <div class="conditions">
          {{ weather.day.condition.text }}
        </div>
      </div>

      <div class="temperature">
        {{ passTemperature }}
      </div>

      <div class="temp-range">
        <div class="temp">{{ t.low }}: {{ passMinTemp }}</div>
        <div class="temp">{{ t.high }}: {{ passMaxTemp }}</div>
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
  inject: ["isDay", "t", "tempUnit"],
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
    passMinTemp() {
      return Math.round(this.weather.day[`mintemp_${this.tempUnit}`]);
    },
    passMaxTemp() {
      return Math.round(this.weather.day[`maxtemp_${this.tempUnit}`]);
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

.icon {
  height: 12rem;
  filter: drop-shadow(0.2rem 0.4rem 0.2rem rgba(0, 0, 0, 0.2));
  margin: 1rem;
  filter: brightness(110%);
}

.temperature {
  position: relative;
  font-size: 6rem;
  text-shadow: 0.1rem 0.1rem 0.2rem rgba(0, 0, 0, 0.3);
  &:after {
    position: absolute;
    font-size: 5rem;
    content: "\00B0";
  }
}

.conditions {
  font-size: 1.4rem;
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
