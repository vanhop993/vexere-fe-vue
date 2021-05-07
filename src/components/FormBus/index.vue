<template>
  <div class="bg-white p-3">
    <h3 v-if="!detailBus">Thêm xe</h3>
    <h3 v-else>Cập nhập thông tin</h3>
    <SearchBoxAutoComplete
      :data="listCompany"
      :placehoder="'Chọn công ty'"
      :titleSelect="'Chọn công ty'"
      :attributeName="'companyId'"
      :valueProps="companyId.name"
      :idInput="`companyId`"
      @event-value="handleInput"
    />
    <Input
      :title="'Biển số xe'"
      :placeholder="'Biển số xe'"
      :name="'licensePlate'"
      :submit="checkSubmit"
      :value="licensePlate"
      :min="1"
      :max="100"
      @event-return-value="handleInput"
    />
    <Input
      :title="'Loại xe'"
      :placeholder="'Loại xe'"
      :name="'typeBus'"
      :submit="checkSubmit"
      :value="typeBus"
      :min="1"
      :max="100"
      @event-return-value="handleInput"
    />
    <div>Chọn hình ảnh</div>
    <div class="radio-container d-flex flex-wrap">
      <template v-if="companyDetail">
        <span v-for="(item, index) in companyDetail.images" :key="item">
          <InputRadioImage
            :title="'img'"
            :data="item"
            :selectProps="imgSelect[index]"
            :index="index"
            @event-return-value="handleInput"
          />
        </span>
      </template>
    </div>
    <div>Chọn ghế</div>
    <div>
      <div>
        <div class="form-group">
          <label for="">Chọn số tầng</label>
          <select
            class="form-control"
            name=""
            id=""
            @change="handleChange"
            ref="floor"
          >
            <option value="1">1 tầng</option>
            <option value="2">2 tầng</option>
          </select>
        </div>
        <div class="form-group">
          <Input
            :title="'Số hàng ghê'"
            :placeholder="'Số hàng ghê'"
            :name="'rowSeats'"
            :submit="checkSubmit"
            :value="rowColListSeats.row"
            :min="1"
            :max="100"
            @event-return-value="handleInput"
          />
          <Input
            :title="'Số dãy ghê'"
            :placeholder="'Số dãy ghê'"
            :name="'colSeats'"
            :submit="checkSubmit"
            :value="rowColListSeats.col"
            :min="1"
            :max="100"
            @event-return-value="handleInput"
          />
        </div>
      </div>
      <div class="d-flex justify-content-between">
        <div>
          <div><strong>Chú thích:</strong></div>
          <div>
            <div class="gheTrong mb-3">
              <IconGhe />
              <span> Còn trống </span>
            </div>
            <!-- <div class="gheDaDat mb-3">
            <IconGhe />
            <span> Ghế đã chọn </span>
          </div> -->
            <div class="gheDangChon mb-3">
              <IconGhe />
              <span> Ghế đang chọn </span>
            </div>
          </div>
        </div>
        <div class="d-flex justify-content-center">
          <div
            v-for="(listSeats, indexObjFloor) in seats"
            :key="indexObjFloor"
            class="mr-2"
          >
            <div class="text-center">Tầng {{ listSeats.floor }}</div>
            <div class="coach d-flex align-items-center justify-content-center">
              <table>
                <tbody>
                  <tr
                    v-for="(item, indexRow) in listSeats.listSeats"
                    :key="item._id"
                  >
                    <td v-for="(seat, indexCol) in item" :key="indexCol">
                      <GheInput
                        :titlt="'seat'"
                        :seat="!seat || seat"
                        :item="item"
                        :floor="indexObjFloor"
                        :row="indexRow"
                        :col="indexCol"
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
    </div>
    <div class="text-center my-3">
      <button class="btn btn-success" @click="handleAdd" v-if="!detailBus">
        Thêm xe
      </button>
      <button class="btn btn-success" @click="handleUpdate" v-else>
        Cập nhập
      </button>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { A_GET_ALL_COMPANY, A_GET_COMPANY } from "../../store/Company/constant";
import { A_POST_NEW_BUS, A_REQUEST_DETAIL_BUS, A_UPDATE_DETAIL_BUS } from "../../store/Bus/constant";
import SearchBoxAutoComplete from "../SearchBoxAutoComplete";
import Input from "../Input/Input";
import InputRadioImage from "../Input/InputRadioImage";
import IconGhe from "../IconGhe";
import GheInput from "../GheInput";
import Swal from "sweetalert2";
export default {
  components: {
    SearchBoxAutoComplete,
    Input,
    InputRadioImage,
    IconGhe,
    GheInput,
  },
  data() {
    return {
      checkSubmit: false,
      rowColListSeats: { row: 0, col: 0 },
      companyId: "",
      invalidCompanyId: true,
      licensePlate: "",
      invalidLicensePlate: true,
      typeBus: "",
      invalidTypeBus: true,
      img: [],
      seats: [
        {
          floor: 1,
          listSeats: [],
        },
      ],
      invalidRowSeats: true,
      invalidColSeats: true,
      imgSelect: [],
    };
  },
  computed: {
    ...mapGetters(["listCompany", "companyDetail", "errorBus", "detailBus"]),
  },
  methods: {
    handleInput(title, value, invalidItem, index) {
      console.log(title, value, invalidItem, index);
      switch (title) {
        case "companyId":
          this.$store.dispatch(A_GET_COMPANY, value);
          this.companyId = value;
          this.invalidCompanyId = invalidItem;
          break;
        case "licensePlate":
          this.licensePlate = value;
          this.invalidLicensePlate = invalidItem;
          break;
        case "typeBus":
          this.typeBus = value;
          this.invalidTypeBus = invalidItem;
          break;
        case "img":
          if (value) {
            this.img.push(value);
          } else {
            this.img.splice(index, 1);
          }
          break;
        case "rowSeats":
          this.rowColListSeats.row = value;
          this.invalidRowSeats = invalidItem;
          for (let item of this.seats) {
            item.listSeats = [];
            for (let index = 0; index < value; index++) {
              item.listSeats.push([]);
            }
          }
          if (this.rowColListSeats.col) {
            for (let item of this.seats) {
              for (let item1 of item.listSeats) {
                for (let index = 0; index < this.rowColListSeats.col; index++) {
                  item1.push(null);
                }
              }
            }
          }
          break;
        case "colSeats":
          this.rowColListSeats.col = value;
          this.invalidColSeats = invalidItem;
          if (this.rowColListSeats.row) {
            for (let item of this.seats) {
              item.listSeats = [];
              for (let index = 0; index < this.rowColListSeats.row; index++) {
                item.listSeats.push([]);
              }
            }
          }
          for (let item of this.seats) {
            for (let item1 of item.listSeats) {
              for (let index = 0; index < value; index++) {
                item1.push(null);
              }
            }
          }

          break;
      }
    },
    handleChange(e) {
      if (this.seats.length <= e.target.value) {
        for (let index = 1; index < e.target.value; index++) {
          let { listSeats } = this.seats[index - 1];
          this.seats = [
            ...this.seats,
            { floor: index + 1, listSeats: [...listSeats] },
          ];
        }
      } else {
        this.seats.splice(1, 1);
      }
    },
    handleSelectSeat(value, floor, row, col) {
      if (value) {
        let obj = { name: value };
        this.seats[floor].listSeats[row][col] = obj;
      } else {
        this.seats[floor].listSeats[row][col] = null;
      }
    },
    handleAdd() {
      if (
        this.invalidCompanyId ||
        this.invalidLicensePlate ||
        this.invalidTypeBus ||
        this.invalidRowSeats ||
        this.invalidColSeats
      ) {
        this.checkSubmit = !this.checkSubmit;
        return;
      }
      let obj = {};
      obj.companyId = this.companyId;
      obj.licensePlate = this.licensePlate;
      obj.typeBus = this.typeBus;
      obj.images = this.img;
      obj.seats = this.seats;
      this.$store.dispatch(A_POST_NEW_BUS, obj);
    },
    handleUpdate() {
      console.log("cap nhap");
      if (
        this.invalidCompanyId ||
        this.invalidLicensePlate ||
        this.invalidTypeBus ||
        this.invalidRowSeats ||
        this.invalidColSeats
      ) {
        this.checkSubmit = !this.checkSubmit;
        return;
      }
      let obj = {};
      obj._id = this.detailBus._id;
      obj.companyId = this.companyId;
      obj.licensePlate = this.licensePlate;
      obj.typeBus = this.typeBus;
      obj.images = this.img;
      obj.seats = this.seats;
      console.log(obj);
      this.$store.dispatch(A_UPDATE_DETAIL_BUS,obj);
    },
  },
  watch: {
    errorBus() {
      Swal.fire({
        icon: "error",
        text: `${this.errorBus}`,
      });
    },
    detailBus: {
      handler(val) {
        if (val) {
          console.log(val);
          this.companyId = val.company;
          this.$store.dispatch(A_GET_COMPANY, val.company._id);
          (this.invalidCompanyId = false),
            (this.licensePlate = val.licensePlate);
          this.invalidLicensePlate = false;
          this.typeBus = val.typeBus;
          this.invalidTypeBus = false;
          this.img = val.images;
          this.rowColListSeats.row = val.seats[0].listSeats.length;
          this.rowColListSeats.col = val.seats[0].listSeats[0].length;
          this.invalidRowSeats = false;
          this.invalidColSeats = false;
          this.seats = val.seats;
          this.$refs.floor.value = this.seats.length;
        }
      },
    },
    companyDetail: {
      handler(val) {
        if (this.img.length > 0) {
          this.imgSelect = val.images.map((item) => {
            // return this.img
            for (let indexSelect of this.img) {
              if (item === indexSelect) {
                return true;
              }
            }
            return false;
          });
        }
      },
    },
  },
  mounted() {
    this.$store.dispatch(A_GET_ALL_COMPANY);
    let idBus = this.$route.params.id;
    if (idBus) {
      this.$store.dispatch(A_REQUEST_DETAIL_BUS, idBus);
    }
  },
};
</script>
<style scoped>
.coach {
  padding: 24px 12px 12px;
  background: rgb(230, 230, 230);
  border-radius: 25px 25px 5px 5px;
}
.radio-container {
  background-color: gainsboro;
  width: 100%;
  min-height: 150px;
}
</style>
<style>
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
</style>