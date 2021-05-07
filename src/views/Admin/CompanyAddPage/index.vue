<template>
  <div class="bg-white p-3">
    <div class="container">
      <h3 class="text-center">Thêm mới công ty</h3>
      <form action="">
        <Input
          :title="'Tên công ty'"
          :name="'nameCompany'"
          :checkSubmit="checkSubmit"
          :min="1"
          :max="100"
          @event-return-value="handleInput"
        />
        <div class="add-company-border-top mt-2">
          <InputCanCreate
            :label="'Hotline'"
            :title="'hotline'"
            :titleBtn="'More input'"
            :min="0"
            :max="100"
            :checkSubmit="checkSubmit"
            @event-value="handleInput"
          />
        </div>
        <PanelCanCreate
          :label="'Văn phòng công ty'"
          :title="'office'"
          :arrayRender="form.addressOffice"
          @event-more-panel="handleMorePanel"
          @event-close-panel="handleMorePanel"
        >
          <template v-slot:default="slotProps">
            <label for="">Chọn thành phố</label>
            <SearchBoxAutoComplete
              :data="place"
              :titleSelect="'Chọn thành phố'"
              :attributeName="'proviceOffice'"
              :idInput="`proviceOffice${slotProps.index}`"
              :index="slotProps.index"
              :checkSubmit="checkSubmit"
              @event-value="handleInput"
            />
            <InputCanCreate
              :label="'Địa chỉ văn phòng'"
              :title="'addressOffice'"
              :titleBtn="'More input'"
              :checkSubmit="checkSubmit"
              :location="slotProps.index"
              :min="0"
              :max="100"
              @event-value="handleInput"
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
          <Ckeditor @event-return-value="handleInput" />
        </div>
        <button class="btn btn-success" @click.prevent="handleAddCompany">
          Thêm công ty
        </button>
      </form>
    </div>
  </div>
</template>
<script>
import Input from "../../../components/Input/Input";
import InputCanCreate from "../../../components/Input/InputCanCreate";
import PanelCanCreate from "../../../components/Panel/PanelCanCreate";
import SearchBoxAutoComplete from "../../../components/SearchBoxAutoComplete";
import Ckeditor from "../../../components/Ckeditor";
import { reactive } from "@vue/reactivity";
import { mapGetters } from "vuex";
import { A_ALL_PLACE_REQUEST } from "../../../store/Place/constant";
import { A_POST_NEW_COMPANY } from "../../../store/Company/constant";

export default {
  components: {
    Input,
    InputCanCreate,
    PanelCanCreate,
    SearchBoxAutoComplete,
    Ckeditor
  },
  computed: {
    ...mapGetters(["placeLoading", "place", "tripLoading"]),
  },
  setup() {
    const form = reactive({
      name: "",
      hotlines: [""],
      addressOffice: [{ place: "", address: [""] }],
      routes: [{ from: "", to: "" }],
      image: [""],
    });
    const objIntro = reactive({
      title: "",
      intro: "",
    });
    const invalid = reactive({
      name: true,
      hotlines: [true],
      addressOffice: [{ place: true, address: [true] }],
      routes: [{ from: true, to: true }],
    });
    let submitInvalid = true;
    const handleFile = (e) => {
      form.image = e.target.files;
    };
    const handleMorePanel = (title, status, index) => {
      switch (title) {
        case "office":
          if (status) {
            form.addressOffice.push({ place: "", address: [{ value: "" }] });
            invalid.addressOffice.push({
              place: "",
              address: [{ value: "" }],
            });
          } else {
            form.addressOffice.splice(index, 1);
            invalid.addressOffice.splice(index, 1);
          }
          break;
        case "routes":
          if (status) {
            form.routes.push({ from: "", to: "" });
            invalid.routes.push({ from: true, to: true });
          } else {
            form.routes.splice(index, 1);
            invalid.routes.splice(index, 1);
          }
          break;
      }
    };
    const handleInput = (title, value, invalidItem, index) => {
      switch (title) {
        case "nameCompany":
          invalid.name = invalidItem;
          form.name = value;
          break;
        case "hotline":
          invalid.hotlines = invalidItem;
          form.hotlines = value;
          break;
        case "proviceOffice":
          invalid.addressOffice[index].place = invalidItem;
          form.addressOffice[index].place = value;
          break;
        case "addressOffice":
          invalid.addressOffice[index].address = invalidItem;
          form.addressOffice[index].address = value;
          break;
        case "routesFrom":
          invalid.routes[index].from = invalidItem;
          form.routes[index].from = value;
          break;
        case "routesTo":
          invalid.routes[index].to = invalidItem;
          form.routes[index].to = value;
          break;
        case "Ckeditor":
          objIntro.intro = value;
          break;
      }
    };

    return {
      form,
      objIntro,
      invalid,
      handleInput,
      handleFile,
      handleMorePanel,
      submitInvalid,
    };
  },
  methods: {
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
          case "hotlines":
            for (let item of this.invalid[key]) {
              if (item) {
                this.checkSubmit = !this.checkSubmit;
                return;
              }
            }
            break;
          case "addressOffice":
            for (let item of this.invalid[key]) {
              if (item.place) {
                this.checkSubmit = !this.checkSubmit;
                return;
              }
              for (let item1 of item.address) {
                if (item1) {
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
      const data = [formData,this.objIntro];
      this.$store.dispatch(A_POST_NEW_COMPANY, data);
    },
  },
  mounted() {
    this.$store.dispatch(A_ALL_PLACE_REQUEST);
  },
};
</script>
<style>
</style>