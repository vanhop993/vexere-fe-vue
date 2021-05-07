<template>
  <section>
    <div
      class="form-group position-relative m-0 d-none d-md-block"
      :id="`parent-${idInput}`"
    >
      <input
        class="form-control"
        :id="idInput"
        :class="classMore"
        type="text"
        @focus="handleFocus"
        @blur="handleBlur"
        @input="handleInput"
        @keydown="handleKeyDown"
        v-model="test"
        :placeholder="placehoder"
        autocomplete="off"
        :disabled="statusInput"
      />
    </div>
    <div class="form-group position-relative m-0 d-block d-md-none">
      <input
        class="form-control"
        :class="classMore"
        type="text"
        :placeholder="placehoder"
        v-autoCompleteMobi="handleFocusMobi"
      />
    </div>
  </section>
</template>
<script>
export default {
  props: ["placehoder", "classMore", "idInput", "data","index","attributeName","valueProps","statusInput"],
  data() {
    return {
      openSearchBox: false,
      test: "",
      currentFocus: -1,
    };
  },
  methods: {
    sendValue(id) {
      if(id){
        this.$emit("event-value", this.attributeName ,id,false,this.index);
      }else{
        this.$emit("event-value", this.attributeName ,id,true,this.index);
      }
    },
    renderData(data, inp, parentElement, mobile) {
      this.sortData(data);
      let boxFocus = document.createElement("DIV");
      if (!mobile) {
        boxFocus.setAttribute("id", this.idInput + "autocomplete-list");
        boxFocus.setAttribute("class", "autocomplete-items");
      } else {
        boxFocus.setAttribute("id", this.idInput + "autocomplete-list-mobi");
        boxFocus.classList.add("autocomplete-items", "position-static");
      }
      parentElement.appendChild(boxFocus);
      for (let item of data) {
        let b = document.createElement("DIV");
        b.innerHTML += item.name;
        b.innerHTML +=
          "<input type='hidden' value='" +
          item.name +
          "' _id='" +
          item._id +
          "'>";
        b.addEventListener("click", () => {
          inp.value = b.getElementsByTagName("input")[0].value;
          const id = b.getElementsByTagName("input")[0].getAttribute("_id");
          this.sendValue(id);
          this.test = inp.value;
          !mobile ? this.closeOutside(parentElement) : mobile();
        });
        boxFocus.appendChild(b);
      }
    },
    sortData(data) {
      for (let i = 0; i < data.length - 1; i++) {
        for (let j = data.length - 1; j > i; j--) {
          if (
            this.convertValue(data[j].type) < this.convertValue(data[i].type)
          ) {
            let tam = data[j];
            data[j] = data[i];
            data[i] = tam;
          }
        }
      }
    },
    convertValue(data) {
      switch (data) {
        case "proviceCity":
          return 1;
        case "district":
          return 2;
        case "station":
          return 3;
      }
    },
    handleFocus() {
      let inp = document.getElementById(`${this.idInput}`);
      inp.select();
      let parentElement = document.getElementById(`parent-${this.idInput}`);
      this.currentFocus = -1;
      let showSearchBox = this.data.slice(0, 15);
      this.renderData(showSearchBox, inp, parentElement);
    },
    closeAllLists() {
      var x = document.getElementsByClassName("autocomplete-items");
      for (var i = 0; i < x.length; i++) {
        x[i].parentNode.removeChild(x[i]);
      }
    },
    handleKeyDown(e) {
      let x = document.getElementById(this.idInput + "autocomplete-list");
      let inp = document.getElementById(`${this.idInput}`);
      if (x) x = x.getElementsByTagName("div");
      if (e.keyCode == 9) {
        if (x && x[0]) {
          x[0].click();
        } else {
          inp.value = "";
        }
        this.closeAllLists();
      } else if (e.keyCode == 40) {
        this.currentFocus++;
        this.addActive(x);
      } else if (e.keyCode == 38) {
        this.currentFocus--;
        this.addActive(x);
      } else if (e.keyCode == 13) {
        e.preventDefault();
        if (this.currentFocus > -1) {
          if (x) x[this.currentFocus].click();
        } else {
          if (!x) return;
          if (x[0]) {
            x[0].click();
          } else {
            inp.value = "";
          }
        }
        inp.blur();
      }
    },
    addActive(x) {
      if (!x) return false;
      this.removeActive(x);
      if (this.currentFocus >= x.length) this.currentFocus = 0;
      if (this.currentFocus < 0) this.currentFocus = x.length - 1;
      x[this.currentFocus].classList.add("autocomplete-active");
    },
    removeActive(x) {
      for (var i = 0; i < x.length; i++) {
        x[i].classList.remove("autocomplete-active");
      }
    },
    handleInput() {
      let inp = document.getElementById(`${this.idInput}`);
      let parentElement = document.getElementById(`parent-${this.idInput}`);
      let i,
        val = inp.value.trim();
      this.currentFocus = -1;
      let arr = this.data;
      this.closeAllLists();
      if (!val) {
        return false;
      }
      let boxFocus = document.createElement("DIV");
      boxFocus.setAttribute("id", this.idInput + "autocomplete-list");
      boxFocus.setAttribute("class", "autocomplete-items");
      parentElement.appendChild(boxFocus);
      for (i = 0; i < arr.length; i++) {
        if (
          arr[i].name.substr(0, val.length).toUpperCase() == val.toUpperCase()
        ) {
          let b = document.createElement("DIV");
          b.innerHTML =
            "<strong>" + arr[i].name.substr(0, val.length) + "</strong>";
          b.innerHTML += arr[i].name.substr(val.length);
          b.innerHTML +=
            "<input type='hidden' value='" +
            arr[i].name +
            "' _id='" +
            arr[i]._id +
            "'>";
          b.addEventListener("click", () => {
            inp.value = b.getElementsByTagName("input")[0].value;
            const id = b.getElementsByTagName("input")[0].getAttribute("_id");
            this.sendValue(id);
            this.closeOutside(parentElement);
          });
          boxFocus.appendChild(b);
        }
      }
    },
    closeOutside(element) {
      let childElement = element.querySelector(".autocomplete-items");
      if (childElement) {
        childElement.remove();
      }
    },
    handleFocusMobi(inp, parentElement, makeCloseMobi, closeMobi) {
      makeCloseMobi(this.placehoder);
      const divSearchMobi = document.createElement("div");
      divSearchMobi.classList.add("w-100", "form-group", "px-2");
      divSearchMobi.innerHTML = `
        <input class="form-control" id="autoSearchBox-mobi-input" type="text" autocomplete="false"/>
      `;
      parentElement.appendChild(divSearchMobi);
      let showSearchBox = this.data.slice(0, 15);
      this.renderData(showSearchBox, inp, parentElement, closeMobi);
      let inputFilter = document.getElementById("autoSearchBox-mobi-input");
      inputFilter.addEventListener("input", () => {
        let val = inputFilter.value.trim();
        let dataFilter = [];
        let a = document.getElementById(
          `${this.idInput}autocomplete-list-mobi`
        );
        if (a) parentElement.removeChild(a);
        if (!val) {
          this.renderData(showSearchBox, inp, parentElement, closeMobi);
        } else {
          for (let item of this.data) {
            if (
              item.name.substr(0, val.length).toUpperCase() == val.toUpperCase()
            ) {
              dataFilter.push(item);
            }
          }
          this.renderData(dataFilter, inp, parentElement, closeMobi);
        }
      });
    },
  },
  watch:{
    valueProps:{
      handler(val){
      if(val){
        this.test=val;
      }else{
        this.test="";
      }
    }}
  },
  mounted() {
    this.test =this.valueProps;
    if (this.data) {
      this.sortData(this.data);
    }
    document.addEventListener("click", (e) => {
      let parentElement = document.getElementById(`parent-${this.idInput}`);
      let x = document.getElementById(this.idInput + "autocomplete-list");
      let inp = document.getElementById(`${this.idInput}`);
      if (x) x = x.getElementsByTagName("div");

      if (parentElement && !parentElement.contains(e.target)) {
        this.closeOutside(parentElement);
        if (!x) return;
        if (x[0]) {
          x[0].click();
        } else {
          inp.value = "";
        }
      }
    });
  },
};
</script>
<style scoped>
.close-mobi {
  border-bottom: 1px solid black;
}
.search-box-mobi {
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 10;
}
</style>
