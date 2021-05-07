<template>
  <Loader v-if="placeLoading" />
  <section v-else>
    <div class="px-4 d-block d-md-none text-white">
      <h2><strong>Chào bạn</strong></h2>
      <h5>Bạn muốn đi đâu hôm nay?</h5>
    </div>
    <div class="w-100 position-relative">
      <div class="img-banner-homepage d-none d-md-block">
        <img
          class="w-100"
          src="/img/chac-ve-trong-tay-banner-trang-chu-illustration-04.png"
          alt=""
        />
      </div>
      <div class="search-box-container">
        <SearchTrip />
      </div>
    </div>
    <div class="container py-5">
      <h3>Ưu Đãi Nổi Bật</h3>
      <div>
        <Carousel
          v-if="data"
          :value="data"
          :numVisible="3"
          :numScroll="1"
          :responsiveOptions="responsiveOptions"
          class="custom-carousel"
          :circular="true"
          :autoplayInterval="3000"
          :indicatorsContentClass="'d-none'"
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
    </div>
  </section>
</template>
<script>
import Carousel from "primevue/carousel";
import SearchTrip from "../../../components/SearchTrip";
import Loader from "../../../components/Loader";
// import UuDaiNoiBat from "../../../components/UuDaiNoiBat";

export default {
  components: {
    SearchTrip,
    Loader,
    Carousel,
    // UuDaiNoiBat,
  },
  data() {
    return {
      data: [
        "/img/140k_Vex-banner-home_641x500.png",
        "/img/70K_Vex_banner_home-641x500.png",
        "/img/chill-he_banner-home.png",
        "/img/lua-chon-tha-ga__Vex_banner_home-641x500.png",
        "/img/airpay-new-thang3__banner-home.png",
        "/img/chill-he_banner-home.png",
        "/img/tay-bac_Vex_banner_home-641x500.png",
      ],
      responsiveOptions: [
        {
          breakpoint: "3000px",
          numVisible: 3,
          numScroll: 3,
        },
        {
          breakpoint: "600px",
          numVisible: 2,
          numScroll: 2,
        },
        {
          breakpoint: "480px",
          numVisible: 1,
          numScroll: 1,
        },
      ],
    };
  },
};
</script>
<style scoped>
.search-box-container {
  width: 85%;
  position: static;
  top: 0%;
  left: 0%;
  transform: translate(0%, 0%);
  margin: auto;
}
.img-banner-homepage {
  display: block;
}
@media screen and (min-width: 768px) {
  .search-box-container {
    position: absolute;
    width: 70%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
.product-item-content {
  border: 1px solid var(--surface-d);
  border-radius: 3px;
  margin: 0.3rem;
  text-align: center;
}

.product-image {
  width: 100%;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
}
</style>