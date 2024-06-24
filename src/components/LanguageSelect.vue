<template>
  <div class="language-container">
    <label for="en" class="label">
      <input
        type="radio"
        id="en"
        name="language"
        value="en"
        @click="changeLanguage"
        v-model="lang"
      />
      <img src="../assets/icons/lang-en.png" draggable="false" alt="EN" />
    </label>

    <label for="pl" class="label">
      <input
        type="radio"
        id="pl"
        name="language"
        value="pl"
        @click="changeLanguage"
        v-model="lang"
      />
      <img src="../assets/icons/lang-pl.png" draggable="false" alt="PL" />
    </label>

    <label for="de" class="label">
      <input
        type="radio"
        id="de"
        name="language"
        value="de"
        @click="changeLanguage"
        v-model="lang"
      />
      <img src="../assets/icons/lang-de.png" draggable="false" alt="DE" />
    </label>
  </div>
</template>

<script>
export default {
  emits: ["language"],
  inject: ["language"],
  data() {
    return {
      lang: "",
    };
  },
  methods: {
    changeLanguage(event) {
      this.$emit("language", event.target.value);
    },
  },
  mounted() {
    this.lang = this.language;
  },
};
</script>

<style lang="scss" scoped>
.language-container {
  margin: 1rem 0 0 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.label {
  margin: 0 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: all 1s ease;
  position: relative;
  cursor: pointer;
  :hover ~ img {
    filter: drop-shadow(0.1rem 0.2rem 0.2rem rgba(0, 0, 0, 0.3));
  }
  img {
    transition: all 0.4s ease;
    width: 3rem;
  }
  input:checked ~ img {
    translate: 0px -0.26rem;
  }

  input:checked::after {
    content: "";
    position: absolute;
    width: 2rem;
    height: 10%;
    left: calc(50% - 1rem);
    bottom: 1rem;
    border-radius: 50%;
    z-index: -1;
    box-shadow: 0 1.3rem 0.2rem rgba(0, 0, 0, 0.3);
    animation: fade 0.3s;
  }
}

@keyframes fade {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
