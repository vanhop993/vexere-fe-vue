<template>
  <div>
    <ul class="nav nav-tabs justify-content-center" id="myTab" role="tablist">
      <li class="nav-item">
        <a
          class="nav-link active"
          id="hinh-anh-tab"
          data-toggle="tab"
          href="#hinh-anh-content"
          role="tab"
          aria-controls="hinh-anh-tab"
          aria-selected="true"
          >Hình ảnh</a
        >
      </li>
      <li class="nav-item">
        <a
          class="nav-link"
          id="tien-ich-tab"
          data-toggle="tab"
          href="#tien-ich-content"
          role="tab"
          aria-controls="tien-ich-tab"
          aria-selected="false"
          >Tiện ích</a
        >
      </li>
      <li class="nav-item">
        <a
          class="nav-link"
          id="diem-don-tra-tab"
          data-toggle="tab"
          href="#diem-don-tra-content"
          role="tab"
          aria-controls="diem-don-tra-tab"
          aria-selected="false"
          >Điểm đón trả</a
        >
      </li>
      <li class="nav-item">
        <a
          class="nav-link"
          id="chinh-sach-tab"
          data-toggle="tab"
          href="#chinh-sach-content"
          role="tab"
          aria-controls="chinh-sach-tab"
          aria-selected="false"
          >Chính sách</a
        >
      </li>
      <li class="nav-item">
        <a
          class="nav-link"
          id="danh-gia-tab"
          data-toggle="tab"
          href="#danh-gia-content"
          role="tab"
          aria-controls="danh-gia-tab"
          aria-selected="false"
          >Đánh giá</a
        >
      </li>
    </ul>
    <div class="tab-content" id="myTabContent">
      <div
        class="tab-pane fade show active"
        id="hinh-anh-content"
        role="tabpanel"
        aria-labelledby="hinh-anh-tab"
      >
        <LoaderOnly v-if="companyLoading" class="m-auto"/>
        <Carousel
          v-if="!companyLoading && companyDetail"
          :value="companyDetail.images"
          :numVisible="1"
          :numScroll="1"
          class="custom-carousel"
        >
          <template #item="slotProps">
            <div class="product-item">
              <div class="product-item-content">
                <div class="p-mb-3">
                  <img
                    :src="slotProps.data"
                    :alt="slotProps.data"
                    class="product-image"
                  />
                </div>
              </div>
            </div>
          </template>
        </Carousel>
      </div>
      <div
        class="tab-pane fade"
        id="tien-ich-content"
        role="tabpanel"
        aria-labelledby="tien-ich-tab"
      >
        <div v-for="item in data.utilites" :key="item._id">
          - {{ item.name }}
        </div>
      </div>
      <div
        class="tab-pane fade"
        id="diem-don-tra-content"
        role="tabpanel"
        aria-labelledby="diem-don-tra-tab"
      >
        <div class="container-fluid">
          <div class="row">
            <div class="col-6">
              <div><strong>Điểm đón</strong></div>
              <div v-for="item in data.pickUpPoint" :key="item._id">
                {{ item.time }} - {{ item.place }}
              </div>
            </div>
            <div class="col-6">
              <div><strong>Điểm trả</strong></div>
              <div v-for="item in data.dropOffPoint" :key="item._id">
                {{ item.time }} - {{ item.place }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="tab-pane fade"
        id="chinh-sach-content"
        role="tabpanel"
        aria-labelledby="chinh-sach-tab"
      >
        <h5><strong>Phí hủy</strong></h5>
        <div class="CancellationPolicy__TimelineContainer">
          <div class="cancellation-timeline">
            <div class="cancellation-policy-period">
              <div class="cancellation-policy-period-proccess"></div>
              <p>Phí hủy 5%</p>
            </div>
            <div class="mark" style="left: calc(50% - 33px)">
              <strong>{{ recoHours }}</strong
              ><span>{{ recoDate }}</span>
            </div>
            <div class="cancellation-policy-period">
              <div class="cancellation-policy-period-proccess-red"></div>
              <p>Phí hủy 100%</p>
            </div>
          </div>
          <div class="departure">Khởi hành</div>
          <div class="circle"></div>
          <div class="circle today"></div>
        </div>
      </div>
      <div
        class="tab-pane fade"
        id="danh-gia-content"
        role="tabpanel"
        aria-labelledby="danh-gia-tab"
      >
        dánh giá
      </div>
    </div>
  </div>
</template>
<script>
import moment from "moment";
import { mapGetters } from "vuex";
import { A_GET_COMPANY } from "../../store/Company/constant";
import Carousel from "primevue/carousel";
import LoaderOnly from "../LoaderOnly"
export default {
  props: ["data"],
  components: {
    Carousel,LoaderOnly
  },
  data() {
    return {
      departureTime: new Date(this.data.departureTime),
      recordTime: "",
      recoDate: "",
      recoHours: "",
    };
  },
  computed: {
    ...mapGetters(["companyDetail","companyLoading"]),
  },
  mounted() {
    this.$store.dispatch(A_GET_COMPANY, this.data.company._id);
    this.recordTime = this.departureTime.setHours(
      this.departureTime.getHours() - 1
    );
    this.recoDate = moment(this.recordTime).format("DD/MM/YYYY");
    this.recoHours = moment(this.recordTime).format("HH:mm");
  },
};
</script>
<style scoped>
.tab-pane {
  padding: 20px 0 0 0;
}
.CancellationPolicy__TimelineContainer {
  position: relative;
}
.cancellation-timeline {
  position: relative;
  display: flex;
  padding-top: 44px;
}
.cancellation-policy-period {
  width: 100%;
}
.cancellation-policy-period p {
  text-align: center;
  font-size: 14px;
  margin-top: 8px;
}
.cancellation-policy-period-proccess {
  background: rgb(255, 199, 0);
  height: 15px;
}
.cancellation-policy-period-proccess-red {
  background: rgb(241, 0, 0);
  height: 15px;
}
.mark {
  position: absolute;
  top: 0px;
  display: flex;
  flex-direction: column;
  text-align: center;
  font-size: 12px;
}
.departure {
  font-weight: bold;
  font-size: 12px;
  position: absolute;
  top: 18px;
  right: 0px;
}
.circle {
  height: 10px;
  width: 10px;
  border-radius: 10px;
  background: white;
  position: absolute;
  top: 47px;
  right: 5%;
}
.today {
  left: 25%;
}
.product-item-content {
  border-radius: 3px;
  margin: 0.3rem;
  text-align: center;
}

.product-image {
  width: 100%;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  height: 340px;
    width: auto;
    margin: auto;
}
</style>