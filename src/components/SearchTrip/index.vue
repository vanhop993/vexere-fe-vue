<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12 col-md-3 p-0">
        <SearchBoxAutoComplate
          :placehoder="'Điểm đi'"
          :classMore="'input-search'"
          :idInput="'diemDi'"
          :attributeName="'diemDi'"
          :data="place"
          @event-value="handleValue"
        />
      </div>
      <div class="col-12 col-md-3 p-0">
        <SearchBoxAutoComplate
          :placehoder="'Điểm đến'"
          :classMore="'input-search'"
          :idInput="'diemDen'"
          :attributeName="'diemDen'"
          :data="place"
          @event-value="handleValue"
        />
      </div>
      <div class="col-12 col-md-3 p-0">
        <div class="form-group m-0">
          <input
            class="form-control"
            type="date"
            :min="minDay"
            @change="handleDate"
          />
        </div>
      </div>
      <div class="col-12 col-md-3 p-0">
        <button
          class="text-nowrap w-100 btn btn-warning d-flex align-items-center justify-content-center"
          :disabled="disableBtn"
        >
          <LoaderOnly  v-if="tripLoading" class="mr-2"/>
          <span>Tim vé</span>
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import SearchBoxAutoComplate from "../SearchBoxAutoComplete";
import LoaderOnly from "../LoaderOnly"
import moment from "moment";
import { A_ALL_PLACE_REQUEST } from "../../store/Place/constant";
import { A_LIST_TRIPS_REQUEST } from "../../store/Trip/constant";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      minDay: moment(new Date()).format("YYYY-MM-DD"),
      value: {
        departurePlace: "",
        arrivalPlace: "",
        startedDate: "",
      },
      invalid: {
        departurePlace: false,
        arrivalPlace: false,
        startedDate: false,
      },
      disableBtn: true,
    };
  },
  components: {
    SearchBoxAutoComplate,
    LoaderOnly,
  },
  methods: {
    checkUndisableBtn() {
      if (
        this.invalid.departurePlace &&
        this.invalid.arrivalPlace &&
        this.invalid.startedDate
      ) {
        this.disableBtn = false;
      }
    },
    handleValue(idInput,id) {
      switch (idInput) {
        case "diemDi": {
          if (id) {
            this.invalid.departurePlace = true;
            this.value.departurePlace = id;
          } else {
            this.invalid.departurePlace = false;
          }
          break;
        }
        case "diemDen": {
          if (id) {
            this.invalid.arrivalPlace = true;
            this.value.arrivalPlace = id;
          } else {
            this.invalid.arrivalPlace = false;
          }
          break;
        }
      }
      this.checkUndisableBtn();
    },
    handleDate(e) {
      this.value.startedDate = moment(e.target.value).format("YYYY-MM-DD");
      this.invalid.startedDate = true;
      this.checkUndisableBtn();
    },
  },
  computed: {
    ...mapGetters(["placeLoading", "place", "tripLoading"]),
  },
  watch: {
    disableBtn() {
      if (!this.disableBtn) {
        this.value.pageNumber = 1;
        this.$store.dispatch(A_LIST_TRIPS_REQUEST, this.value);
      }
    },
  },
  mounted() {
    this.$store.dispatch(A_ALL_PLACE_REQUEST);
  },
};
</script>
<style scoped>
.input-search {
  height: 50px;
}
.loader-only-container{
  width: 25px;
  height:25px;
  position: relative;
  margin-right: 5px;
}
</style>