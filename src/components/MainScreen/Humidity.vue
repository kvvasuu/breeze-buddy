<template>
  <ContainerSmall>
    <template #header>
      {{ $store.getters.t.humidity }}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 384 512"
        fill="currentColor"
        class="header-icon"
      >
        <path
          d="M192 512C86 512 0 426 0 320C0 228.8 130.2 57.7 166.6 11.7C172.6 4.2 181.5 0 191.1 0h1.8c9.6 0 18.5 4.2 24.5 11.7C253.8 57.7 384 228.8 384 320c0 106-86 192-192 192zM96 336c0-8.8-7.2-16-16-16s-16 7.2-16 16c0 61.9 50.1 112 112 112c8.8 0 16-7.2 16-16s-7.2-16-16-16c-44.2 0-80-35.8-80-80z"
        />
      </svg>
    </template>
    <div class="container-inner">
      <div class="value">{{ currentWeather.humidity }}%</div>
      <div class="dewpoint">
        <div class="temperature">
          {{ $store.getters.t.dewpoint + ": " + passDewPoint }}
        </div>
      </div>
    </div>
  </ContainerSmall>
</template>

<script>
export default {
  props: ["currentWeather"],
  computed: {
    passDewPoint() {
      return this.$store.state.tempUnit === "c"
        ? Math.round(this.currentWeather.dewpoint_c)
        : Math.round(this.currentWeather.dewpoint_f);
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
  flex-direction: column;
  border-top: 1px solid;
  margin-bottom: -1rem;
  padding: 0.8rem 0 1rem 0;
  height: 10rem;
  border-image: linear-gradient(
      to right,
      rgba(255, 255, 255, 0) 0%,
      rgba(240, 240, 240, 0.5) 10%,
      rgba(240, 240, 240, 0.5) 90%,
      rgba(0, 0, 0, 0) 100%
    )
    1;
}

.value {
  font-size: 2rem;
  text-shadow: 0.1rem 0.1rem 0.1rem rgba(0, 0, 0, 0.1);
  width: 100%;
  display: inherit;
  text-align: left;
}

.dewpoint {
  font-size: 1rem;
  text-shadow: 0.1rem 0.1rem 0.1rem rgba(0, 0, 0, 0.1);
  width: 100%;
  display: inherit;
  text-align: left;
  .temperature {
    position: relative;
    &:after {
      position: absolute;
      content: "\00B0";
    }
  }
}

//@media

@media only screen and (max-width: 600px) {
  .container-inner {
    height: 8rem;
  }
}
</style>
