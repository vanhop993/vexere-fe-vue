<template>
  <div class="bg-white p-3">
    <div class="container">
      <h3 class="text-center" v-if="!companyDetail">Thêm mới công ty</h3>
      <h3 class="text-center" v-else>Cập nhập thông tin</h3>
      <form action="">
        <Input
          :title="'Tên công ty'"
          :name="'nameCompany'"
          :submit="checkSubmit"
          :min="1"
          :max="100"
          :value="form.name"
          @event-return-value="handleInput"
        />
        <PanelCanCreate
          :label="'Văn phòng công ty'"
          :title="'office'"
          :arrayRender="form.addressOffice"
          @event-more-panel="handleMorePanel"
          @event-close-panel="handleMorePanel"
        >
          <template v-slot:default="slotProps">
            <label for="">Chọn thành phố</label>
            <div class="mb-2">
              <SearchBoxAutoComplete
                :data="place"
                :titleSelect="'Chọn thành phố'"
                :attributeName="'proviceOffice'"
                :idInput="`proviceOffice${slotProps.index}`"
                :index="slotProps.index"
                :valueProps="form.addressOffice[slotProps.index].place.name"
                @event-value="handleInput"
              />
            </div>
            <DetailAddressOffice
              :title="'detailAddress'"
              :valueProps="form.addressOffice[slotProps.index].address"
              :location="slotProps.index"
              :invalidProps="invalid.addressOffice[slotProps.index].address"
              :checkSubmit="checkSubmit"
              @event-return-value="handleInput"
            />
          </template>
        </PanelCanCreate>
        <PanelCanCreate
          :label="'Các tuyến đường vận chuyển của công ty'"
          :title="'routes'"
          :arrayRender="form.routes"
          @event-more-panel="handleMorePanel"
          @event-close-panel="handleMorePanel"
        >
          <template v-slot:default="slotProps">
            <div class="py-2">
              <label for="">Nơi đi</label>
              <SearchBoxAutoComplete
                :data="place"
                :titleSelect="'Nơi đi'"
                :attributeName="'routesFrom'"
                :idInput="`routesFrom${slotProps.index}`"
                :index="slotProps.index"
                :valueProps="form.routes[slotProps.index].from.name"
                @event-value="handleInput"
              />
            </div>
            <div class="py-2">
              <label for="">Nơi đến</label>
              <SearchBoxAutoComplete
                :data="place"
                :titleSelect="'Nơi đến'"
                :attributeName="'routesTo'"
                :idInput="`routesTo${slotProps.index}`"
                :index="slotProps.index"
                :valueProps="form.routes[slotProps.index].to.name"
                @event-value="handleInput"
              />
            </div>
          </template>
        </PanelCanCreate>
        <div class="add-company-border-top pt-2">
          <div class="form-group">
            <label for="">Chọn hình</label>
            <input
              type="file"
              class="form-control-file"
              name="editor1"
              id="editor1"
              placeholder=""
              aria-describedby="fileHelpId"
              @change="handleFile"
              multiple
            />
          </div>
        </div>
        <div class="add-company-border-top pt-2">
          <div>Lời giới thiệu về công ty</div>
          <div class="form-group">
            <label for="">Tiêu đề</label>
            <input
              type="text"
              name="titleIntro"
              id=""
              class="form-control"
              placeholder=""
              aria-describedby="helpId"
              v-model="objIntro.title"
            />
          </div>
          <Ckeditor
            @event-return-value="handleInput"
            :valueProps="objIntro.content"
          />
        </div>
        <button
          class="btn btn-success"
          @click.prevent="handleAddCompany"
          v-if="!companyDetail"
        >
          Thêm công ty
        </button>
        <button
          class="btn btn-success"
          @click.prevent="handleUpdateCompany"
          v-else
        >
          Cập nhập thông tin
        </button>
      </form>
    </div>
  </div>
</template>
<script>
import Input from "../Input/Input";
import PanelCanCreate from "../Panel/PanelCanCreate";
import SearchBoxAutoComplete from "../SearchBoxAutoComplete";
import DetailAddressOffice from "../DetailAddressOffice";
import Ckeditor from "../Ckeditor";
import { mapGetters } from "vuex";
import { A_ALL_PLACE_REQUEST } from "../../store/Place/constant";
import {
  A_GET_COMPANY,
  A_POST_NEW_COMPANY,
  A_PUT_COMPANY,
} from "../../store/Company/constant";

export default {
  components: {
    Input,
    // InputCanCreate,
    PanelCanCreate,
    SearchBoxAutoComplete,
    Ckeditor,
    DetailAddressOffice,
  },
  computed: {
    ...mapGetters(["placeLoading", "place", "tripLoading", "companyDetail"]),
  },
  data() {
    return {
      checkSubmit: false,
      dataUpdate: null,
      form: {
        name: "",
        addressOffice: [
          { place: "", address: [{ area: "", address: "", hotline: [""] }] },
        ],
        routes: [{ from: "", to: "" }],
        image: [""],
      },
      objIntro: {
        title: "",
        intro: "",
      },
      invalid: {
        name: true,
        addressOffice: [
          {
            place: true,
            address: [{ area: true, address: true, hotline: [true] }],
          },
        ],
        routes: [{ from: true, to: true }],
      },
    };
  },
  methods: {
    handleFile(e) {
      this.form.image = e.target.files;
    },
    handleMorePanel(title, status, index) {
      switch (title) {
        case "office":
          if (status) {
            this.form.addressOffice.push({
              place: "",
              address: [{ area: "", address: "", hotline: [""] }],
            });
            this.invalid.addressOffice.push({
              place: true,
              address: [{ area: true, address: true, hotline: [true] }],
            });
          } else {
            this.form.addressOffice.splice(index, 1);
            this.invalid.addressOffice.splice(index, 1);
          }
          break;
        case "routes":
          if (status) {
            this.form.routes.push({ from: "", to: "" });
            this.invalid.routes.push({ from: true, to: true });
          } else {
            this.form.routes.splice(index, 1);
            this.invalid.routes.splice(index, 1);
          }
          break;
      }
    },
    handleInput(title, value, invalidItem, index) {
      switch (title) {
        case "nameCompany":
          this.invalid.name = invalidItem;
          this.form.name = value;
          break;
        case "detailAddress":
          this.invalid.addressOffice[index].address = invalidItem;
          this.form.addressOffice[index].address = value;
          break;
        case "proviceOffice":
          this.invalid.addressOffice[index].place = invalidItem;
          this.form.addressOffice[index].place = value;
          break;
        case "routesFrom":
          this.invalid.routes[index].from = invalidItem;
          this.form.routes[index].from = value;
          break;
        case "routesTo":
          this.invalid.routes[index].to = invalidItem;
          this.form.routes[index].to = value;
          break;
        case "Ckeditor":
          this.objIntro.intro = value;
          break;
      }
    },
    handleAddCompany() {
      const arrayKeys = Object.keys(this.invalid);
      for (let key of arrayKeys) {
        switch (key) {
          case "name":
            if (this.invalid[key]) {
              this.checkSubmit = !this.checkSubmit;
              return;
            }
            break;
          case "addressOffice":
            for (let item of this.invalid[key]) {
              if (item.place) {
                this.checkSubmit = !this.checkSubmit;
                return;
              }
              for (let item1 of item.address) {
                if (item1.area) {
                  this.checkSubmit = !this.checkSubmit;
                  return;
                }
                if (item1.address) {
                  this.checkSubmit = !this.checkSubmit;
                  return;
                }
                if (item1.hotline.length > 0) {
                  for (let item2 of item1.hotline) {
                    if (item1.hotline[item2]) {
                      this.checkSubmit = !this.checkSubmit;
                      return;
                    }
                  }
                } else {
                  this.checkSubmit = !this.checkSubmit;
                  return;
                }
              }
            }
            break;
          case "routes":
            for (let item of this.invalid[key]) {
              if (item.from) {
                this.checkSubmit = !this.checkSubmit;
                return;
              }
              if (item.to) {
                this.checkSubmit = !this.checkSubmit;
                return;
              }
            }
            break;
        }
      }
      const formData = new FormData();
      for (let key in this.form) {
        let newForm = {};
        if (key === "image") {
          for (let i = 0; i < this.form[key].length; i++) {
            formData.append(key, this.form[key][i]);
          }
        } else {
          newForm[key] = JSON.stringify(this.form[key]);
          formData.append(key, newForm[key]);
        }
      }
      const data = [formData, this.objIntro];
      this.$store.dispatch(A_POST_NEW_COMPANY, data);
    },
    handleUpdateCompany() {
      const arrayKeys = Object.keys(this.invalid);
      for (let key of arrayKeys) {
        switch (key) {
          case "name":
            if (this.invalid[key]) {
              this.checkSubmit = !this.checkSubmit;
              return;
            }
            break;
          case "addressOffice":
            for (let item of this.invalid[key]) {
              if (item.place) {
                this.checkSubmit = !this.checkSubmit;
                return;
              }
              for (let item1 of item.address) {
                if (item1.area) {
                  this.checkSubmit = !this.checkSubmit;
                  return;
                }
                if (item1.address) {
                  this.checkSubmit = !this.checkSubmit;
                  return;
                }
                if (item1.hotline.length > 0) {
                  for (let item2 of item1.hotline) {
                    if (item1.hotline[item2]) {
                      this.checkSubmit = !this.checkSubmit;
                      return;
                    }
                  }
                } else {
                  this.checkSubmit = !this.checkSubmit;
                  return;
                }
              }
            }
            break;
          case "routes":
            for (let item of this.invalid[key]) {
              if (item.from) {
                this.checkSubmit = !this.checkSubmit;
                return;
              }
              if (item.to) {
                this.checkSubmit = !this.checkSubmit;
                return;
              }
            }
            break;
        }
      }
      console.log(this.form);
      const formData = new FormData();
      for (let key in this.form) {
        let newForm = {};
        if (key === "image") {
          for (let i = 0; i < this.form[key].length; i++) {
            formData.append(key, this.form[key][i]);
          }
        } else {
          newForm[key] = JSON.stringify(this.form[key]);
          formData.append(key, newForm[key]);
        }
      }
      this.objIntro.company=this.form._id;
      const data = [formData, this.objIntro];
      this.$store.dispatch(A_PUT_COMPANY, data);
    },
  },
  watch: {
    companyDetail: {
      handler(val) {
        if (val) {
          this.form = { ...val };
          this.invalid.addressOffice = [];
          this.invalid.routes = [];
          this.objIntro = val.introdution;
          this.invalid.name = false;
          for (let item in this.form.addressOffice) {
            let objAddressOffice = {};
            if (this.form.addressOffice[item].place) {
              objAddressOffice.place = false;
            } else {
              objAddressOffice.place = true;
            }
            objAddressOffice.address = [];
            this.invalid.addressOffice.push(objAddressOffice);
            for (let item1 in this.form.addressOffice[item].address) {
              let obj = {};
              if (this.form.addressOffice[item].address[item1].area) {
                obj.area = false;
              } else {
                obj.area = true;
              }
              if (this.form.addressOffice[item].address[item1].address) {
                obj.address = false;
              } else {
                obj.address = true;
              }
              obj.hotline = [];
              this.invalid.addressOffice[item].address.push(obj);
              for (let item2 of this.form.addressOffice[item].address[item1]
                .hotline) {
                if (item2) {
                  this.invalid.addressOffice[item].address[item1].hotline.push(
                    false
                  );
                } else {
                  this.invalid.addressOffice[item].address[item1].hotline.push(
                    true
                  );
                }
              }
            }
          }
          for (let item of this.form.routes) {
            let objRoutes = {};
            if (item.from) {
              objRoutes.from = false;
            } else {
              objRoutes.from = true;
            }
            if (item.to) {
              objRoutes.to = false;
            } else {
              objRoutes.to = true;
            }
            this.invalid.routes.push(objRoutes);
          }
          this.objIntro = val.introdution;
        } else {
          this.form = {
            name: "",
            addressOffice: [
              {
                place: "",
                address: [{ area: "", address: "", hotline: [""] }],
              },
            ],
            routes: [{ from: "", to: "" }],
            image: [""],
          };
          this.invalid = {
            name: true,
            addressOffice: [
              {
                place: true,
                address: [{ area: true, address: true, hotline: [true] }],
              },
            ],
            routes: [{ from: true, to: true }],
          };
          this.objIntro = {
            title: "",
            intro: "",
          };
        }
      },
      deep: true,
    },
  },
  mounted() {
    this.$store.dispatch(A_ALL_PLACE_REQUEST);
    const { id } = this.$route.params;
    if (id) {
      this.$store.dispatch(A_GET_COMPANY, id);
    }
  },
};
</script>
<style>
</style>