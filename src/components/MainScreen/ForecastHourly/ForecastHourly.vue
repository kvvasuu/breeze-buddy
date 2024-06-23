<template>
  <ContainerBig>
    <div class="date-time">
      <div class="day">{{ t.today }}</div>
      <div class="date">{{ passCurrentDate }}</div>
    </div>
    <hr />
    <div
      class="hours-container"
      v-dragscroll.x:nochilddrag
      v-on:dragscrollstart="grabCursor"
      v-on:dragscrollend="grabCursor"
    >
      <Hour
        v-for="(hour, index) in pass24Hours"
        :hour="hour"
        :key="index"
        :actual="index === 0"
        :sunset-or-sunrise="hour.type === 'sunset' || hour.type === 'sunrise'"
        :iconSrc="passIconSrc(hour)"
      ></Hour>
    </div>
  </ContainerBig>
</template>

<script>
import { timeConversion, iconMap } from "../../../functions";
import Hour from "./Hour.vue";

export default {
  components: {
    Hour,
  },
  props: ["weather"],
  inject: ["isDay", "t", "localTime"],
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
      return `${this.t.months[this.months[month]]}, ${day}`;
    },

    pass24Hours() {
      if (this.weather !== undefined) {
        const currentHour = this.localTime.split(" ")[1].split(":")[0];

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

          tempHours[i] = tempHours[i].toSpliced(Number(sunriseHour) + 1, 0, {
            time: `${sunriseHour}:${sunriseMinute}`,
            type: "sunrise",
          });
          tempHours[i] = tempHours[i].toSpliced(Number(sunsetHour) + 2, 0, {
            time: `${sunsetHour}:${sunsetMinute}`,
            type: "sunset",
          });
        }

        tempHours = tempHours[0].concat(tempHours[1]);
        let indexOfCurrentHour = tempHours
          .map((el) => el.time.split(" ")[1])
          .indexOf(timeConversion(currentHour));
        return tempHours.slice(indexOfCurrentHour, indexOfCurrentHour + 24);
      } else return [];
    },
  },
  methods: {
    grabCursor() {
      if (document.body.style.cursor === "grab") {
        document.body.style.cursor = "default";
      } else document.body.style.cursor = "grab";
    },
    passIconSrc(hour) {
      if (hour.condition !== undefined) {
        let iconName = iconMap[hour.condition.code];
        if (hour.is_day === 0) {
          iconName++;
        }
        return new URL(`../../../assets/icons/${iconName}.png`, import.meta.url)
          .href;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
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
</style>
