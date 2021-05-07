<template>
  <div>
    <div>
      <div>Giờ đi:</div>
      <div class="mt-5">
        <Slider
          v-model="valueTime"
          :min="0"
          :max="24"
          :step="1"
        />
      </div>
    </div>
    <div class="mt-3">
      <div>Giá vé:</div>
      <div class="mt-5">
        <Slider
          v-model="valuePrize"
          :min="0"
          :max="2000000"
          :step="50000"
          :format="formatPrize"
        />
      </div>
    </div>
    <div class="mt-3">
      <div>Số chỗ trống:</div>
      <div class="mt-5">
        <Slider v-model="valueSeats" :min="0" :max="50" :step="1" />
      </div>
    </div>
  </div>
</template>
<script>
import Slider from "@vueform/slider";
export default {
  components: {
    Slider,
  },
  data() {
    return {
      valueTime: [0, 24],
      valuePrize: [0, 2000000],
      valueSeats: [0, 50],
      formatTime: function (valueTime) {
        return `${valueTime}h`;
      },
      formatPrize: function (valuePrize) {
        return `${valuePrize}vnđ`;
      },
    };
  },
};
</script>
<style src="@vueform/slider/themes/default.css"></style>
<style scoped>
</style>