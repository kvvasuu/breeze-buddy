<template>
  <div v-if="!isSunsetOrSunrise">
    <div class="hour-container">
      <div class="time">{{ passTime }}</div>
      <div class="icon-container">
        <img
          class="icon"
          src="../../../assets/favicon.png"
          alt="Breeze Buddy"
          draggable="false"
        />
      </div>
      <div class="temperature">{{ passTemp }}</div>
    </div>
  </div>
  <div v-else>
    <div class="hour-container sun">
      <div class="time">{{ hour.time }}</div>
      <div class="icon-container">
        <img
          class="icon"
          src="../../../assets/favicon.png"
          alt="Breeze Buddy"
          draggable="false"
        />
      </div>
      <div class="sunset-or-sunrise">{{ sunsetOrSunrise }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["hour"],
  data() {
    return {
      isSunsetOrSunrise: false,
    };
  },
  computed: {
    passTime() {
      if (!this.isSunsetOrSunrise) {
        return this.hour.time.split(" ")[1].split(":")[0];
      }
    },
    passTemp() {
      if (!this.isSunsetOrSunrise) {
        return Math.round(this.hour.temp_c);
      }
    },
    sunsetOrSunrise() {
      return this.hour.type === "sunrise" ? "Sunrise" : "Sunset";
    },
  },
  beforeMount() {
    if (this.hour.type !== undefined) {
      this.isSunsetOrSunrise = true;
    }
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

.icon {
  height: 2rem;
  filter: drop-shadow(0.1rem 0.2rem 0.2rem rgba(0, 0, 0, 0.4));
  margin: 1rem;
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

@media only screen and (max-width: 600px) {
  .hour-container {
    min-width: 3rem;
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
