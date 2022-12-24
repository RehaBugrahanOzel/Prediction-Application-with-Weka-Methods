<template>
  <div class="hello">
    <p class="element">{{ msg }}</p>
    <div class="date">
      Choose a arff file path:
      <input
        class="element"
        id="browse"
        type="file"
        accept=".arff"
        @change="browse"
        @click="closeInputSection"
      />
    </div>
    <div class="element" v-if="isUploadSuccess">
      best algorithm result is: {{ bestResult }}
    </div>
    <input-form
      v-if="formActive"
      :attributes="liste"
      @configure-list="configureList"
    ></input-form>
    <div class="element" v-if="isResultReady">Result is: {{ wekaResult }}</div>
    <!-- <div class="element">
      You entered this values <br />
      Country is: {{ this.inputMessage.params.country }}<br />Product is:
      {{ this.inputMessage.params.food }}<br />Month is:
      {{ this.inputMessage.params.month }}<br />Year is:
      {{ this.inputMessage.params.year }}
    </div> -->
    <!-- <div class="element">
      You entered this values <br />
      Country is: {{ this.inputMessage.params.country }}<br />Product is:
      {{ this.inputMessage.params.food }}<br />Month is:
      {{ this.inputMessage.params.month }}<br />Year is:
      {{ this.inputMessage.params.year }}
    </div> -->
  </div>
</template>

<script>
import axios from "axios";
import InputForm from "./InputForm.vue";

export default {
  emits: ["configureList"],
  components: {
    InputForm,
  },
  name: "HelloWorld",
  props: {
    msg: String,
  },
  data() {
    return {
      country: "",
      product: "",
      year: "",
      month: "",
      countries: [],
      products: [],
      selected: null,
      selected1: null,
      isMenu: false,
      isMenu1: false,
      isCountryExist: false,
      isSubmit: false,
      result: "",
      attributesList: ["a1", "a2", "a3", "a4", "a5"],
      File: null,
      isFileSelected: false,
      liste: [],
      attributesReady: false,
      isDataReady: false,
      i: 0,
      submitList: [],
      condition: false,
      condition2: true,
      resultReady: false,
      upladSuccess: false,
      bestAlgorithmResponse: "",
    };
  },
  watch: {
    selected: {
      handler(val) {
        this.products = [];
        this.selected1 = null;
        if (val && val !== "" && this.countries.includes(val)) {
          this.isCountryExist = true;
        } else {
          this.isCountryExist = false;
        }
        console.log("ikinci menu açı?", this.isCountryExist);
        console.log(this.selected);
        // axios
        //   .get(
        //     "http://127.0.0.1:5000/" +
        //       "country/" +
        //       this.selected.text +
        //       "/foods"
        //   )
        //   .then((response) => {
        //     const json = JSON.parse(response.data).foods;
        //     this.products = json;
        //     let temp = [];
        //     let i = 1;
        //     this.products.forEach((item) => {
        //       temp[i - 1] = { text: item, value: i };
        //       i += 1;
        //     });
        //     this.products = temp;
        //     console.log("food list", this.products);
        //     // var json = JSON.parse(response);
        //     // this.countries = JSON.parse(json["countries"]);
        //   });
      },
    },
    attributesReady: {
      handler(val) {
        if (val === true) {
          this.getValues();
          this.attributesReady = false;
          console.log("attributes ready", this.attributesReady);
        }
      },
    },
  },
  mounted() {
    // axios.get("http://127.0.0.1:5000/countries").then((response) => {
    //   const json = JSON.parse(response.data).countries;
    //   this.countries = json;
    //   let temp = [];
    //   let i = 1;
    //   this.countries.forEach((item) => {
    //     temp[i - 1] = { text: item, value: i };
    //     i += 1;
    //   });
    //   this.countries = temp;
    //   console.log("contry list", this.countries);
    //   // var json = JSON.parse(response);
    //   // this.countries = JSON.parse(json["countries"]);
    // });
  },
  computed: {
    bestResult() {
      return this.bestAlgorithmResponse;
    },
    formActive() {
      return this.isDataReady;
    },
    wekaResult() {
      return this.result;
    },
    isResultReady() {
      return this.resultReady;
    },
    isUploadSuccess() {
      return this.upladSuccess;
    },
    // inputMessage() {
    //   return {
    //     params: {
    //       country: this.countryName.text,
    //       food: this.foodName.text,
    //       year: this.yearValue.value,
    //       month: this.monthValue.value,
    //     },
    //   };
    // },
    // countryName() {
    //   return {
    //     text:
    //       this.selected !== null
    //         ? this.selected.text
    //         : "Please select a country",
    //   };
    // },
    // foodName() {
    //   return {
    //     text:
    //       this.selected1 !== null
    //         ? this.selected1.text
    //         : "Please select a food",
    //   };
    // },
    // yearValue() {
    //   return {
    //     value:
    //       Math.sign(parseInt(this.year)) === 1
    //         ? Number.isInteger(parseInt(this.year))
    //           ? this.year
    //           : "Please enter a valid year value!"
    //         : "Please enter a valid year value!",
    //   };
    // },
    // monthValue() {
    //   return {
    //     value:
    //       Math.sign(parseInt(this.month)) === 1
    //         ? Number.isInteger(parseInt(this.month))
    //           ? this.month > 0 && this.month < 13
    //             ? this.month
    //             : "Please enter a valid month value!"
    //           : "Please enter a valid month value!"
    //         : "Please enter a valid month value!",
    //   };
    // },
    output() {
      return null;
    },
  },
  methods: {
    closeInputSection() {
      this.isDataReady = false;
      this.upladSuccess = false;
      this.resultReady = false;
    },
    async bestAlgorithm() {
      axios.get("http://localhost:8082/best-algorithm").then(
        (response) => {
          this.bestAlgorithmResponse = response.data;
          this.upladSuccess = true;
        },
        (error) => {
          console.log("something bad happened --> ", error);
        }
      );
    },
    async configureList(list) {
      this.submitList = list;
      console.log(
        "reha ~ file: HelloWorld.vue:218 ~ configure ~ this.submitList",
        this.submitList
      );
      const json = {};
      this.submitList.forEach((item) => {
        json[`"${item.name}"`] = item.attribute;
      });
      console.log(
        "reha ~ file: HelloWorld.vue:205 ~ this.submitList.forEach ~ json",
        json
      );
      axios.post("http://localhost:8082/result", json).then(
        (response) => {
          console.log("response of submit ", response);
          this.result = JSON.stringify(response.data);
          this.resultReady = true;
        },
        (error) => {
          console.log("something bad happened --> ", error);
        }
      );
    },
    async browse(browse) {
      console.log("reha ~ file: HelloWorld.vue:208 ~ browse ~ browse", browse);
      this.File = browse.target.files[0];
      const formData = new FormData();
      formData.append("file", this.File, this.File.name);
      axios.post("http://localhost:8082/upload", formData).then(
        (response) => {
          console.log("-response of browse-", response);
          this.isFileSelected = true;
          this.bestAlgorithm();
          this.getAttributes();
        },
        (error) => {
          console.log("something bad happened --> ", error);
        }
      );
    },
    async getAttributes() {
      axios.get("http://localhost:8082/attributes").then(
        (response) => {
          let i = 0;
          response.data.forEach((element) => {
            this.liste[i] = {
              id: element.id,
              name: element.name,
              type: element.type,
            };
            i += 1;
          });
          this.attributesReady = true;
        },
        (error) => {
          console.log("something bad happened --> ", error);
        }
      );
    },

    async getValues() {
      this.liste.forEach((item) => {
        if (item.type === "nominal") {
          axios.get("http://localhost:8082/" + item.name + "/values").then(
            (response) => {
              console.log("response of getValues data", response.data);
              this.liste[item.id] = {
                id: item.id,
                name: item.name,
                type: item.type,
                attributes: response.data,
                flag: false,
              };
              console.log(
                "reha ~ file: HelloWorld.vue:240 ~ getAttributes ~ liste",
                this.liste
              );
              if (item.id === this.liste.length - 1) {
                this.isDataReady = true;
                console.log(
                  "reha ~ file: HelloWorld.vue:258 ~ this.liste.forEach ~ isDataReady",
                  this.isDataReady
                );
              }
            },
            (error) => {
              console.log("something bad happened --> ", error);
            }
          );
        } else {
          this.liste[item.id] = {
            id: item.id,
            name: item.name,
            type: item.type,
            attributes: "",
            flag: false,
          };
          if (item.id === this.liste.length - 1) {
            this.isDataReady = true;
            console.log(
              "reha ~ file: HelloWorld.vue:258 ~ this.liste.forEach ~ isDataReady",
              this.isDataReady
            );
          }
        }
      });
    },

    // async submit() {
    //   if (
    //     Number.isInteger(parseInt(this.monthValue.value)) &&
    //     Number.isInteger(parseInt(this.yearValue.value))
    //   ) {
    //     let result = await axios.get(
    //       "http://127.0.0.1:5000/app",
    //       this.inputMessage
    //     );

    //     console.log(
    //       "submitted",
    //       JSON.stringify(JSON.parse(result).results.xgb_train_score)
    //     );
    //     this.isSubmit = true;
    //   } else {
    //     this.isSubmit = false;
    //   }
    //   console.log("submitted", this.inputMessage);
    // },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.hello {
  position: absolute;
  left: 50%;
  top: 0;
  transform: translate(-50%, 0);
  border-radius: 20px;
  background-color: #f1faee;
  padding: 50px;
  margin: 50px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-size: calc(8px + 1vw);
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
input::placeholder {
  color: #2c3e50;
}
.container {
  font-weight: bold;
  padding: 0 65px;
  position: relative;
}
.date {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
}
</style>
