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
      <div class="temperature-low temp">{{ passMinTemp }}</div>
      <div class="temperature-range-bar">
        <div class="bar-track">
          <div class="bar-thumb">
            <div v-show="actual" class="actual"></div>
          </div>
        </div>
      </div>
      <div class="temperature-high temp">{{ passMaxTemp }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["day", "dayName", "tempMinMax", "actual"],
  data() {
    return {};
  },
  computed: {
    passMinTemp() {
      console.log(this.tempMinMax);
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
  min-width: 3rem;
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
  justify-content: space-between;
  min-width: 9rem;
  text-shadow: 0.1rem 0.1rem 0.2rem rgba(0, 0, 0, 0.3);
  font-size: 0.8rem;
  margin: 0 0.4rem 0 1rem;
  .temperature-range-bar {
    .bar-track {
      position: relative;
      height: 0.3rem;
      width: 5rem;
      background-image: linear-gradient(
        30deg,
        rgba(107, 160, 173, 0.7) 0%,
        rgba(107, 173, 166, 0.7) 100%
      );
      border-radius: 1rem;
    }
    .bar-thumb {
      position: absolute;
      height: 0.32rem;
      top: -0.01rem;
      left: 1rem;
      width: 3rem;
      background: rgb(145, 240, 255);
      background: linear-gradient(
        90deg,
        hsl(188, 80%, 50%) 20%,
        hsl(58, 71%, 56%) 50%,
        hsl(27, 80%, 61%) 90%
      );
      border-radius: 1rem;
      box-shadow: 0 0.04rem 0.04rem rgba(0, 0, 0, 0.2);
      .actual {
        content: "";
        position: absolute;
        background-color: white;
        border-radius: 1rem;
        width: 0.3rem;
        height: 0.3rem;
      }
    }
  }
}

.conditions {
  display: flex;
  align-items: center;
  justify-content: center;
  text-shadow: 0.1rem 0.1rem 0.2rem rgba(0, 0, 0, 0.3);
  font-size: 0.8rem;
}

.temp {
  position: relative;
  text-shadow: 0.1rem 0.1rem 0.2rem rgba(0, 0, 0, 0.3);

  &.temperature-low {
    width: 2rem;
    text-align: right;
    margin: 0 1rem 0 0;
  }
  &.temperature-high {
    width: 2rem;
    text-align: left;
    margin: 0 0 0 0.6rem;
  }
}

.temp::after {
  position: absolute;
  content: "\00B0";
}
</style>
