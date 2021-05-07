import * as types from "./constant";
import api from "../../api";
import router from "../../router";
import Swal from 'sweetalert2'
const state = {
  loading: false,
  listTrips: null,
  totalTrips:null,
  error: null,
  bookTrip:false,
};
const mutations = {
  [types.M_LIST_TRIPS_REQUEST]: (state) => {
    state.loading = true;
    state.listTrips = null;
    state.totalTrips = null,
    state.error = null;
  },
  [types.M_LIST_TRIPS_SUCCESS]: (state, payload) => {
    state.loading = false;
    state.listTrips = payload.listTrips;
    state.totalTrips = payload.totalTrips;
    state.error = null;
  },
  [types.M_LIST_TRIPS_FAILED]: (state, payload) => {
    state.loading = false;
    state.listTrips = null;
    state.totalTrips = null,
    state.error = payload;
  },
  [types.M_BOOK_TICKET_TRIP]: (state) => {
    state.bookTrip = !state.bookTrip;
    state.listTrips = null;
  },
  [types.M_LIST_TRIPS_COMPANY_SUCCESS] : (state,paload) => {
    state.loading = false;
    state.listTrips = paload;
    state.totalTrips = null;
    state.error = null;
  }
};

const actions = {
  [types.A_LIST_TRIPS_REQUEST]: ({ commit }, data) => {
    commit(types.M_LIST_TRIPS_REQUEST);
    api
      .get(
        `/trip?departurePlace=${data.departurePlace}&arrivalPlace=${data.arrivalPlace}&startedDate=${data.startedDate}&pageNumber=${data.pageNumber}&pageSize=10`
      )
      .then((result) => {
        commit(types.M_LIST_TRIPS_SUCCESS, result.data);
        router.push(`/trip/${data.departurePlace}/${data.arrivalPlace}/${data.startedDate}`);
      })
      .catch((err) => {
        commit(types.M_LIST_TRIPS_FAILED, err.response?.data);
      });
  },
  [types.A_BOOK_TICKET_TRIP]:({commit},data) => {
    api.post("/booking",data).then(()=>{
      commit(types.M_LIST_TRIPS_REQUEST);
      Swal.fire({
        icon: 'success',
        title: "Đặt vé thành công",
        showConfirmButton: false,
        timer: 1500
      });
      commit(types.M_BOOK_TICKET_TRIP);
    }).catch((err) => {
      commit(types.M_LIST_TRIPS_FAILED, err.response?.data);
      Swal.fire({
        icon: 'error',
        title: "Đặt vé thất bại",
        showConfirmButton: false,
        timer: 1500
      });
    });
  },
  [types.A_POST_NEW_TRIP]:({commit},data) => {
    commit(types.M_LIST_TRIPS_REQUEST);
    api.post("/trip",data).then(() => {
      Swal.fire({
        icon: 'success',
        title: "Tạo chuyến thành công",
        showConfirmButton: false,
        timer: 1500
      });
    }).catch ((err)=> {
      commit(types.M_LIST_TRIPS_FAILED, err.response?.data);
    })
  },
  [types.A_GET_TRIP_COMPANY]:({commit},id) => {
    commit(types.M_LIST_TRIPS_REQUEST);
    api.get(`/tripcompany?_id=${id}`).then((result) => {
      commit(types.M_LIST_TRIPS_COMPANY_SUCCESS,result.data)
    }).catch((err) => {
      commit(types.M_LIST_TRIPS_FAILED, err.response?.data);
    })
  }
};

const getters = {
  tripLoading: (state) => {
    return state.loading;
  },
  listTrips: (state) => {
    return state.listTrips;
  },
  tripError: (state) => {
    return state.error;
  },
  totalTrips: (state) => {
    return state.totalTrips;
  },
  bookTrip:(state) => {
    return state.bookTrip;
  }
};

export default {
  state,
  mutations,
  actions,
  getters,
};
