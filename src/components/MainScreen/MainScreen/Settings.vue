<template>
  <div class="modal-outer" @click="() => this.$emit('toggle-settings')">
    <div class="settings-container" @click.stop=""></div>
  </div>
</template>

<script>
export default {
  emits: ["toggle-settings"],
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
$font-color: rgb(250, 250, 250);

.modal-outer {
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  cursor: default;
}

.settings-container {
  position: absolute;
  width: 100%;
  top: 5.4rem;
  height: 100%;
  background-image: linear-gradient(
    160deg,
    rgba(0, 116, 184, 1) 0%,
    rgba(107, 173, 166, 1) 100%
  );
  border-radius: 2rem;
  box-shadow: 0.2rem 0.2rem 0.3rem rgba(0, 0, 0, 0.2);
  justify-content: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem 0 1rem 0;
  z-index: 10;
}

.buttons {
  width: 52rem;
  height: 4rem;
  margin: 1rem 0 0.6rem 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;
}

.icon {
  color: $font-color;
  height: 3rem;
  width: 3rem;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  filter: drop-shadow(0.1rem 0.1rem 0.12rem rgba(0, 0, 0, 0.5));
  cursor: pointer;
  svg {
    height: 2rem;
  }
  &:hover {
    opacity: 1;
    filter: drop-shadow(0.1rem 0.1rem 0.1rem rgba(255, 255, 255, 0.3));
    scale: 1.2;
  }
}

//@media

@media only screen and (max-width: 1000px) {
  .buttons {
    width: 28rem;
  }
}

@media only screen and (max-width: 600px) {
  .buttons {
    width: 20rem;
  }
  .main-container {
    min-height: 100vh;
  }
}
</style>
