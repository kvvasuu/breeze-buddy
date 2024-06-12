<template>
  <div class="forecast-hourly">
    <div class="date-time">
      <div class="day">Today</div>
      <div class="date">{{ passCurrentDate }}</div>
    </div>
    <hr />
    <div class="hours-container show-scrollbar" v-dragscroll.x>
      <Hour v-for="(hour, index) in 12" :hour="index"></Hour>
    </div>
  </div>
</template>

<script>
import Hour from "./Hour.vue";

export default {
  components: {
    Hour,
  },
  data() {
    return {
      currentDate: new Date(),
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
    passCurrentDate() {
      const day = this.currentDate.getDate();
      const month = this.currentDate.getMonth();
      return `${this.months[month]}, ${day}`;
    },
  },
};
</script>

<style lang="scss" scoped>
.forecast-hourly {
  width: 52rem;
  height: auto;
  margin: 2rem;
  border-radius: 1.6rem;
  background-image: linear-gradient(
    30deg,
    rgba(0, 116, 184, 0.3) 0%,
    rgba(107, 173, 166, 0.3) 100%
  );
  padding: 1rem;
  overflow-y: hidden;
}

.date-time {
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-shadow: 0.1rem 0.1rem 0.6rem rgba(0, 0, 0, 0.3);
  font-weight: bold;
  margin: 0.1rem 0.3rem 0.3rem 0.3rem;
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
}

.hours-container {
  overflow-x: hidden;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin: 0 -1rem 0 -1rem;
  user-select: none;
}
@media only screen and (max-width: 1000px) {
  .forecast-hourly {
    width: 28rem;
  }
}

@media only screen and (max-width: 600px) {
  .forecast-hourly {
    width: 20rem;
  }
}
</style>
