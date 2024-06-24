<template>
  <ContainerSmall>
    <template #header>
      {{ t.pressure }}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        fill="currentColor"
        class="header-icon"
      >
        <path
          d="M0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm320 96c0-26.9-16.5-49.9-40-59.3V88c0-13.3-10.7-24-24-24s-24 10.7-24 24V292.7c-23.5 9.5-40 32.5-40 59.3c0 35.3 28.7 64 64 64s64-28.7 64-64zM144 176a32 32 0 1 0 0-64 32 32 0 1 0 0 64zm-16 80a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm288 32a32 32 0 1 0 0-64 32 32 0 1 0 0 64zM400 144a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"
        />
      </svg>
    </template>
    <div class="container-inner">
      <div class="gauge">
        <img src="../../assets/pressure-gauge.png" :class="{ dark: !isDay }" />
        <div class="indicator">
          <img
            src="../../assets/indicator.png"
            alt=""
            :style="{ rotate: passPressureDegree }"
            :class="{ dark: !isDay }"
          />
        </div>
        <div class="value">
          {{ passPressure }}
          <div class="value-unit">{{ passPressureUnit }}</div>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 384 512"
          fill="currentColor"
          id="arrow-up"
        >
          <path
            d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z"
          />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 384 512"
          fill="currentColor"
          id="arrow-down"
        >
          <path
            d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"
          />
        </svg>
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
    passPressureDegree() {
      return (this.currentWeather.pressure_mb - 1000) * 1.4 + "deg";
    },
    passPressureUnit() {
      return this.pressureUnit === "mb" ? "hPa" : "inHg";
    },
  },
};
</script>

<style lang="scss" scoped>
.header-icon {
  position: absolute;
  height: 0.8rem;
  width: 1rem;
  left: -1.3rem;
  filter: drop-shadow(0.1rem 0.1rem 0.1rem rgba(0, 0, 0, 0.2));
  margin: 0 0 0.1rem 0;
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
    filter: brightness(95%);
    &.dark {
      filter: brightness(90%);
    }
  }
  .value {
    position: absolute;
    top: calc(50% - 2.2rem);
    left: calc(50% - 2rem);
    height: 4rem;
    width: 4rem;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    font-family: Helvetica Bold;
    letter-spacing: 1px;
    font-size: 1.2rem;
    .value-unit {
      font-size: 0.7rem;
      text-shadow: 0.1rem 0.1rem 0.1rem rgba(0, 0, 0, 0.1);
      font-weight: bold;
      opacity: 0.8;
    }
  }
  .indicator {
    height: 10rem;
    width: 10rem;
    position: relative;
    img {
      position: absolute;
      top: 0;
      left: calc(50% - 0.1rem);
      height: 5rem;
      width: auto;
      transform-origin: bottom;
      rotate: -140deg;
      filter: brightness(110%) drop-shadow(0 0 0.06rem rgb(255, 255, 255));
      &.dark {
        filter: brightness(90%);
      }
    }
  }
  svg {
    position: absolute;
    height: 1rem;
    width: 1rem;
    opacity: 0.8;
    bottom: 0.2rem;
  }
  #arrow-up {
    right: 25%;
  }
  #arrow-down {
    left: 25%;
  }
}

//@media

@media only screen and (max-width: 600px) {
  .gauge {
    height: 8rem;
    width: 8rem;
    img {
      height: 8rem;
      width: 8rem;
    }
    .indicator {
      height: 8rem;
      width: 8rem;
      img {
        height: 4rem;
        width: auto;
      }
    }
    svg {
      height: 0.8rem;
      width: 0.8rem;
    }
  }
}
</style>
