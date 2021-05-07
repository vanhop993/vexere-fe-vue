<template>
  <div
    class="gheTrong"
    :class="{ gheDangChon: select, gheDaDat: seat.statusBooking }"
    v-if="seat"
    @click="handleSelect"
    data-toggle="tooltip" data-placement="top" :title="`Số ghế: ${seat.name} - Giá ghế: ${prize}`"
  >
    <IconGhe />
  </div>
</template>
<script>
import router from "../../router";
import { A_TRY_SIGNIN } from "../../store/login/constant";
import IconGhe from "../IconGhe";
import Swal from 'sweetalert2'
export default {
  props: ["seat", "item","prize"],
  components: {
    IconGhe,
  },
  data() {
    return {
      select: false,
    };
  },
  methods: {
    handleSelect() {
      if(this.seat.statusBooking){
        return
      }
      this.$store.dispatch(A_TRY_SIGNIN);
      if (localStorage.getItem("token")) {
        this.select = !this.select;
        this.$emit("event-select-seat", this.seat);
      } else {
        Swal.fire({
          text: "Vui lòng đăng nhập để chọn vé!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Sign in",
        }).then((result) => {
          if (result.isConfirmed) {
            router.push("/signin");
          }
        });
      }
    },
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
</style>