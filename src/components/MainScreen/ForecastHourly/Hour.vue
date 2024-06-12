<template>
  <div class="hour-container">
    <div class="time">{{ hour }}</div>
    <div class="icon-container">
      <img
        class="icon"
        src="../../../../public/favicon.png"
        alt="Breeze Buddy"
        draggable="false"
      />
    </div>
    <div class="temperature">2{{ hour }}&deg</div>
  </div>
</template>

<script>
export default {
  props: ["hour"],
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
  font-size: 2rem;
  text-shadow: 0.1rem 0.1rem 0.2rem rgba(0, 0, 0, 0.3);
}
</style>
