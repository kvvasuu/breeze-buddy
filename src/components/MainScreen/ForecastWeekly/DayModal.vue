<template>
  <ContainerModal @toggle-modal="() => this.$emit('toggle-modal')">
    <div class="container-inner">
      <div class="title">{{ dayName }}</div>
    </div>
  </ContainerModal>
</template>

<script>
import ContainerModal from "../../Containers/ContainerModal.vue";

export default {
  components: {
    ContainerModal,
  },
  emits: ["toggle-modal"],
  props: ["weather", "dayName"],
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
$font-color: rgb(240, 240, 240);

.container-inner {
  width: 100%;
}

.title {
  font-size: 1.3rem;
  font-family: "Helvetica Bold";
  text-transform: uppercase;
  letter-spacing: 1px;
  margin: 0 0 0.6rem 0.8rem;
  text-shadow: 0.1rem 0.1rem 0.3rem rgba(0, 0, 0, 0.3);
}
//@media

@media only screen and (max-width: 600px) {
  .container-inner {
    width: 100%;
  }
  .title {
    font-size: 1.4rem;
  }
}
</style>
