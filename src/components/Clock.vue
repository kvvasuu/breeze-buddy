<template>
  <div class="clock">
    {{ passTime }}
  </div>
</template>

<script>
export default {
  props: ["time"],
  data() {
    return {
      localTime: "",
      intervalID: 0,
      seconds: new Date().getSeconds(),
      minutes: this.time[1],
      hours: this.time[0],
    };
  },
  methods: {
    updateTime() {
      this.seconds++;
      if (this.seconds >= 60) {
        this.seconds = 0;
        this.minutes++;
      }
      if (this.minutes >= 60) {
        this.minutes = 0;
        this.hours++;
      }
      if (this.hours >= 24) {
        this.hours = 0;
      }
      this.localTime =
        this.zeroPadding(this.hours) +
        ":" +
        this.zeroPadding(this.minutes) +
        ":" +
        this.zeroPadding(this.seconds);
    },
    zeroPadding(num) {
      let zero = "";
      for (let i = 0; i < 2; i++) {
        zero += "0";
      }
      return (zero + num).slice(-2);
    },
  },
  computed: {
    passTime() {
      console.log(this.time);
      return this.localTime;
    },
  },
  mounted() {
    this.updateTime();
    this.intervalID = setInterval(() => {
      this.updateTime();
    }, 1000);
  },
  beforeUnmount() {
    clearInterval(this.intervalID);
  },
};
</script>

<style lang="scss" scoped>
.clock {
  height: 1rem;
  font-size: 0.7rem;
  opacity: 0.86;
  text-shadow: 0.1rem 0.1rem 0.3rem rgba(0, 0, 0, 0.3);
  user-select: none;
}
</style>
