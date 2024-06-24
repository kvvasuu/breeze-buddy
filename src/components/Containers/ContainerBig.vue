<template>
  <div class="container" :class="{ 'container-dark': !isDay }">
    <div class="header" v-if="$slots.header"><slot name="header"></slot></div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  inject: ["isDay"],
};
</script>

//
<style lang="scss" scoped>
.container {
  width: 52rem;
  margin: 0 0 1rem 0;
  border-radius: 1.6rem;
  padding: 1rem;
  overflow-y: hidden;
  box-shadow: 0.1rem 0.2rem 0.3rem rgba(0, 0, 0, 0.1);
  user-select: none;
  background-image: linear-gradient(
    30deg,
    rgba(0, 116, 184, 0.3) 0%,
    rgba(107, 173, 166, 0.3) 100%
  );
}

.container-dark {
  background-image: linear-gradient(
    30deg,
    rgba(0, 60, 95, 0.5) 0%,
    rgba(62, 99, 95, 0.5) 100%
  );
}

.header {
  position: relative;
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  text-shadow: 0.1rem 0.1rem 0.1rem rgba(0, 0, 0, 0.2);
  font-weight: bold;
  margin: 0.1rem 0.3rem 0.3rem 1.3rem;
  opacity: 0.8;
}
svg {
  position: absolute;
  height: 0.9rem;
  width: 1rem;
  top: 0;
  left: -1.3rem;
  filter: drop-shadow(0.1rem 0.1rem 0.1rem rgba(0, 0, 0, 0.2));
}

//@media

@media only screen and (max-width: 1000px) {
  .container {
    width: 28rem;
  }
}

@media only screen and (max-width: 600px) {
  .container {
    width: 20rem;
  }
}
</style>
