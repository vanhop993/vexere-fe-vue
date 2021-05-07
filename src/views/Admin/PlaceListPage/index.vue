<template>
  <div class="bg-white">
    <div class="container">
      <div class="form-group">
        <select class="form-control" @change="handleChange" name="filterPlace">
          <option value="">Tất cả các địa điểm</option>
          <option value="proviceCity">Tỉnh/Thành phố</option>
          <option value="district">Quận huyện</option>
          <option value="station">Bến xe</option>
        </select>
      </div>
      <Table :thList="thList">
        <template v-if="!filterPlace">
          <tr v-for="(item, index) in place" :key="item._id">
            <td>{{ index + 1 }}</td>
            <td>{{ item.name }}</td>
            <td v-if="item.type === 'proviceCity'">Tỉnh/Thành phố</td>
            <td v-if="item.type === 'district'">Quận huyện</td>
            <td v-if="item.type === 'station'">Bến xe</td>
            <td>
              <button class="btn btn-info mr-1">Cập nhập</button>
              <button class="btn btn-danger">Xóa</button>
            </td>
          </tr>
        </template>
        <template v-else>
          <template v-for="(item, index) in place" :key="item._id">
            <tr v-if="item.type === filterPlace">
              <td>{{ index + 1 }}</td>
              <td>{{ item.name }}</td>
              <td v-if="item.type === 'proviceCity'">Tỉnh/Thành phố</td>
              <td v-if="item.type === 'district'">Quận huyện</td>
              <td v-if="item.type === 'station'">Bến xe</td>
              <td>
                <button class="btn btn-info mr-1">Cập nhập</button>
                <button class="btn btn-danger">Xóa</button>
              </td>
            </tr>
          </template>
        </template>
      </Table>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { A_ALL_PLACE_REQUEST } from "../../../store/Place/constant";
import Table from "../../../components/Table";

export default {
  data() {
    return {
      thList: ["Stt", "Tên địa điểm", "Loại địa điểm", ""],
      filterPlace: "",
    };
  },
  components: {
    Table,
  },
  computed: {
    ...mapGetters(["place"]),
  },
  mounted() {
    this.$store.dispatch(A_ALL_PLACE_REQUEST);
  },
  methods: {
    handleChange(e) {
      this.filterPlace = e.target.value
    },
  },
};
</script>

<style>
</style>