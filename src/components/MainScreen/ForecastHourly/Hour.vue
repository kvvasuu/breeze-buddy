<template>
  <div v-if="!sunsetOrSunrise">
    <div class="hour-container" :class="isNow">
      <div class="time">{{ passTime }}</div>
      <div class="icon-container">
        <img class="icon" :src="iconSrc" draggable="false" />
      </div>
      <div class="temperature">{{ passTemp }}</div>
    </div>
  </div>
  <div v-else>
    <div class="hour-container sun">
      <div class="time">{{ hour.time }}</div>
      <div class="icon-container">
        <img class="icon" :src="sunsetOrSunriseIcon" draggable="false" />
      </div>
      <div class="sunset-or-sunrise">{{ sunsetOrSunriseCheck }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["hour", "actual", "sunsetOrSunrise", "iconSrc"],
  inject: ["isDay", "t", "tempUnit"],
  computed: {
    passTime() {
      if (!this.sunsetOrSunrise) {
        return this.actual
          ? this.t.now
          : this.hour.time.split(" ")[1].split(":")[0];
      }
    },

    passTemp() {
      if (!this.sunsetOrSunrise) {
        return Math.round(this.hour[`temp_${this.tempUnit}`]);
      }
    },
    sunsetOrSunriseCheck() {
      return this.hour.type === "sunrise" ? this.t.sunrise : this.t.sunset;
    },
    isNow() {
      if (this.actual) return "now";
    },
    sunsetOrSunriseIcon() {
      if (this.hour.type === "sunrise") {
        return new URL(`../../../assets/icons/400.png`, import.meta.url).href;
      } else
        return new URL(`../../../assets/icons/401.png`, import.meta.url).href;
    },
  },
};
</script>

<style lang="scss" scoped>
.hour-container {
  min-width: 4.3rem;
  margin: 1rem 0.6rem 1rem 0.6rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.sun {
  margin: 1rem 2rem 1rem 2rem;
}

.now {
  .time {
    font-weight: bold;
  }
}

.icon {
  height: 2rem;
  filter: drop-shadow(0.1rem 0.2rem 0.2rem rgba(0, 0, 0, 0.2));
  margin: 1rem;
  filter: brightness(110%);
}

.temperature {
  position: relative;
  font-size: 1.8rem;
  text-shadow: 0.1rem 0.1rem 0.2rem rgba(0, 0, 0, 0.3);
}

.temperature::after {
  position: absolute;
  content: "\00B0";
}

.sunset-or-sunrise {
  position: relative;
  font-size: 1.8rem;
  text-shadow: 0.1rem 0.1rem 0.2rem rgba(0, 0, 0, 0.3);
}

//@media
@media only screen and (max-width: 1000px) {
  .hour-container {
    min-width: 4.8rem;
  }
}

@media only screen and (max-width: 600px) {
  .hour-container {
    min-width: 3.2rem;
  }
  .icon {
    height: 1.6rem;
    margin: 0.6rem;
  }
  .temperature {
    font-size: 1rem;
  }
  .sunset-or-sunrise {
    font-size: 1rem;
  }
}
</style>
