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
  margin: 0.2rem 2;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 0.8rem;
  background-image: linear-gradient(
    30deg,
    rgba(0, 116, 184, 0.3) 0%,
    rgba(107, 173, 166, 0.3) 100%
  );
  &:nth-of-type(even) {
    background-image: linear-gradient(
      180deg,
      rgba(0, 116, 184, 0.3) 0%,
      rgba(107, 173, 166, 0.3) 100%
    );
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
