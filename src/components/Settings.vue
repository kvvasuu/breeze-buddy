<template>
  <ContainerModal @toggle-modal="() => this.$emit('toggle-modal')">
    <div class="settings-container-inner">
      <div class="title">{{ $store.getters.t.settings }}</div>
      <div class="units">
        <div class="temperature-unit unit-select">
          <div class="caption">
            {{ $store.getters.t.temperature }}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 320 512"
              fill="currentColor"
            >
              <path
                d="M160 64c-26.5 0-48 21.5-48 48V276.5c0 17.3-7.1 31.9-15.3 42.5C86.2 332.6 80 349.5 80 368c0 44.2 35.8 80 80 80s80-35.8 80-80c0-18.5-6.2-35.4-16.7-48.9c-8.2-10.6-15.3-25.2-15.3-42.5V112c0-26.5-21.5-48-48-48zM48 112C48 50.2 98.1 0 160 0s112 50.1 112 112V276.5c0 .1 .1 .3 .2 .6c.2 .6 .8 1.6 1.7 2.8c18.9 24.4 30.1 55 30.1 88.1c0 79.5-64.5 144-144 144S16 447.5 16 368c0-33.2 11.2-63.8 30.1-88.1c.9-1.2 1.5-2.2 1.7-2.8c.1-.3 .2-.5 .2-.6V112zM208 368c0 26.5-21.5 48-48 48s-48-21.5-48-48c0-20.9 13.4-38.7 32-45.3V272c0-8.8 7.2-16 16-16s16 7.2 16 16v50.7c18.6 6.6 32 24.4 32 45.3z"
              />
            </svg>
          </div>
          <div class="unit-select-unit-inner">
            <div class="input-group">
              <input
                type="radio"
                id="c"
                name="temperature"
                value="c"
                @click="changeTempUnit"
                v-model="temp_unit"
              />
              <label for="c" class="label"
                >{{ $store.getters.t.celsius }} (&deg;C)</label
              >
            </div>
            <div class="input-group">
              <input
                type="radio"
                id="f"
                name="temperature"
                value="f"
                @click="changeTempUnit"
                v-model="temp_unit"
              />
              <label for="f" class="label"
                >{{ $store.getters.t.farenheit }} (&deg;F)</label
              >
            </div>
          </div>
        </div>
        <div class="wind-unit unit-select">
          <div class="caption">
            {{ $store.getters.t.wind }}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              fill="currentColor"
            >
              <path
                d="M288 32c0 17.7 14.3 32 32 32h32c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H352c53 0 96-43 96-96s-43-96-96-96H320c-17.7 0-32 14.3-32 32zm64 352c0 17.7 14.3 32 32 32h32c53 0 96-43 96-96s-43-96-96-96H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H384c-17.7 0-32 14.3-32 32zM128 512h32c53 0 96-43 96-96s-43-96-96-96H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H160c17.7 0 32 14.3 32 32s-14.3 32-32 32H128c-17.7 0-32 14.3-32 32s14.3 32 32 32z"
              />
            </svg>
          </div>
          <div class="unit-select-unit-inner">
            <div class="input-group">
              <input
                type="radio"
                id="kph"
                name="wind"
                value="kph"
                @click="changeWindUnit"
                v-model="wind_unit"
              />
              <label for="kph" class="label">km/h</label>
            </div>
            <div class="input-group">
              <input
                type="radio"
                id="ms"
                name="wind"
                value="ms"
                @click="changeWindUnit"
                v-model="wind_unit"
              />
              <label for="ms" class="label">m/s</label>
            </div>
            <div class="input-group">
              <input
                type="radio"
                id="mph"
                name="wind"
                value="mph"
                @click="changeWindUnit"
                v-model="wind_unit"
              />
              <label for="mph" class="label">mph</label>
            </div>
          </div>
        </div>
        <div class="pressure-unit unit-select">
          <div class="caption">
            {{ $store.getters.t.pressure }}
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
          <div class="unit-select-unit-inner">
            <div class="input-group">
              <input
                type="radio"
                id="mb"
                name="pressure"
                value="mb"
                @click="changePressureUnit"
                v-model="pressure_unit"
              />
              <label for="mb" class="label"
                >{{ $store.getters.t.hectopascal }} (hPa)</label
              >
            </div>
            <div class="input-group">
              <input
                type="radio"
                id="in"
                name="pressure"
                value="in"
                @click="changePressureUnit"
                v-model="pressure_unit"
              />
              <label for="in" class="label"
                >{{ $store.getters.t.inchesOfMercury }} (inHg)</label
              >
            </div>
          </div>
        </div>
      </div>
    </div>
    <LanguageSelect
      @language="(lang) => $emit('language', lang)"
    ></LanguageSelect>
  </ContainerModal>
</template>

<script>
import LanguageSelect from "./LanguageSelect.vue";
import ContainerModal from "./Containers/ContainerModal.vue";

export default {
  components: {
    LanguageSelect,
    ContainerModal,
  },
  emits: ["toggle-modal"],
  data() {
    return {
      lang: this.$store.state.lang,
      temp_unit: this.$store.state.tempUnit,
      wind_unit: this.$store.state.windUnit,
      pressure_unit: this.$store.state.pressureUnit,
    };
  },
  methods: {
    changeTempUnit(event) {
      this.$store.commit("changeTempUnit", event.target.value);
      localStorage.setItem("tempUnit", this.$store.state.tempUnit);
    },
    changeWindUnit(event) {
      this.$store.commit("changeWindUnit", event.target.value);
      localStorage.setItem("windUnit", this.$store.state.windUnit);
    },
    changePressureUnit(event) {
      this.$store.commit("changePressureUnit", event.target.value);
      localStorage.setItem("pressureUnit", this.$store.state.pressureUnit);
    },
  },
};
</script>

<style lang="scss" scoped>
$font-color: rgb(240, 240, 240);

.settings-container-inner {
  width: 100%;
}

.title {
  font-size: 1.3rem;
  font-family: "Helvetica Bold";
  text-transform: uppercase;
  letter-spacing: 1px;
  margin: 0 0 0.6rem 0.8rem;
  text-shadow: 0.1rem 0.1rem 0.3rem rgba(0, 0, 0, 0.3);
}

.units {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
}

.unit-select {
  margin: 0 0 1rem 0;
  display: flex;
  flex-direction: column;
  width: 100%;
}

.caption {
  position: relative;
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  text-shadow: 0.1rem 0.1rem 0.1rem rgba(0, 0, 0, 0.2);
  font-weight: bold;
  opacity: 0.8;
  margin: 0 0 0.2rem 2rem;
  svg {
    position: absolute;
    height: 0.8rem;
    width: 1rem;
    left: -1.3rem;
    filter: drop-shadow(0.1rem 0.1rem 0.1rem rgba(0, 0, 0, 0.2));
  }
}

.unit-select-unit-inner {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  border-radius: 1rem;
  box-sizing: border-box;

  background-image: linear-gradient(
    -30deg,
    rgba(79, 135, 168, 0.2) 0%,
    rgba(66, 141, 134, 0.2) 100%
  );
  padding: 1rem;
}

.input-group {
  display: flex;
  align-items: left;
  justify-content: flex-start;
  flex-direction: column;
  width: 100%;
  padding: 0.5rem 0 0.5rem 0;
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
    padding-top: 0;
  }
  &:last-of-type {
    padding-bottom: 0;
    border: none;
  }
}

.label {
  transition: all 0.5s ease;
  cursor: pointer;
  font-size: 1.4rem;
  color: rgba(250, 250, 250, 0.3);
  text-align: left;
}
input {
  position: absolute;
  &:checked + .label {
    color: $font-color;
    font-size: 1.4rem;
  }
}

.language-container {
  margin: 6rem 0 0 0;
}

//Transitions

@keyframes fade {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

//@media

@media only screen and (max-width: 600px) {
  .settings-container-inner {
    width: 100%;
  }

  .title {
    font-size: 1.4rem;
  }
  .label {
    font-size: 1rem;
    &:checked {
      font-size: 1.1rem;
    }
  }
  input {
    &:checked + .label {
      font-size: 1.1rem;
    }
  }

  .language-container {
    margin: 3rem 0 0 0;
  }
}
</style>
