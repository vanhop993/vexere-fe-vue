<template>
  <div class="position-relative" ref="containerGhe">
    <div
      class="position-absolute input-ghe p-1 form-group"
      v-if="select && !name"
    >
      <label for="">Tên ghê</label>
      <input
        type="text"
        class="form-control"
        @blur="handleBlur"
        ref="inputGhe"
      />
    </div>
    <div
      class="gheTrong"
      :class="{ gheDangChon: select || seat.name, gheDaDat: seat.statusBooking }"
      v-if="seat"
      @click="handleSelect"
    >
      <IconGhe />
    </div>
  </div>
</template>
<script>
import { A_TRY_SIGNIN } from "../../store/login/constant";
import IconGhe from "../IconGhe";
export default {
  props: ["title", "seat", "item", "floor", "row", "col"],
  components: {
    IconGhe,
  },
  data() {
    return {
      select: false,
      name: "",
    };
  },
  methods: {
    handleSelect() {
      if (this.seat.statusBooking) {
        return;
      }
      this.$store.dispatch(A_TRY_SIGNIN);
      this.select = !this.select;
      if (!this.select) {
        this.name = "";
        this.$emit(
          "event-select-seat",
          this.name,
          this.floor,
          this.row,
          this.col
        );
      }
    },
    handleBlur(e) {
      this.name = e.target.value;
      if (this.name) {
        this.$emit(
          "event-select-seat",
          this.name,
          this.floor,
          this.row,
          this.col
        );
      }
    },
  },
  watch: {
    select() {
      if (!this.select) {
        this.name = "";
      }
    },
  },
  updated() {
    if (this.$refs.inputGhe) {
      this.$refs.inputGhe.focus();
    }
    document.addEventListener("click", (e) => {
      if (this.$refs.containerGhe && !this.$refs.containerGhe.contains(e.target)) {
        if (!this.name) {
          this.name = "";
          this.select = false;
        }
      }
    });
  },
};
</script>
<style scope>
.gheTrong {
  cursor: pointer;
}
.gheDaDat svg g {
  fill: rgb(118, 118, 118);
  stroke: black;
  cursor: not-allowed;
}
.gheDangChon svg g {
  stroke: black;
  fill: rgb(80, 144, 233) !important;
}
.gheNone {
  min-width: 22px;
  cursor: not-allowed;
}
.input-ghe {
  width: 100px;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(0, 0, 0, 0.75);
  color: #fff;
}
.input-ghe::before {
  position: absolute;
  top: 100%;
  right: 40%;
  z-index: 2;
  content: "";
  border-width: 10px 10px 13px;
  border-style: solid;
  border-color: rgba(0, 0, 0, 0.75) transparent transparent transparent;
}
</style>