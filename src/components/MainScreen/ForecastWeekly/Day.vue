<template>
  <div class="day-container">
    <div class="day">{{ day }}</div>
    <div class="icon-container">
      <img
        class="icon"
        src="../../../../favicon.png"
        alt="Breeze Buddy"
        draggable="false"
      />
    </div>
    <div class="temperature">2{{ day }}</div>
  </div>
</template>

<script>
export default {
  props: ["day"],
};
</script>

<style lang="scss" scoped>
.day-container {
  box-sizing: border-box;
  width: 100%;
  height: 3rem;
  margin: 0.2rem 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid;
  border-image: linear-gradient(
      to right,
      rgba(255, 255, 255, 0) 0%,
      rgba(240, 240, 240, 0.5) 10%,
      rgba(240, 240, 240, 0.5) 90%,
      rgba(0, 0, 0, 0) 100%
    )
    1;
  &:last-of-type {
    border: none;
  }
  padding: 0 1.6rem;
}

.icon {
  height: 1.6rem;
  filter: drop-shadow(0.1rem 0.2rem 0.2rem rgba(0, 0, 0, 0.4));
  margin: 1rem;
}

.temperature {
  position: relative;
  font-size: 1rem;
  text-shadow: 0.1rem 0.1rem 0.2rem rgba(0, 0, 0, 0.3);
}

.temperature::after {
  position: absolute;
  content: "\00B0";
}
</style>
