<template>
  <div class="day-container">
    <div class="day">{{ dayName }}</div>
    <div class="icon-container">
      <img
        class="icon"
        src="../../../assets/favicon.png"
        alt="Breeze Buddy"
        draggable="false"
      />
    </div>
    <div class="temperature-range">
      <div class="temperature-low temp">L: {{ passMinTemp }}</div>
      <div class="temperature-high temp">H: {{ passMaxTemp }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["day", "dayName"],
  data() {
    return {};
  },
  computed: {
    passMinTemp() {
      return Math.round(this.day.day.mintemp_c);
    },
    passMaxTemp() {
      return Math.round(this.day.day.maxtemp_c);
    },
  },
};
</script>

<style lang="scss" scoped>
.day-container {
  font-family: "Helvetica Bold";
  letter-spacing: 1px;
  box-sizing: border-box;
  width: 100%;
  height: 3.2rem;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  border-bottom: 1px solid;
  border-image: linear-gradient(
      to right,
      rgba(255, 255, 255, 0) 0%,
      rgba(240, 240, 240, 0.5) 10%,
      rgba(240, 240, 240, 0.5) 90%,
      rgba(0, 0, 0, 0) 100%
    )
    1;
  &:first-of-type {
    border-top: 1px solid;
    background-image: linear-gradient(
      to right,
      hsla(0, 0%, 100%, 0) 0%,
      rgba(240, 240, 240, 0.2) 10%,
      rgba(240, 240, 240, 0.2) 90%,
      rgba(0, 0, 0, 0) 100%
    );
  }
  &:last-of-type {
    border: none;
  }
  &:hover {
    background-image: linear-gradient(
      to right,
      hsla(0, 0%, 100%, 0) 0%,
      rgba(240, 240, 240, 0.2) 10%,
      rgba(240, 240, 240, 0.2) 90%,
      rgba(0, 0, 0, 0) 100%
    );
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
