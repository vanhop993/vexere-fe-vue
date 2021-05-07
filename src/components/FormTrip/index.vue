<template>
  <div class="bg-white p-3">
    <SearchBoxAutocomplete
      :data="listCompany"
      :placehoder="'Chọn công ty'"
      :titleSelect="'Chọn công ty'"
      :attributeName="'companyId'"
      :idInput="`companyId`"
      @event-value="handleInput"
    />
    <SearchBoxAutocomplete
      :data="place"
      :placehoder="'Chọn khu vực xuất phát'"
      :titleSelect="'Chọn khu vực xuất phát'"
      :attributeName="'fromState'"
      :idInput="`fromState`"
      @event-value="handleInput"
    />
    <SearchBoxAutocomplete
      :data="place"
      :placehoder="'Chọn khu vực đến'"
      :titleSelect="'Chọn khu vực đến'"
      :attributeName="'toState'"
      :idInput="`toState`"
      @event-value="handleInput"
    />
    <SearchBoxAutocomplete
      :data="place"
      :placehoder="'Điểm đi (bến xe , quận huyện)'"
      :titleSelect="'Điểm đi'"
      :attributeName="'departurePlace'"
      :idInput="`departurePlace`"
      @event-value="handleInput"
    />
    <SearchBoxAutocomplete
      :data="place"
      :placehoder="'Điểm đến (bến xe , quận huyện)'"
      :titleSelect="'Điểm đến'"
      :attributeName="'arrivalPlace'"
      :idInput="`arrivalPlace`"
      @event-value="handleInput"
    />
    <SearchBoxAutocomplete
      :data="dataListBusRender"
      :placehoder="'Chọn xe'"
      :titleSelect="'Chọn xe'"
      :attributeName="'bus'"
      :idInput="`bus`"
      :statusInput="!dataListBusRender"
      @event-value="handleInput"
    />
    <Input
      :title="'Ngày xuất phát'"
      :type="'date'"
      :name="'startedDate'"
      :submit="checkSubmit"
      :min="1"
      :max="100"
      @event-return-value="handleInput"
    />
    <Input
      :title="'Giờ xuất phát'"
      :type="'time'"
      :name="'startedTime'"
      :submit="checkSubmit"
      :min="1"
      :max="100"
      @event-return-value="handleInput"
    />
    <Input
      :title="'Ngày đến'"
      :type="'date'"
      :name="'arrivalDate'"
      :submit="checkSubmit"
      :min="1"
      :max="100"
      @event-return-value="handleInput"
    />
    <Input
      :title="'Giờ đến dự kiến'"
      :type="'time'"
      :name="'arrivalTime'"
      :submit="checkSubmit"
      :min="1"
      :max="100"
      @event-return-value="handleInput"
    />
    <PanelCanCreate
      :label="'Điểm đến (bến xe , quận huyện)'"
      :title="'pickUpPoint'"
      :arrayRender="pickUpPoint"
      @event-more-panel="handleMorePanel"
      @event-close-panel="handleMorePanel"
    >
      <template v-slot:default="slotProps">
        <Input
          :title="'Thời gian đón'"
          :type="'time'"
          :name="'timePick'"
          :submit="checkSubmit"
          :index="slotProps.index"
          :min="1"
          :max="100"
          @event-return-value="handleInput"
        />
        <Input
          :title="'Điểm đón'"
          :name="'placePick'"
          :submit="checkSubmit"
          :index="slotProps.index"
          :min="1"
          :max="100"
          @event-return-value="handleInput"
        />
      </template>
    </PanelCanCreate>
    <PanelCanCreate
      :label="'Các điểm trả khách'"
      :title="'dropOffPoint'"
      :arrayRender="dropOffPoint"
      @event-more-panel="handleMorePanel"
      @event-close-panel="handleMorePanel"
    >
      <template v-slot:default="slotProps">
        <Input
          :title="'Thời gian'"
          :name="'timeDrop'"
          :type="'time'"
          :submit="checkSubmit"
          :index="slotProps.index"
          :min="1"
          :max="100"
          @event-return-value="handleInput"
        />
        <Input
          :title="'Địa điểm'"
          :name="'placeDrop'"
          :submit="checkSubmit"
          :index="slotProps.index"
          :min="1"
          :max="100"
          @event-return-value="handleInput"
        />
      </template>
    </PanelCanCreate>
    <div>Chọn hình ảnh</div>
    <div class="radio-container d-flex flex-wrap">
      <template v-if="companyDetail">
        <span v-for="(item, index) in companyDetail.images" :key="item">
          <InputRadioCheckOne
            :title="'imageTrip'"
            :data="item"
            :selectProps="imgSelect[index]"
            :index="index"
            :name="'imageTrip'"
            @event-return-value="handleInput"
          />
        </span>
      </template>
    </div>
    <div>
      <div>Các tiện ích trong chuyến đi</div>
      <div class="ultility-container">
        <div v-for="(item,index) in listUltility" :key="item._id">
          <InputCheck :title="'ultility'" :name="item.name" :value="item._id" :index="index" @event-return-value="handleInput"/>
        </div>
      </div>
    </div>
    <Input
      :title="'Giá vé (VND)'"
      :name="'prize'"
      :submit="checkSubmit"
      :min="1"
      :max="100"
      @event-return-value="handleInput"
    />
    <div class="text-center">
      <button class="btn btn-success" @click="handleAddTrip">
        Thêm chuyến
      </button>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { A_GET_ALL_COMPANY, A_GET_COMPANY } from "../../store/Company/constant";
import { A_ALL_PLACE_REQUEST } from "../../store/Place/constant";
import SearchBoxAutocomplete from "../SearchBoxAutoComplete";
import PanelCanCreate from "../Panel/PanelCanCreate";
import Input from "../Input/Input";
import InputRadioCheckOne from "../Input/InputRadioCheckOne";
import InputCheck from "../Input/InputCheck";
import { A_REQUEST_LIST_BUS_COMPANY } from "../../store/Bus/constant";
import { A_GET_LIST_ULTILITY } from "../../store/Ultility/constant";
import { A_POST_NEW_TRIP } from '../../store/Trip/constant';
export default {
  components: {
    SearchBoxAutocomplete,
    PanelCanCreate,
    Input,
    InputRadioCheckOne,
    InputCheck,
  },
  data() {
    return {
      checkSubmit: false,
      dataListBusRender: null,
      company: "",
      invalidCompany: true,
      fromState: "",
      invalidFromState: true,
      toState: "",
      invalidToState: true,
      departurePlace: "",
      invalidDeparturePlace: true,
      arrivalPlace: "",
      invalidArrivalPlace: true,
      bus: "",
      invalidBus: true,
      startedDate: "",
      invalidStartedDate: true,
      startedTime: "",
      invalidStartedTime: true,
      arrivalDate: "",
      invalidArrivalDate: true,
      arrivalTime: "",
      invalidArrivalTime: true,
      pickUpPoint: [{ time: "", place: "" }],
      invalidPickUpPoint: [{ time: true, place: true }],
      dropOffPoint: [{ time: "", place: "" }],
      invalidDropOffPoint: [{ time: true, place: true }],
      image: "",
      invalidImage: true,
      utilites:[],
      prize: "",
      invalidPrize: true,
      imgSelect: "",
    };
  },
  computed: {
    ...mapGetters([
      "listCompany",
      "place",
      "listBus",
      "companyDetail",
      "listUltility",
    ]),
  },
  methods: {
    handleMorePanel(title, status, index) {
      switch (title) {
        case "pickUpPoint":
          if (status) {
            this.pickUpPoint.push({ time: "", place: "" });
            this.invalidPickUpPoint.push({ time: true, place: true });
          } else {
            this.pickUpPoint.splice(index, 1);
            this.invalidPickUpPoint.splice(index, 1);
          }
          break;
        case "dropOffPoint":
          if (status) {
            this.dropOffPoint.push({ time: "", place: "" });
            this.invalidDropOffPoint.push({ time: true, place: true });
          } else {
            this.dropOffPoint.splice(index, 1);
            this.invalidDropOffPoint.splice(index, 1);
          }
          break;
      }
    },
    handleInput(title, value, invalidItem, index) {
      console.log(title, value, invalidItem, index);
      switch (title) {
        case "companyId":
          this.company = value;
          this.invalidCompany = invalidItem;
          break;
        case "fromState":
          this.fromState = value;
          this.invalidFromState = invalidItem;
          break;
        case "toState":
          this.toState = value;
          this.invalidToState = invalidItem;
          break;
        case "departurePlace":
          this.departurePlace = value;
          this.invalidDeparturePlace = invalidItem;
          break;
        case "arrivalPlace":
          this.arrivalPlace = value;
          this.invalidArrivalPlace = invalidItem;
          break;
        case "bus":
          this.bus = value;
          this.invalidBus = invalidItem;
          break;
        case "startedDate":
          this.startedDate = value;
          this.invalidStartedDate = invalidItem;
          break;
        case "startedTime":
          this.startedTime = value;
          this.invalidStartedTime = invalidItem;
          break;
        case "arrivalDate":
          this.arrivalDate = value;
          this.invalidArrivalDate = invalidItem;
          break;
        case "arrivalTime":
          this.arrivalTime = value;
          this.invalidArrivalTime = invalidItem;
          break;
        case "timePick":
          this.pickUpPoint[index].time = value;
          this.invalidPickUpPoint[index].time = invalidItem;
          break;
        case "placePick":
          this.pickUpPoint[index].place = value;
          this.invalidPickUpPoint[index].place = invalidItem;
          break;
        case "timeDrop":
          this.dropOffPoint[index].time = value;
          this.invalidDropOffPoint[index].time = invalidItem;
          break;
        case "placeDrop":
          this.dropOffPoint[index].place = value;
          this.invalidDropOffPoint[index].place = invalidItem;
          break;
        case "prize":
          this.prize = value;
          this.invalidPrize = invalidItem;
          break;
        case "ultility" :
          if(value){
            this.utilites.push(value);
          }else{
            this.utilites.splice(index,1);
          }
          break;
        case "imageTrip":
          this.image = value;
          this.invalidImage = invalidItem;
          break;
      }
      console.log(
        this.company,
        this.fromState,
        this.toState,
        this.departurePlace,
        this.arrivalPlace,
        this.bus,
        this.pickUpPoint,
        this.dropOffPoint
      );
    },
    handleAddTrip() {
      if (
        this.invalidCompany ||
        this.invalidFromState ||
        this.invalidToState ||
        this.invalidDeparturePlace ||
        this.invalidArrivalPlace ||
        this.invalidBus ||
        this.invalidStartedDate ||
        this.invalidStartedTime ||
        this.invalidArrivalDate ||
        this.invalidArrivalTime ||
        this.invalidImage ||
        this.invalidPrize
      ) {
        this.checkSubmit = !this.checkSubmit;
        return;
      }
      for (let item of this.invalidPickUpPoint) {
        if (item.time || item.place) {
          this.checkSubmit = !this.checkSubmit;
          return;
        }
      }
      for (let item of this.invalidDropOffPoint) {
        if (item.time || item.place) {
          this.checkSubmit = !this.checkSubmit;
          return;
        }
      }
      let obj = {
        company: this.company,
        fromState: this.fromState,
        toState: this.toState,
        departurePlace: this.departurePlace,
        arrivalPlace: this.arrivalPlace,
        bus: this.bus,
        startedDate: this.startedDate,
        departureTime: this.startedDate + " " + this.startedTime,
        arrivalTime: this.arrivalDate + " " + this.arrivalTime,
        pickUpPoint: this.pickUpPoint,
        dropOffPoint: this.dropOffPoint,
        prize: this.prize,
        utilites:this.utilites,
        image: this.image,
      };
      console.log(obj);
      this.$store.dispatch(A_POST_NEW_TRIP,obj);
    },
  },
  watch: {
    company() {
      console.log(this.company);
      this.$store.dispatch(A_REQUEST_LIST_BUS_COMPANY, this.company);
      this.$store.dispatch(A_GET_COMPANY, this.company);
    },
    listBus: {
      handler(val) {
        if (val) {
          this.dataListBusRender = val.map((bus) => {
            return {
              _id: bus._id,
              name: bus.licensePlate,
            };
          });
        } else {
          this.dataListBusRender = null;
        }
      },
      deep: true,
    },
  },
  mounted() {
    this.$store.dispatch(A_GET_ALL_COMPANY);
    this.$store.dispatch(A_ALL_PLACE_REQUEST);
    this.$store.dispatch(A_GET_LIST_ULTILITY);
  },
};
</script>
<style scoped>
.radio-container {
  background-color: gainsboro;
  width: 100%;
  min-height: 150px;
}
.ultility-container {
  height: 100px;
  overflow: auto;
}
</style>