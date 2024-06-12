<template>
  <div class="weather-display">
    <div class="location">My Location</div>
    <div class="icon-container">
      <img
        class="icon"
        src="../../assets/favicon.png"
        alt="Breeze Buddy"
        draggable="false"
      />
    </div>
    <div class="temperature">19</div>
    <div class="conditions">Mostly Clear</div>
    <div class="temperature-range">
      <div class="temperature-low temp">L: 11&deg</div>
      <div class="temperature-high temp">H: 23&deg</div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.weather-display {
  width: auto;
  height: auto;
  margin: 2rem 1rem 1rem 1rem;
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
  position: relative;
  font-size: 6rem;
  text-shadow: 0.1rem 0.1rem 0.3rem rgba(0, 0, 0, 0.3);
}

.temperature::after {
  position: absolute;
  font-size: 5rem;
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
