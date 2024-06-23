<template>
  <div class="container" :class="{ 'container-dark': !isDay }">
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
  width: 24.5rem;
  max-height: 12.25rem;
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

//@media

@media only screen and (max-width: 1000px) {
  .container {
    width: 28rem;
    margin: 0 0 1rem 0;
  }
}

@media only screen and (max-width: 600px) {
  .container {
    width: 20rem;
  }
}
</style>
