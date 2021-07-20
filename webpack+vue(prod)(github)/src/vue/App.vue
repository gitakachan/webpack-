<template>
  <div>
    <h1>{{ msg }}</h1>
    <button>click</button>
    <div>jahahaaaaaa!!!</div>
    <Cpn></Cpn>
  </div>
</template>
<script>
import Cpn from "./Cpn.vue";

export default {
  name: "App",
  data() {
    return {
      msg: "hello",
    };
  },
  components: {
    Cpn,
  },
};
</script>
<style lang="scss">
@import url("../scss/main.scss");
</style>
