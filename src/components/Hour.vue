<template>
  <div class="hour-container">
    <div class="time">11.00</div>
    <div class="icon-container">
      <img
        class="icon"
        src="../../favicon.png"
        alt="Breeze Buddy"
        draggable="false"
      />
    </div>
    <div class="temperature">20</div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.hour-container {
  width: auto;
  height: auto;
  margin: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.icon {
  height: 2rem;
  filter: drop-shadow(0.2rem 1rem 1rem rgba(0, 0, 0, 0.5));
  margin: 1rem;
}

.temperature {
  font-size: 6rem;
  text-shadow: 0.1rem 0.1rem 0.3rem rgba(0, 0, 0, 0.3);
}
</style>
