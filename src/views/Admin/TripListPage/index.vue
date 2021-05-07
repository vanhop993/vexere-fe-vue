<template>
  <div class="bg-white p-3">
    <div class="d-flex justify-content-end">
      <router-link class="btn btn-success" exact to="/admin/addtrip"
        >Add Trip</router-link
      >
    </div>
    <!-- {{listCompany}} -->
     <div class="form-group">
      <label for="">Chọn công ty: </label>
      <select class="form-control" name="" id="" @change="handleInput">
        <option value="">--- Chọn nhà xe ---</option>
        <option v-for="item in listCompany" :key="item._id" :value="item._id">
          {{ item.name }}
        </option>
      </select>
    </div>
    <h3>Danh sách chuyến đi</h3>
    <Table :thList="thList" v-if="listTrips">
      <tr v-for="(item, index) in listTrips" :key="item._id">
        <td>{{ index + 1 }}</td>
        <td>{{ item.company?.name }}</td>
        <td>{{ item.bus.licensePlate}}</td>
        <td>
          <ul>
            <li v-for="item1 in item.utilites" :key="item1._id">
              {{item1.name}}
            </li>
          </ul>
        </td>
        <td>
          <ul>
            <li v-for="item2 in item.pickUpPoint" :key="item2._id">
              {{item2.time}} - {{item2.place}}
            </li>
          </ul>
        </td>
         <td>
          <ul>
            <li v-for="item3 in item.dropOffPoint" :key="item3._id">
              {{item3.time}} - {{item3.place}}
            </li>
          </ul>
        </td>
        <td>
          {{item.prize}} VNĐ
        </td>
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
// import { A_LIST_TRIPS_REQUEST } from "../../../store/Trip/constant";
import Table from "../../../components/Table";
import { A_GET_ALL_COMPANY } from '../../../store/Company/constant';
import { A_GET_TRIP_COMPANY } from '../../../store/Trip/constant';
export default {
  data() {
    return {
      thList: [
        "Stt",
        "Tên công ty",
        "Xe",
        "Tiện ích chuyến đi",
        "Các điểm đón khách",
        "Các điểm trả khách",
        "Giá",
        "",
      ],
      company:"",
    };
  },
  components: {
    Table,
  },
  computed: {
    ...mapGetters(["listTrips","listCompany"]),
  },
  methods:{
    handleInput(e){
      this.$store.dispatch(A_GET_TRIP_COMPANY,e.target.value);
    }
  },
  mounted() {
    this.$store.dispatch(A_GET_ALL_COMPANY);
    // this.$store.dispatch(A_LIST_TRIPS_REQUEST);
  },
};
</script>

<style>
</style>