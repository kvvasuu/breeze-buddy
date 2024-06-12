<template>
  <div class="forecast-hourly">
    <div class="date-time">
      <div class="day">Today</div>
      <div class="date"></div>
    </div>
    <div class="hours-container"></div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.forecast-hourly {
  width: 100%;
  height: auto;
  margin: 1rem;
}

.location {
  font-size: 1.6rem;
  font-family: "Helvetica Bold";
  text-shadow: 0.1rem 0.1rem 0.6rem rgba(0, 0, 0, 0.3);
}

.icon {
  height: 10rem;
  filter: drop-shadow(0.2rem 1rem 1rem rgba(0, 0, 0, 0.5));
  margin: 2rem;
}

.temperature {
  font-size: 6rem;
  text-shadow: 0.1rem 0.1rem 0.3rem rgba(0, 0, 0, 0.3);
}

.temperature::after {
  position: absolute;
  content: "\00B0";
}

.conditions {
  font-size: 1.6rem;
  text-shadow: 0.1rem 0.1rem 0.3rem rgba(0, 0, 0, 0.3);
  color: rgba(255, 255, 255, 0.7);
}

.temperature-range {
  display: flex;
  align-items: center;
  justify-content: center;
  text-shadow: 0.1rem 0.1rem 0.2rem rgba(0, 0, 0, 0.3);
}

.temp {
  font-size: 1.1rem;
  margin: 0.6rem 1rem 0 1rem;
}
</style>
