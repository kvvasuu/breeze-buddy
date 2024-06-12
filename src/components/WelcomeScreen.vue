<template>
  <div class="welcome-container">
    <div class="logo-container">
      <img
        class="logo"
        src="../assets/favicon.png"
        alt="Breeze Buddy"
        draggable="false"
      />
      <div class="title">Breeze Buddy</div>
    </div>
    <button class="button-1" @click="welcomeScreenHide">Get start!</button>
  </div>
</template>

<script>
export default {
  emits: ["welcome-screen-toggle"],
  methods: {
    welcomeScreenHide() {
      this.$emit("welcome-screen-toggle");
    },
  },
};
</script>

<style lang="scss" scoped>
$font-color-second: rgb(36, 36, 36);

.welcome-container {
  color: $font-color-second;
  width: 100%;
  height: 100%;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  perspective: 1000px;
}

.logo-container {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  -webkit-appearance: none;
  .logo {
    height: 16rem;
    filter: drop-shadow(0.2rem 1rem 0.6rem rgba(0, 0, 0, 0.3));
    margin: 2rem;
    transition: all 0.6s ease;
    animation: tilt 1.2s ease;
    animation-delay: 1.2s;
  }
  .logo:hover {
    transform: rotate(3deg);
  }
  .title {
    margin: 4rem 0 0 0;
    font-size: 2.5rem;
    font-weight: bold;
    font-family: "Helvetica Black";
    text-shadow: 0.1rem 0.1rem 0.2rem rgba(0, 0, 0, 0.3);
  }
}

.button-1 {
  font-size: 1.6rem;
  font-weight: bold;
  font-family: "Helvetica Black";
  letter-spacing: 1px;
  padding: 1rem 3rem 1rem 3rem;
  border-radius: 10rem;
  border: none;
  background: rgb(255, 210, 0);
  margin: 2rem;
  box-shadow: 0.2rem 0.3rem 0.5rem rgba(0, 0, 0, 0.3);
  text-shadow: 0.1rem 0.1rem 0.1rem rgba(0, 0, 0, 0.3);
  cursor: pointer;
  transition: all 0.3s ease;
  -webkit-appearance: none;
}
.button-1:hover {
  transform: translateY(-0.1rem);
  text-shadow: 0.1rem 0.1rem 0.1rem rgba(0, 0, 0, 0.3);
}

//Transitions

@keyframes tilt {
  0% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(3deg);
  }
  100% {
    transform: rotate(0deg);
  }
}
</style>
