<template>
  <div class="hour-container">
    <div class="time">{{ passTime }}</div>
    <div class="icon-container">
      <img
        class="icon"
        src="../../../assets/favicon.png"
        alt="Breeze Buddy"
        draggable="false"
      />
    </div>
    <div class="temperature">{{ passTemp }}</div>
  </div>
</template>

<script>
export default {
  props: ["hour"],
  computed: {
    passTime() {
      return this.hour.time.split(" ")[1];
    },
    passTemp() {
      return Math.round(this.hour.temp_c);
    },
  },
};
</script>

<style lang="scss" scoped>
.hour-container {
  min-width: 4.3rem;
  margin: 1rem 0.6rem 1rem 0.6rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.icon {
  height: 2rem;
  filter: drop-shadow(0.1rem 0.2rem 0.2rem rgba(0, 0, 0, 0.4));
  margin: 1rem;
}

.temperature {
  position: relative;
  font-size: 1.8rem;
  text-shadow: 0.1rem 0.1rem 0.2rem rgba(0, 0, 0, 0.3);
}

.temperature::after {
  position: absolute;
  content: "\00B0";
}
</style>
