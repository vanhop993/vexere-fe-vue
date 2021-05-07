<template>
  <div class="bg-white p-3">
    <div class="d-flex align-items-end justify-content-end">
      <router-link class="btn btn-info" exact to="/admin/addbus"
        >Add Bus</router-link
      >
    </div>
    <div class="form-group">
      <label for="">Chọn công ty: </label>
      <select class="form-control" name="" id="" @change="handleInput">
        <option value="">--- Chọn nhà xe ---</option>
        <option v-for="item in listCompany" :key="item._id" :value="item._id">
          {{ item.name }}
        </option>
      </select>
    </div>
    <Table :thList="thList" v-if="dataRender">
      <tr v-for="(item, index) in dataRender" :key="item._id">
        <td>{{ index + 1 }}</td>
        <td>{{ item.company?.name }}</td>
        <td>{{ item.typeBus }}</td>
        <td>{{ item.licensePlate }}</td>
        <td>
          <router-link
            class="btn btn-primary"
            exact
            :to="`/admin/updatebus/${item._id}`"
            >Cập nhập</router-link
          >
          <button class="btn btn-danger" @click="handleDelete(item._id)">
            Xóa
          </button>
        </td>
      </tr>
    </Table>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { A_DELETE_BUS, A_REQUEST_LIST_BUS } from "../../../store/Bus/constant";
import { A_GET_ALL_COMPANY } from "../../../store/Company/constant";
import Table from "../../../components/Table";
import Swal from "sweetalert2";
export default {
  components: {
    Table,
  },
  data() {
    return {
      thList: ["Stt", "Công ty sở hữu", "Loại xe", "Biển số", ""],
      dataRender: null,
    };
  },
  computed: {
    ...mapGetters(["listCompany", "listBus"]),
  },
  methods: {
    handleInput(e) {
      if (e.target.value) {
        console.log(e.target.value);
        this.dataRender = this.listBus.filter(
          (item) => item.company._id == e.target.value
        );
      } else {
        this.dataRender = this.listBus;
      }
    },
    handleDelete(id) {
      Swal.fire({
        title: "Bạn có muốn xóa thông tin?",
        showCancelButton: true,
        confirmButtonText: `Delete`,
      }).then((result) => {
        if (result.isConfirmed) {
          this.$store.dispatch(A_DELETE_BUS, id);
        }
      });
    },
  },
  watch: {
    listBus: {
      handler(val) {
        this.dataRender = val;
      },
      deep: true,
    },
  },
  mounted() {
    this.$store.dispatch(A_GET_ALL_COMPANY);
    this.$store.dispatch(A_REQUEST_LIST_BUS);
  },
};
</script>

<style>
</style>