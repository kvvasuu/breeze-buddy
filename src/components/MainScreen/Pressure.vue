<template>
  <ContainerSmall>
    <div class="caption">
      {{ t.pressure }}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        fill="currentColor"
      >
        <path
          d="M0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm320 96c0-26.9-16.5-49.9-40-59.3V88c0-13.3-10.7-24-24-24s-24 10.7-24 24V292.7c-23.5 9.5-40 32.5-40 59.3c0 35.3 28.7 64 64 64s64-28.7 64-64zM144 176a32 32 0 1 0 0-64 32 32 0 1 0 0 64zm-16 80a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm288 32a32 32 0 1 0 0-64 32 32 0 1 0 0 64zM400 144a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"
        />
      </svg>
    </div>
    <div class="container-inner">
      <div class="gauge">
        <div class="value">{{ passPressure }}</div>
      </div>
    </div>
  </ContainerSmall>
</template>

<script>
export default {
  inject: ["isDay", "t", "pressureUnit"],
  props: ["currentWeather"],
  computed: {
    passPressure() {
      return this.pressureUnit === "mb"
        ? this.currentWeather.pressure_mb
        : this.currentWeather.pressure_in;
    },
  },
};
</script>

<style lang="scss" scoped>
.caption {
  position: relative;
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  text-shadow: 0.1rem 0.1rem 0.1rem rgba(0, 0, 0, 0.2);
  font-weight: bold;
  opacity: 0.8;
  margin: 0.1rem 0.3rem 0.3rem 1.3rem;
  svg {
    position: absolute;
    height: 0.8rem;
    width: 1rem;
    left: -1.3rem;
    filter: drop-shadow(0.1rem 0.1rem 0.1rem rgba(0, 0, 0, 0.2));
  }
}

.container-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid;
  margin-bottom: -1rem;
  padding: 0.8rem 0 1rem 0;
  border-image: linear-gradient(
      to right,
      rgba(255, 255, 255, 0) 0%,
      rgba(240, 240, 240, 0.5) 10%,
      rgba(240, 240, 240, 0.5) 90%,
      rgba(0, 0, 0, 0) 100%
    )
    1;
}

.gauge {
  position: relative;
  height: 10rem;
  width: 10rem;
  margin: auto;
  img {
    position: absolute;
    top: 0;
    left: 0;
    height: 10rem;
    width: 10rem;
    filter: brightness(170%);
    &.dark {
      filter: brightness(130%);
    }
  }
  .value {
    position: absolute;
    top: calc(50% - 2rem);
    left: calc(50% - 2rem);
    height: 4rem;
    width: 4rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: Helvetica Bold;
    letter-spacing: 1px;
  }
}

.indicator {
  position: absolute;
  height: 10rem;
  width: 10rem;
}

//@media

@media only screen and (max-width: 1000px) {
}

@media only screen and (max-width: 600px) {
}
</style>
