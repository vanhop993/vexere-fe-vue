<template>
  <div>
    <PanelCanCreate
      :label="'Chi tiết văn phòng'"
      :title="'detailOffice'"
      :arrayRender="arrRender"
      @event-more-panel="handleMorePanel"
      @event-close-panel="handleMorePanel"
    >
      <template v-slot:default="slotProps">
        <Input
          :title="'Vùng'"
          :name="'area'"
          :submit="checkSubmit"
          :index="slotProps.index"
          :min="1"
          :max="100"
          :value="arrRender[slotProps.index].area"
          @event-return-value="handleInput"
        />
        <Input
          :title="'Địa chỉ văn phòng'"
          :name="'address'"
          :submit="checkSubmit"
          :index="slotProps.index"
          :min="0"
          :max="100"
          :value="arrRender[slotProps.index].address"
          @event-return-value="handleInput"
        />
        <InputCanCreate
          :label="'Hotline'"
          :title="'hotline'"
          :titleBtn="'More input'"
          :location="slotProps.index"
          :min="0"
          :max="100"
          :value="arrRender[slotProps.index].hotline"
          :checkSubmit="checkSubmit"
          @event-value="handleInput"
        />
      </template>
    </PanelCanCreate>
  </div>
</template>
<script>
import InputCanCreate from "../Input/InputCanCreate";
import Input from "../Input/Input";
import PanelCanCreate from "../Panel/PanelCanCreate";
export default {
  props: ["title", "location","checkSubmit","valueProps","invalidProps"],
  components: {
    InputCanCreate,
    Input,
    PanelCanCreate,
  },
  data() {
    return {
      arrRender: [{ area: "", address: "", hotline: [""] }],
      invalidAddress: [{ area: true, address: true, hotline: [true] }],
    };
  },
  methods: {
    handleMorePanel(title, status, index) {
      // console.log(title, status, index);
      switch (title) {
        case "detailOffice":
          if (status) {
            this.arrRender.push({
              area: "",
              address: "",
              hotline: [""],
            });
            this.invalidAddress.push({
              area: true,
              address: true,
              hotline: [true],
            });
          } else {
            this.arrRender.splice(index, 1);
            this.invalidAddress.splice(index, 1);
            this.$emit(
              "event-return-value",
              this.title,
              this.arrRender,
              this.invalidAddress,
              this.location
            );
          }
          break;
      }
    },
    handleInput(title, value, invalidItem, index) {
      console.log(title, value, invalidItem, index);
      switch (title) {
        case "area":
          this.arrRender[index][title] = value;
          this.invalidAddress[index][title] = invalidItem;
          this.$emit(
            "event-return-value",
            this.title,
            this.arrRender,
            this.invalidAddress,
            this.location
          );
          break;
        case "address":
          this.arrRender[index][title] = value;
          this.invalidAddress[index][title] = invalidItem;
          this.$emit(
            "event-return-value",
            this.title,
            this.arrRender,
            this.invalidAddress,
            this.location
          );
          break;
        case "hotline":
          // console.log(this.invalidAddress[index]);
          this.arrRender[index][title] = value;
          this.invalidAddress[index][title] = invalidItem;
          this.$emit(
            "event-return-value",
            this.title,
            this.arrRender,
            this.invalidAddress,
            this.location
          );
      }
    },
  },
  watch:{
      valueProps:{
          handler(val){
              if(val){
                  this.arrRender = val;
              }else{
                  this.arrRender = [{ area: true, address: true, hotline: [true] }];
              }
          }
      },
      invalidProps:{
        handler(val){
          console.log(val);
              if(val){
                  this.invalidAddress = val;
              }else{
                  this.arrRender = [{ area: "", address: "", hotline: [""] }];
              }
          }
      }
  },
  mounted() {
      this.arrRender = this.valueProps;
  },
};
</script>
<style>
</style>