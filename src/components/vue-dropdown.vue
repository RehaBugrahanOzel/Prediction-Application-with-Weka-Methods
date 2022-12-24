<template>
  <div ref="dropdown" class="vue-dropdown">
    <span
      @click="$emit('change', item)"
      v-for="(item, index) in array"
      :key="item.value"
      :id="index + '-' + 'item'"
      :class="{ active: index == currentIndex }"
      class="vue-dropdown-item"
      >{{ item }}</span
    >
  </div>
</template>

<script>
export default {
  name: "VueDropdown",
  props: {
    selectList: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      array: this.selectList,
      currentIndex: -1,
    };
  },
  methods: {
    documentClick(e) {
      try {
        let el = this.$refs.dropdown;
        let target = e.target;
        if (el !== target && !el.contains(target)) {
          this.$emit("close");
        }
        // eslint-disable-next-line no-empty
      } catch (error) {}
    },
    captureKey(e) {
      let key = e.key;
      if (key == "ArrowDown") this.step(1);
      if (key == "ArrowUp") this.step(-1);
      if (key == "Enter") this.select(e);
    },
    step(step) {
      let max = this.array.length - 1;
      // eslint-disable-next-line no-unused-vars
      let min = 0;
      if (this.currentIndex == 0 && step < 0) {
        this.currentIndex = max;
        this.scrollView();
        return;
      }
      if (this.currentIndex >= max) {
        this.currentIndex = 0;
        this.scrollView();
        return;
      }
      if (this.currentIndex <= max) {
        this.currentIndex += step;
        this.scrollView();
      }
    },
    select(e) {
      this.$emit("change", this.array[this.currentIndex]);
      e.preventDefault();
    },
    scrollView() {
      let element = document.getElementById(this.currentIndex + "-item");
      if (element)
        element.scrollIntoView({
          block: "nearest",
          inline: "start",
        });
    },
  },
  beforeMount() {
    document.addEventListener("click", this.documentClick);
    document.addEventListener("keydown", this.captureKey);
  },
  beforeUnmount() {
    document.removeEventListener("click", this.documentClick);
    document.removeEventListener("keydown", this.captureKey);
  },
};
</script>

<style scoped lang="scss">
.vue-dropdown {
  font-weight: bold;
  background-color: white;
  padding: 5px;
  border-radius: 8px;
  border: solid;
  margin: 10px;
  left: 50%;
  transform: translate(-50%, 0);

  position: absolute;
  width: 100%;
  height: auto;
  max-width: 226px;
  max-height: 250px;
  overflow: auto;
  top: 2rem;
  box-shadow: 0 0 5px 1px #00000025;
  z-index: 1;
  .vue-dropdown-item {
    display: inline-block;
    width: calc(100% - 2 * 0.5rem);
    padding: 0.5rem;
    margin: auto;
    border-radius: 0.5rem;
    cursor: pointer;
    &:hover {
      background-color: #457b9d;
    }
    &.active {
      background-color: #457b9d;
    }
  }
}
</style>
