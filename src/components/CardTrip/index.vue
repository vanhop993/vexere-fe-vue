<template>
  <div class="container-fluid mb-2 card-trip" ref="cardTrip">
    <div class="row border-card" :class="{borderCardBoxShadow:toggleThongTinChiTiet}">
      <div class="d-none d-md-block col-md-3 p-0">
        <img :src="data.image" class="image-card" />
      </div>
      <div class="col-12 col-md-9">
        <div class="d-flex justify-content-between">
          <span class="bus-name card-text">{{ data.company.name }}</span>
          <span class="prize card-text"
            >{{ data.prize.toLocaleString() }}đ</span
          >
        </div>
        <div class="type-bus">
          <span class="seat-type card-text">{{ data.bus.typeBus }}</span>
        </div>
        <div class="d-flex align-items-center">
          <svg
            class="TicketPC__LocationRouteSVG-sc-1mxgwjh-4 dSQflF"
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="74"
            viewBox="0 0 14 74"
          >
            <path
              fill="none"
              stroke="#787878"
              stroke-linecap="round"
              stroke-width="2"
              stroke-dasharray="0 7"
              d="M7 13.5v46"
            ></path>
            <g fill="none" stroke="#484848" stroke-width="3">
              <circle cx="7" cy="7" r="7" stroke="none"></circle>
              <circle cx="7" cy="7" r="5.5"></circle>
            </g>
            <path
              d="M7 58a5.953 5.953 0 0 0-6 5.891 5.657 5.657 0 0 0 .525 2.4 37.124 37.124 0 0 0 5.222 7.591.338.338 0 0 0 .506 0 37.142 37.142 0 0 0 5.222-7.582A5.655 5.655 0 0 0 13 63.9 5.953 5.953 0 0 0 7 58zm0 8.95a3.092 3.092 0 0 1-3.117-3.06 3.117 3.117 0 0 1 6.234 0A3.092 3.092 0 0 1 7 66.95z"
              fill="#787878"
            ></path>
          </svg>
          <div class="ml-1">
            <div class="mb-1 card-text">
              <span class="card-time">{{ departureTime }}</span>
              <span> • {{ data.departurePlace.name }}</span>
            </div>
            <div>
              <span>{{ Math.floor(hourMove) + ":" + minuteMove }}m</span>
            </div>
            <div class="mt-1 card-text">
              <span class="card-time">{{ arrivalTime }}</span>
              <span> • {{ data.arrivalPlace.name }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="d-flex align-items-center w-100 justify-content-center justify-content-md-end">
        <a
          class="text-decoration-none mr-3 d-none d-md-block"
          @click.prevent="toggleThongTinChiTiet = !toggleThongTinChiTiet;toggleChonGhe = false"
          href=""
          >Thông tin chi tiết <i class="fas fa-caret-down"></i
        ></a>
        <button class="btn btn-warning" @click.prevent="toggleThongTinChiTiet = false ; toggleChonGhe = !toggleChonGhe;">Chọn chuyến</button>
      </div>
      <div
        class="w-100"
      > 
        <ThongTinChuyen v-if="toggleThongTinChiTiet" :data="data" class="d-none d-md-block"/>
        <DanhSachGhe :data="data.seats" :tripId="data._id" :prize="data.prize" v-if="toggleChonGhe"/>
      </div>
    </div>
  </div>
</template>
<script>
import moment from "moment";
import DanhSachGhe from "../../components/DanhSachGhe";
import ThongTinChuyen from "../../components/ThongTinChuyen";
export default {
  props: ["data"],
  components:{
    DanhSachGhe,ThongTinChuyen
  },
  data() {
    return {
      departureTime: moment(this.data.departureTime).format("HH:mm"),
      arrivalTime: moment(this.data.arrivalTime).format("HH:mm"),
      hourMove:
        (new Date(this.data.arrivalTime) - new Date(this.data.departureTime)) /
        1000 /
        60 /
        60,
      minuteMove:
        ((new Date(this.data.arrivalTime) - new Date(this.data.departureTime)) /
          1000 /
          60) %
        60,
      toggleThongTinChiTiet: false,
      toggleChonGhe:false
    };
  },
  mounted(){
    document.addEventListener("click", (e) => {
      if(this.$refs.cardTrip && !this.$refs.cardTrip.contains(e.target)){
        this.toggleThongTinChiTiet = false;
        this.toggleChonGhe = false;
      }
    })
  }
};
</script>
<style scoped>
.card-trip {
  color: rgb(72, 72, 72);
}
.border-card {
  padding: 16px;
  border: 1px solid;
  border-radius: 4px;
  border: 1px solid rgb(192, 192, 192);
  transition-duration: 0.5s;
}
.borderCardBoxShadow{
  box-shadow: rgb(0 0 0 / 25%) 0px 14px 28px, rgb(0 0 0 / 22%) 0px 10px 10px;
}
.border-card:hover {
  box-shadow: rgb(0 0 0 / 25%) 0px 14px 28px, rgb(0 0 0 / 22%) 0px 10px 10px;
}
.image-card {
  width: 100%;
  height: 100%;
  object-position: center center;
  object-fit: cover;
}
.prize {
  font-size: 20px;
  color: rgb(0, 96, 196);
  -webkit-box-align: baseline;
  align-items: baseline;
  font-weight: bold;
}
.type-bus {
  margin: 10px 0 20px 0;
}
.bus-name {
  font-size: 20px;
  color: rgb(72, 72, 72);
  font-weight: bold;
}
.seat-type {
  margin-bottom: 20px;
  margin-top: 10px;
  color: rgb(72, 72, 72);
  font-size: 14px;
}
.card-time {
  font-size: 20px;
  font-weight: 700;
}
.card-text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>