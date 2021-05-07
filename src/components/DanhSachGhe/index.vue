<template>
  <div>
    <div class="d-block d-md-flex justify-content-between danh-sach-ghe">
      <div class="danhSachGhe-container">
        <div><strong>Chú thích:</strong></div>
        <div>
          <div class="gheTrong mb-3">
            <IconGhe />
            <span> Còn trống </span>
          </div>
          <div class="gheDaDat mb-3">
            <IconGhe />
            <span> Ghế đã chọn </span>
          </div>
          <div class="gheDangChon mb-3">
            <IconGhe />
            <span> Ghế đang chọn </span>
          </div>
        </div>
      </div>
      <div class="d-block d-md-flex">
        <div v-for="listSeats in data" :key="listSeats._id" class="mr-2">
          <div class="text-center">Tầng {{ listSeats.floor }}</div>
          <div class="coach d-flex align-items-center justify-content-center">
            <table>
              <tbody>
                <tr v-for="item in listSeats.listSeats" :key="item._id">
                  <td
                    v-for="(seat, index) in item"
                    :key="index"
                    :class="{ gheNone: true }"
                  >
                    <Ghe
                      :seat="seat"
                      :item="item"
                      :prize="prize"
                      @event-select-seat="handleSelectSeat"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <div class="container-booking">
      <div class="row align-items-center">
        <div class="col-12 col-md-6">
          Ghế:
          <span
            v-for="(item, index) in listSelectSeats"
            :key="item._id"
            class="list-name-seats"
          >
            <span v-if="index !== 0"> ,</span>
            {{ item.name }}
          </span>
        </div>
        <div class="col-12 col-md-6 d-block d-md-flex align-items-center justify-content-end">
          <div>
            Tổng cộng:
            <span class="prize">
              {{ total.toLocaleString() }}
            </span>
          </div>
          <div class="ml-0 ml-md-3 text-center text-md-left">
            <button
              class="btn btn-booking text-white text-nowrap"
              @click="handleBooking"
              :disabled="bookBtn"
            >
              Đặt ghê
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import IconGhe from "../IconGhe";
import Ghe from "../Ghe";
import { A_BOOK_TICKET_TRIP } from "../../store/Trip/constant";
export default {
  props: ["data", "prize", "tripId"],
  components: { IconGhe, Ghe },
  data() {
    return {
      listSelectSeats: [],
      total: 0,
      bookBtn: true,
    };
  },
  methods: {
    handleSelectSeat(seat) {
      const index = this.listSelectSeats.findIndex(
        (item) => item._id === seat._id
      );
      if (index !== -1) {
        this.listSelectSeats.splice(index, 1);
      } else {
        this.listSelectSeats.push(seat);
      }
      this.total = this.prize * this.listSelectSeats.length;
    },
    handleBooking() {
      const arrSeats_Id = this.listSelectSeats.map((item) => item._id);
      const dataBooking = {
        trip_Id: this.tripId,
        arrSeats_Id,
      };
      this.$store.dispatch(A_BOOK_TICKET_TRIP, dataBooking);
      this.listSelectSeats = [];
    },
  },
  watch: {
    listSelectSeats: {
      handler(val) {
        if (val.length > 0) {
          this.bookBtn = false;
        } else {
          this.bookBtn = true;
        }
      },
      deep: true,
    },
  },
};
</script>
<style scoped>
.danh-sach-ghe {
  margin-top: 16px;
  border-top: 1px solid rgb(192, 192, 192);
  padding: 12px 12px 0px;
}
@media screen and (min-width:768px) {
  .danh-sach-ghe {
    padding: 12px 64px 0px;
  }
}
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
.coach {
  padding: 24px 12px 12px;
  background: rgb(230, 230, 230);
  border-radius: 25px 25px 5px 5px;
}
.prize {
  font-size: 20px;
  color: rgb(0, 96, 196);
  -webkit-box-align: baseline;
  align-items: baseline;
  font-weight: bold;
}
.btn-booking {
  background-color: rgb(0, 96, 196);
}
.container-booking {
  margin-top: 16px;
  padding: 16px;
  border-top: 1px solid rgb(192, 192, 192);
}
.list-name-seats {
  color: rgb(0, 96, 196);
  font-weight: bold;
}
</style>