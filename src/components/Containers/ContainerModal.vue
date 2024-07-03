<template>
  <div class="modal-outer" @click="() => this.$emit('toggle-modal')">
    <div class="container" :class="{ 'container-dark': !isDay }" @click.stop="">
      <div class="header" v-if="$slots.header"><slot name="header"></slot></div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  emits: ["toggle-modal"],
  inject: ["isDay"],
  data() {
    return {
      backgroundDark: false,
    };
  },
};
</script>

<style lang="scss" scoped>
$font-color: rgb(240, 240, 240);

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
  cursor: default;
  user-select: none;
  overflow: auto;
  backdrop-filter: blur(2px);
}

.container {
  position: fixed;
  width: 60rem;
  max-height: 90dvh;
  top: 6rem;
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

.container-dark {
  background-image: linear-gradient(
    30deg,
    rgb(22, 56, 107) 0%,
    rgb(35, 67, 94) 100%
  ) !important;
}
.header {
  position: relative;
  font-size: 1.4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  text-shadow: 0.1rem 0.1rem 0.1rem rgba(0, 0, 0, 0.2);
  font-weight: bold;
  margin: 0.3rem 0.3rem 0.3rem 0.3rem;
  opacity: 0.8;
}

//@media

@media only screen and (max-width: 1000px) {
  .container {
    width: 36rem;
  }
}

@media only screen and (max-width: 600px) {
  .container {
    top: 3rem;
    width: 22rem;
  }
}
</style>
