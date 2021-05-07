<template>
  <section class="container">
    <div class="my-5">
      <SearchTrip />
    </div>
    <div class="row">
      <div class="col-12 col-md-3">
        <span>Bộ lọc tìm kiếm</span>
        <div class="w-100 border border-dark p-3">
          <FilterTrip />
        </div>
      </div>
      <div class="col-12 col-md-9">
        <h4>
          <strong
            >Đặt mua vé xe đi Buôn Ma Thuột - Đắk Lắk từ Sài Gòn chất lượng cao
            và giá vé ưu đãi nhất: {{ totalTrips }} chuyến</strong
          >
        </h4>
        <template v-if="tripLoading && dataTrips.length === 0">
          <CardSkeletonLoader v-for="index in 10" :key="index" />
        </template>
        <CardTrip v-for="item in dataTrips" :key="item._id" :data="item" />
        <template v-if="tripLoading && dataTrips.length !== 0">
          <CardSkeletonLoader v-for="index in 1" :key="index" />
        </template>
        <Observer v-on:intersect="intersected" />
      </div>
    </div>
  </section>
</template>
<script>
import { mapGetters } from "vuex";
import SearchTrip from "../../../components/SearchTrip";
import CardTrip from "../../../components/CardTrip";
import Observer from "../../../components/Observer";
import CardSkeletonLoader from "../../../components/CardSkeletonLoader";
import FilterTrip from "../../../components/FilterTrip";
import { A_LIST_TRIPS_REQUEST } from "../../../store/Trip/constant";
export default {
  components: {
    SearchTrip,
    CardTrip,
    CardSkeletonLoader,
    FilterTrip,
    Observer,
  },
  computed: {
    ...mapGetters(["tripLoading", "listTrips", "totalTrips", "bookTrip"]),
  },
  data() {
    return {
      pageNumber: 1,
      dataTrips: [],
    };
  },
  methods: {
    valueListTrip(pageNumber) {
      const { departurePlace, arrivalPlace, startedDate } = this.$route.params;
      const value = {
        departurePlace,
        arrivalPlace,
        startedDate,
        pageNumber,
      };
      return value;
    },
    getListTrips(value) {
      this.$store.dispatch(A_LIST_TRIPS_REQUEST, value);
    },
    intersected() {
      this.pageNumber++;
      if (this.dataTrips.length !== this.totalTrips) {
        const value = this.valueListTrip(this.pageNumber);
        this.getListTrips(value);
      }
    },
  },
  watch: {
    listTrips: {
      handler(val) {
        if (val) {
          this.dataTrips = [...this.dataTrips, ...val];
          console.log(this.dataTrips);
        }
      },
      deep: true,
    },
    bookTrip: {
      handler() {
        console.log("booktrip");
        const value = this.valueListTrip(1);
        this.getListTrips(value);
        this.dataTrips = [];
      },
      deep: true,
    },
  },
  mounted() {
    const value = this.valueListTrip(this.pageNumber);
    this.getListTrips(value);
  },
};
</script>
<style>
</style>