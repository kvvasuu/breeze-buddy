<template>
  <div class="forecast-weekly">
    <div class="forecast-caption">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 448 512"
        fill="currentColor"
      >
        <path
          d="M128 0c17.7 0 32 14.3 32 32V64H288V32c0-17.7 14.3-32 32-32s32 14.3 32 32V64h48c26.5 0 48 21.5 48 48v48H0V112C0 85.5 21.5 64 48 64H96V32c0-17.7 14.3-32 32-32zM0 192H448V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V192zm64 80v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H80c-8.8 0-16 7.2-16 16zm128 0v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H208c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H336zM64 400v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H80c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H208zm112 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H336c-8.8 0-16 7.2-16 16z"
        />
      </svg>
      Forecast (10 days)
    </div>
    <hr />
    <div class="days-container">
      <Day v-for="(day, index) in 10" :day="index"></Day>
    </div>
  </div>
</template>

<script>
import Day from "./Day.vue";

export default {
  components: {
    Day,
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.forecast-weekly {
  width: 52rem;
  margin: 2rem 0 2rem 0;
  border-radius: 1.6rem;
  background-image: linear-gradient(
    30deg,
    rgba(0, 116, 184, 0.3) 0%,
    rgba(107, 173, 166, 0.3) 100%
  );
  padding: 1rem;
}

.forecast-caption {
  position: relative;
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  text-shadow: 0.1rem 0.1rem 0.6rem rgba(0, 0, 0, 0.3);
  font-weight: bold;
  margin: 0.1rem 0.3rem 0.3rem 1.3rem;
  opacity: 0.8;
  svg {
    position: absolute;
    height: 1rem;
    left: -1.3rem;
  }
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
  margin-bottom: 0;
}

.days-container {
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  margin: 0;
  user-select: none;
}
@media only screen and (max-width: 1000px) {
  .forecast-weekly {
    width: 28rem;
  }
}

@media only screen and (max-width: 600px) {
  .forecast-weekly {
    width: 20rem;
  }
}
</style>
