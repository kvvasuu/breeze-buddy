<template>
  <div class="day-container">
    <div class="day">{{ passDayOfWeek }}</div>
    <div class="icon-container">
      <img
        class="icon"
        src="../../../../favicon.png"
        alt="Breeze Buddy"
        draggable="false"
      />
    </div>
    <div class="temperature-range">
      <div class="temperature-low temp">L: 11</div>
      <div class="temperature-high temp">H: 23</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["day"],
  data() {
    return {
      currentDate: new Date(),
      daysOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
    };
  },
  computed: {
    passDayOfWeek() {
      const day = this.currentDate.getDay();
      if (this.day === 0) return "Today";
      else return this.daysOfWeek[(this.day + day) % 7];
    },
  },
};
</script>

<style lang="scss" scoped>
.day-container {
  box-sizing: border-box;
  width: 100%;
  height: 3rem;
  margin: 0.2rem 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid;
  border-image: linear-gradient(
      to right,
      rgba(255, 255, 255, 0) 0%,
      rgba(240, 240, 240, 0.5) 10%,
      rgba(240, 240, 240, 0.5) 90%,
      rgba(0, 0, 0, 0) 100%
    )
    1;
  &:last-of-type {
    border: none;
  }
  padding: 0 0.6rem;
}

.day {
  font-size: 0.9rem;
  min-width: 6rem;
  text-align: left;
}

.icon {
  height: 1.6rem;
  filter: drop-shadow(0.1rem 0.2rem 0.2rem rgba(0, 0, 0, 0.4));
  margin: 1rem;
}
.temperature-range {
  display: flex;
  align-items: center;
  justify-content: center;
  text-shadow: 0.1rem 0.1rem 0.2rem rgba(0, 0, 0, 0.3);
  font-size: 0.8rem;
}

.temp {
  position: relative;
  text-shadow: 0.1rem 0.1rem 0.2rem rgba(0, 0, 0, 0.3);
  margin: 0 1rem 0 1rem;
}

.temp::after {
  position: absolute;
  content: "\00B0";
}
</style>
