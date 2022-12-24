<template>
  <div v-for="item in attributes" :key="item.id">
    <div class="date" v-if="item.type === 'nominal'">
      <div class="container">
        <button class="element" @click.stop="item.flag = !item.flag">
          {{ item.name }}
        </button>
        <vue-dropdown
          v-if="item.flag"
          :selectList="item.attributes"
          @change="
            (e) => {
              this.selectedList[item.id].attribute = e;
              item.flag = false;
            }
          "
          @close="item.flag = false"
        ></vue-dropdown>
      </div>
      <div class="element" v-if="selectedList[item.id].attribute !== ''">
        {{ selectedList[item.id].attribute }}
      </div>
    </div>
    <div class="date" v-else-if="item.type === 'numeric'">
      <div class="element">{{ item.name }}</div>
      <input
        class="element"
        v-model="this.selectedList[item.id].attribute"
        placeholder="Enter a numeric value"
      />
    </div>
  </div>
  <button class="element" @click="submit" :disabled="!isSubmitActive.flag">
    submit
  </button>
</template>

<script>
import VueDropdown from "./vue-dropdown.vue";

export default {
  components: {
    VueDropdown,
  },
  name: "InputForm",
  props: {
    attributes: Array,
  },
  data() {
    return {
      isMenu: false,
      selected: null,
      actions: [],
      selectedList: [],
      condition: false,
      condition2: true,
    };
  },
  created() {
    let i = 0;
    this.attributes.forEach((item) => {
      this.selectedList[i] = {
        id: item.id,
        name: item.name,
        type: item.type,
        attribute: "",
      };
      i += 1;
    });
    console.log(
      "reha ~ file: InputForm.vue:63 ~ this.attributes.forEach ~ this.selectedList",
      this.selectedList
    );
    console.log(
      "reha ~ file: InputForm.vue:70 ~ this.attributes.forEach ~ this.attributes",
      this.attributes
    );
  },
  computed: {
    submitList() {
      return this.selectedList;
    },
    isSubmitActive() {
      console.log("submitList", this.selectedList);
      // this.selectedList.forEach((item) => {
      // console.log("conditions", this.condition, this.condition2);
      // if (item.attribute !== "") {
      //   this.condition = true;
      // } else {
      //   this.condition = false;
      //   this.condition2 = false;
      // }
      // });

      if (
        this.selectedList.every((el) => {
          if (el.attribute === "") {
            return false;
          }
          return true;
        })
      ) {
        return {
          flag: true,
        };
      } else {
        return {
          flag: false,
        };
      }
    },
    output() {
      return null;
    },
  },
  // computed: {
  //   actions () {
  //     return
  //   }
  // }
  methods: {
    submit() {
      this.$emit("configureList", this.selectedList);
    },
  },
};
</script>

<style>
.container {
  font-weight: bold;
  padding: 0 5px;
  position: relative;
}
.element {
  border-color: black;
  font-weight: bold;
  background-color: #457b9d;
  width: fit-content;
  padding: 5px;
  border-radius: 8px;
  margin: 10px;
  border: solid;
}
.date {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
}
input::placeholder {
  color: #2c3e50;
}
</style>
