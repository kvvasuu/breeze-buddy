<template>
  <div class="forecast-hourly">
    <div class="date-time">
      <div class="day">Today</div>
      <div class="date">{{ passCurrentDate }}</div>
    </div>
    <hr />
    <div
      class="hours-container"
      v-dragscroll.x
      v-on:dragscrollstart="grabCursor"
      v-on:dragscrollend="grabCursor"
    >
      <Hour
        v-for="(hour, index) in pass24Hours"
        :hour="hour"
        :key="index"
        :actual="index === 1"
        :sunset-or-sunrise="hour.type === 'sunset' || hour.type === 'sunrise'"
      ></Hour>
    </div>
  </div>
</template>

<script>
import Hour from "./Hour.vue";

export default {
  components: {
    Hour,
  },
  props: ["weather"],
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

    pass24Hours() {
      if (this.weather !== undefined) {
        const currentHour = this.currentDate.getHours();
        let tempHours = [];
        for (let i = 0; i < 2; i++) {
          tempHours[i] = this.weather[i].hour;

          let sunriseHour = "";
          let sunriseMinute = "";
          if (this.weather[i].astro.sunrise.split(" ")[1] === "PM") {
            sunriseHour =
              Number(this.weather[i].astro.sunrise.split(":")[0]) + 12;
            sunriseMinute = this.weather[i].astro.sunrise
              .split(" ")[0]
              .split(":")[1];
          } else {
            sunriseHour = this.weather[i].astro.sunrise.split(":")[0];
            sunriseMinute = this.weather[i].astro.sunrise
              .split(" ")[0]
              .split(":")[1];
          }

          let sunsetHour = "";
          let sunsetMinute = "";
          if (this.weather[i].astro.sunset.split(" ")[1] === "PM") {
            sunsetHour =
              Number(this.weather[i].astro.sunset.split(":")[0]) + 12;
            sunsetMinute = this.weather[i].astro.sunset
              .split(" ")[0]
              .split(":")[1];
          } else {
            sunsetHour = Number(this.weather[i].astro.sunset.split(":")[0]);
            sunsetMinute = this.weather[i].astro.sunset
              .split(" ")[0]
              .split(":")[1];
          }

          tempHours[i].splice(Number(sunriseHour) + 1, 0, {
            time: `${sunriseHour}:${sunriseMinute}`,
            type: "sunrise",
          });
          tempHours[i].splice(Number(sunsetHour) + 2, 0, {
            time: `${sunsetHour}:${sunsetMinute}`,
            type: "sunset",
          });
        }
        tempHours = tempHours[0]
          .concat(tempHours[1])
          .slice(currentHour, currentHour + 26);
        return tempHours;
      } else return [];
    },
  },
  methods: {
    grabCursor() {
      if (document.body.style.cursor === "grab") {
        document.body.style.cursor = "default";
      } else document.body.style.cursor = "grab";
    },
  },
};
</script>

<style lang="scss" scoped>
.forecast-hourly {
  width: 52rem;
  margin: 0;
  border-radius: 1.6rem;
  background-image: linear-gradient(
    30deg,
    rgba(0, 116, 184, 0.5) 0%,
    rgba(107, 173, 166, 0.5) 100%
  );
  padding: 1rem;
  overflow-y: hidden;
  box-shadow: 0.1rem 0.2rem 0.6rem rgba(0, 0, 0, 0.2);
  user-select: none;
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
  cursor: grab;
}

//@media

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
