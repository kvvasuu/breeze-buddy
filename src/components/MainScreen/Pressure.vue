<template>
  <ContainerSmall>
    <div class="wind-caption">
      {{ t.pressure }}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        fill="currentColor"
      >
        <path
          d="M0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm320 96c0-26.9-16.5-49.9-40-59.3V88c0-13.3-10.7-24-24-24s-24 10.7-24 24V292.7c-23.5 9.5-40 32.5-40 59.3c0 35.3 28.7 64 64 64s64-28.7 64-64zM144 176a32 32 0 1 0 0-64 32 32 0 1 0 0 64zm-16 80a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm288 32a32 32 0 1 0 0-64 32 32 0 1 0 0 64zM400 144a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"
        />
      </svg>
    </div>
  </ContainerSmall>
</template>

<script>
export default {
  inject: ["isDay", "t"],
};
</script>

<style lang="scss" scoped>
.wind-caption {
  position: relative;
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  text-shadow: 0.1rem 0.1rem 0.1rem rgba(0, 0, 0, 0.2);
  font-weight: bold;
  opacity: 0.8;
  margin: 0.1rem 0.3rem 0.3rem 1.3rem;
  svg {
    position: absolute;
    height: 0.8rem;
    width: 1rem;
    left: -1.3rem;
    filter: drop-shadow(0.1rem 0.1rem 0.1rem rgba(0, 0, 0, 0.2));
  }
}

.wind-container-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid;
  margin-bottom: -1rem;
  padding: 0.8rem 0 1rem 0;
  border-image: linear-gradient(
      to right,
      rgba(255, 255, 255, 0) 0%,
      rgba(240, 240, 240, 0.5) 10%,
      rgba(240, 240, 240, 0.5) 90%,
      rgba(0, 0, 0, 0) 100%
    )
    1;
}
.wind-values {
  width: 12rem;
}

.wind {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  min-width: 8rem;
  .value {
    font-size: 2.2rem;
    min-width: 2.6rem;
    margin: 0.4rem 0.4rem 0.4rem 0;
    text-shadow: 0.1rem 0.1rem 0.1rem rgba(0, 0, 0, 0.1);
  }
  &:first-of-type {
    border-bottom: 1px solid;
    border-image: linear-gradient(
        to right,
        rgba(255, 255, 255, 0) 0%,
        rgba(240, 240, 240, 0.5) 10%,
        rgba(240, 240, 240, 0.5) 90%,
        rgba(0, 0, 0, 0) 100%
      )
      1;
  }
  .caption {
    text-align: left;
    .unit {
      font-size: 0.7rem;
      text-shadow: 0.1rem 0.1rem 0.1rem rgba(0, 0, 0, 0.1);
      font-weight: bold;
      opacity: 0.8;
    }
    .type {
      font-size: 0.9rem;
      text-shadow: 0.1rem 0.1rem 0.1rem rgba(0, 0, 0, 0.1);
      font-weight: bold;
    }
  }
}

.compass {
  position: relative;
  height: 10rem;
  width: 10rem;
  img {
    position: absolute;
    top: 0;
    left: 0;
    height: 10rem;
    width: 10rem;
    filter: brightness(170%);
    &.dark {
      filter: brightness(130%);
    }
  }
  .direction {
    position: absolute;
    top: calc(50% - 2rem);
    left: calc(50% - 2rem);
    height: 4rem;
    width: 4rem;
    background-color: rgb(155, 209, 212);
    border-radius: 10rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: Helvetica Bold;
    letter-spacing: 1px;
  }
  .direction-dark {
    background-color: rgb(74, 118, 129);
  }
}

.arrow {
  height: 10rem;
  width: 10rem;
  img {
    position: absolute;
    top: calc(50% - 4.85rem);
    left: calc(50% - 1rem);
    height: 9.7rem;
    width: 2rem;
    transform-origin: center;
    rotate: 0;
    &.dark {
      filter: brightness(90%);
    }
  }
}

//@media

@media only screen and (max-width: 1000px) {
}

@media only screen and (max-width: 600px) {
}
</style>
