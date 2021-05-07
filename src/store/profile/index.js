import api from "../../api";
import * as Types from "./constant";
// import Swal from "sweetalert2";
const state = {
  profile: null,
};
const mutations = {
  [Types.M_PROFILE]: (state, payload) => {
    state.profile = payload;
  },
  [Types.M_REMOVE_PROFILE]: (state) => {
    state.profile = null;
  },
};
const actions = {
  [Types.A_FETCH_PROFILE]: ({ commit }) => {
    api
      .get("/profile")
      .then((res) => {
        commit(Types.M_PROFILE, res.data);
      })
      .catch(() => {
        commit(Types.M_REMOVE_PROFILE);
      });
  },
  [Types.A_REMOVE_PROFILE]: ({ commit }) => {
    commit(Types.M_REMOVE_PROFILE);
  },
};
const getters = {
  getterProfile: (state) => {
    return state.profile;
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
