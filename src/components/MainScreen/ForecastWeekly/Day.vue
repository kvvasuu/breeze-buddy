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
          <div
            class="bar-thumb"
            :style="{
              left: tempRangePosition + '%',
              width: tempRangeWidth + '%',
              'background-position': thumbPosition + 'px',
            }"
          >
            <div
              v-show="actual"
              class="actual"
              :style="{ left: actualTempIndicatorPosition }"
            ></div>
          </div>
        </div>
      </div>
      <div class="temperature-high temp">{{ passMaxTemp }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["day", "dayName", "tempMinMax", "actual", "currentTemp"],
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
    actualTempIndicatorPosition() {
      if (this.actual) {
        let range = this.passMaxTemp - this.passMinTemp;
        let positionPercent = Math.round(
          (Math.round(this.currentTemp - this.passMinTemp) / range) * 100
        );
        return positionPercent < 50
          ? `${positionPercent}%`
          : `calc(${positionPercent}% - 4.8px)`;
      }
    },
    tempRangeWidth() {
      let range = this.passMaxTemp - this.passMinTemp;
      let fullRange = this.tempMinMax.maxTemp - this.tempMinMax.minTemp;
      return Math.round((range / fullRange) * 100);
    },
    tempRangePosition() {
      let fullRange = this.tempMinMax.maxTemp - this.tempMinMax.minTemp;
      let left = this.passMinTemp - this.tempMinMax.minTemp;
      return Math.round((left / fullRange) * 100);
    },
    thumbPosition() {
      return -(this.tempRangePosition / 100) * 80;
    },
  },
};
</script>

<style lang="scss" scoped>
.day-container {
  font-family: "Helvetica";
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
    font-weight: bold;
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
    cursor: pointer;
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
      background-color: rgba(107, 160, 173, 1);
      border-radius: 1rem;
      overflow: hidden;
    }
    .bar-thumb {
      position: absolute;
      height: 0.3rem;
      width: 3rem;
      background-size: 5rem 1rem;
      border-radius: 1rem;
      box-shadow: 0 0 0.04rem rgba(0, 0, 0, 0.2);
      background: rgb(145, 240, 255);
      background-image: linear-gradient(
        90deg,
        hsl(188, 80%, 50%) 20%,
        hsl(58, 71%, 56%) 50%,
        hsl(27, 80%, 61%) 90%
      );
      background-size: 5rem;
      .actual {
        position: absolute;
        background-color: rgb(250, 250, 250);
        border-radius: 1rem;
        width: 0.3rem;
        height: 0.3rem;
        z-index: 3;
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
