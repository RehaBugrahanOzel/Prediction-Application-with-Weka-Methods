<template>
  <HelloWorld msg="WEKA" />
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";

export default {
  name: "App",
  data() {
    return {
      list: [],
    };
  },
  components: {
    HelloWorld,
  },
};
</script>

<style>
body {
  margin: 0;
  padding: 0;
  background-color: #a8dadc;
}
#app {
  background-color: #a8dadc;
  width: 100%;
  top: 0;
  left: 0;
  position: absolute;
  height: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
