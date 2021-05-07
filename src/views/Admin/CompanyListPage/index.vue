<template>
  <div class="bg-white">
    <div class="d-flex justify-content-end">
      <router-link class="btn btn-success m-3" exact to="/admin/addcompany"
        >Add Company</router-link
      >
    </div>
    <div class="container">
      <Table :thList="thList" v-if="listCompany">
        <tr v-for="(item, index) in listCompany" :key="item._id">
          <td>{{ index + 1 }}</td>
          <td>{{ item.name }}</td>
          <td>
            <div v-for="(item1, index) in item.addressOffice" :key="index">
              <strong>{{ item1.place.name }}</strong>
              <ul>
                <li
                  v-for="(itemAddress, index1) in item1.address"
                  :key="index1"
                > 
                  {{itemAddress.area}}
                  {{itemAddress.address}}
                  <ul>
                    <li v-for="(itemHotline,index) in itemAddress.hotline" :key="index">
                      {{itemHotline}}
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </td>
          <td>
            <div v-for="(item2, index) in item.routes" :key="index">
              {{ item2.from.name }} đi {{item2.to.name}}
            </div>
          </td>
          <td>{{ item.overall }} / {{ item.overallCount }}</td>
          <td class="d-flex">
            <router-link class="btn btn-info text-nowrap mr-1" exact :to="`/admin/updatecompany/${item._id}`">Cập nhập</router-link>
            <button class="btn btn-danger text-nowrap" @click="handleDelete(item._id)">Delete</button>
          </td>
        </tr>
      </Table>
    </div>
    <!-- <Modal1>
      <FormCompany :dataUpdate="dataUpdate"/>
    </Modal1> -->
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Table from "../../../components/Table";
import { A_CLEAR_COMPANY_DETAIL, A_DELETE_COMPANY, A_GET_ALL_COMPANY, A_GET_COMPANY } from "../../../store/Company/constant";
// import ButtonModal from "../../../components/Modal/ButtonModal";
// import FormCompany from "../../../components/FormCompany";
export default {
  components: {
    Table
  },
  computed: {
    ...mapGetters(["listCompany","companyDetail"]),
  },
  data(){
    return {
      dataUpdate:null,
    }
  },
  setup() {
    const thList = [
      "Stt",
      "Tên công ty",
      "Địa chỉ",
      "Số điện thoại",
      "Tổng điểm đánh giá/Số người đánh giá",
      "",
    ];
    return { thList };
  },
  methods: {
    handleDelete (id) {
      this.$store.dispatch(A_DELETE_COMPANY,id);
    },
    handleUpdate (_id) {
      console.log(_id);
      this.$store.dispatch(A_GET_COMPANY,_id);
    },
    handleModleAddCompany(){
      this.$store.dispatch(A_CLEAR_COMPANY_DETAIL);
    }
  },  
  watch:{
    companyDetail:{
      handler(val){
        this.dataUpdate = val;
      },
      deep:true,
    }
  },
  mounted() {
    this.$store.dispatch(A_GET_ALL_COMPANY);
  },
};
</script>

<style>
</style>