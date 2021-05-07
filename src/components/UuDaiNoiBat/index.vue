<template>
  <div>
    <div class="container py-5">
      <h3>Ưu Đãi Nổi Bật</h3>
      <Carousel
        :value="data"
        :numVisible="3"
        :numScroll="1"
        :responsiveOptions="responsiveOptions"
        class="custom-carousel"
        :circular="true"
        :autoplayInterval="3000"
      >
        <template #item="slotProps">
          <div class="product-item">
            <div class="product-item-content">
              <div class="p-mb-3">
                <img
                  :src="slotProps.data"
                  class="product-image"
                />
              </div>
            </div>
          </div>
        </template>
      </Carousel>
    </div>
  </div>
</template>
<script>
import Carousel from "primevue/carousel";
export default {
  components: {
    Carousel,
  },
  data() {
    return {
      data: [
        "/img/140k_Vex-banner-home_641x500.png",
        "/img/70K_Vex_banner_home-641x500.png",
        "/img/chill-he_banner-home.png",
        "/img/140k_Vex-banner-home_641x500.png",
        "/img/140k_Vex-banner-home_641x500.png",
        "/img/chill-he_banner-home.png",
      ],
      // responsiveOptions: [
      //   {
      //     breakpoint: "1024px",
      //     numVisible: 3,
      //     numScroll: 1,
      //   },
      //   {
      //     breakpoint: "600px",
      //     numVisible: 2,
      //     numScroll: 1,
      //   },
      //   {
      //     breakpoint: "480px",
      //     numVisible: 1,
      //     numScroll: 1,
      //   },
      // ],
    };
  },
};
</script>
<style scoped>
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