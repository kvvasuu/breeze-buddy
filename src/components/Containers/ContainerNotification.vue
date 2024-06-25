<template>
  <div class="container" :class="{ 'container-dark': !isDay }">
    <div class="content"><slot name="header"></slot></div>
    <div class="info" v-if="$slots.info"><slot name="info"></slot></div>
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
  position: absolute;
  top: 2rem;
  width: 28rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: auto;
  border-radius: 3rem;
  padding: 1rem;
  box-shadow: 0.1rem 0.2rem 0.3rem rgba(0, 0, 0, 0.2);
  user-select: none;
  background-image: linear-gradient(
    30deg,
    rgb(100, 171, 180) 0%,
    rgb(85, 151, 163) 100%
  );
  z-index: 10;
}

.container-dark {
  background-image: linear-gradient(
    -70deg,
    rgba(0, 60, 95, 1) 0%,
    rgba(62, 99, 95, 1) 100%
  );
}

.content {
  font-size: 1.2rem;
  font-family: Helvetica Bold;
}

.info {
  font-size: 0.8rem;
  margin: 0.2rem 0 0 0;
}

//@media

@media only screen and (max-width: 600px) {
  .container {
    width: 20rem;
  }
}
</style>
