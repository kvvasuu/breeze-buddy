<template>
  <div class="modal-outer" @click="() => this.$emit('toggle-settings')">
    <div
      class="settings-container"
      :class="{ 'settings-container-dark': !isDay }"
      @click.stop=""
    >
      <div class="settings-container-inner">
        <div class="title">{{ t.settings }}</div>
        <div class="units">
          <div class="temperature-unit unit-select">
            <div class="caption">{{ t.temperature }}</div>
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
                <label for="c" class="label">{{ t.celsius }} (&deg;C)</label>
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
                <label for="f" class="label">{{ t.farenheit }} (&deg;F)</label>
              </div>
            </div>
          </div>
          <div class="wind-unit unit-select">
            <div class="caption">{{ t.wind }}</div>
            <div class="unit-select-unit-inner">
              <div class="input-group">
                <input
                  type="radio"
                  id="kph"
                  name="wind"
                  value="kph"
                  @click="changeWindUnit"
                  v-model="wind_unit"
                  checked
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
                  checked
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
        </div>
      </div>
      <LanguageSelect
        @language="(lang) => $emit('language', lang)"
      ></LanguageSelect>
    </div>
  </div>
</template>

<script>
import LanguageSelect from "./LanguageSelect.vue";

export default {
  components: {
    LanguageSelect,
  },
  emits: ["toggle-settings", "language", "temp-unit", "wind-unit"],
  inject: ["isDay", "language", "tempUnit", "t", "windUnit"],
  data() {
    return {
      lang: "",
      temp_unit: "",
      wind_unit: "",
    };
  },
  methods: {
    changeTempUnit(event) {
      console.log(event.target.value);
      this.$emit("temp-unit", event.target.value);
    },
    changeWindUnit(event) {
      this.$emit("wind-unit", event.target.value);
    },
  },
  mounted() {
    this.lang = this.language;
    this.temp_unit = this.tempUnit;
    this.wind_unit = this.windUnit;
  },
};
</script>

<style lang="scss" scoped>
$font-color: rgb(240, 240, 240);

.modal-outer {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  cursor: default;
  user-select: none;
}

.settings-container {
  position: absolute;
  width: 60rem;
  top: 8rem;
  height: calc(80dvh);
  background-image: linear-gradient(
    30deg,
    rgb(31, 134, 194) 0%,
    rgb(155, 211, 205) 100%
  );
  border-radius: 2rem;
  box-shadow: 0.2rem 0.2rem 0.3rem rgba(0, 0, 0, 0.2);
  justify-content: space-between;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.6rem 1.6rem 2rem 1.6rem;
  z-index: 10;
  box-sizing: border-box;
}

.settings-container-dark {
  background-image: linear-gradient(
    30deg,
    rgb(22, 56, 107) 0%,
    rgb(35, 67, 94) 100%
  ) !important;
}

.settings-container-inner {
  width: 100%;
}

.title {
  font-size: 1.5rem;
  font-family: "Helvetica Bold";
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 0.6rem;
}

.units {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
}

.unit-select {
  margin: 1rem 0;
  display: flex;
  flex-direction: column;
  width: 100%;
}

.caption {
  font-size: 0.9rem;
  font-family: "Helvetica Bold";
  color: rgba(250, 250, 250, 0.9);
  text-align: left;
  margin: 0 0 0.1rem 1rem;
}

.unit-select-unit-inner {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  border-radius: 1rem;
  box-sizing: border-box;
  box-shadow: 0.1rem 0.1rem 0.3rem rgba(0, 0, 0, 0.2) inset;
  background-image: linear-gradient(
    -30deg,
    rgba(79, 135, 168, 0.1) 0%,
    rgba(66, 141, 134, 0.1) 100%
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
  border-top: 1px solid;
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
    border: none;
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
    &::after {
      content: "";
      position: absolute;
      width: 1rem;
      height: 1rem;
    }
  }
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

@media only screen and (max-width: 1000px) {
  .settings-container {
    width: 36rem;
  }
}

@media only screen and (max-width: 600px) {
  .settings-container {
    top: 7rem;
    width: 20rem;
    .settings-container-inner {
      width: 100%;
    }
  }
  .title {
    font-size: 1.6rem;
  }
  .label {
    font-size: 1.2rem;
    &:checked {
      font-size: 1.3rem;
    }
  }
}
</style>
