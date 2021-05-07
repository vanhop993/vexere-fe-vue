import router from "../../router";
import api from "./../../api";
import * as types from "./constant";

const state = {
  loading: false,
  email: null,
  secretToken:null,
  error: null,
};

const mutations = {
  [types.M_FORGETPASS_REQUEST_EMAIL]: (state) => {
    state.loading = true;
    state.email = null;
    state.error = null;
  },
  [types.M_FORGETPASS_SUCCESS_EMAIL]: (state, payload) => {
    state.loading = false;
    state.email = payload;
    state.error = null;
  },
  [types.M_FORGETPASS_FAILED_EMAIL]: (state, payload) => {
    state.loading = false;
    state.email = null;
    state.error = payload;
  },
  [types.M_FORGETPASS_REQUEST_SECRET_TOKEN]:(state) => {
    state.loading = true;
    state.secretToken = null;
    state.error = null;
  },
  [types.M_FORGETPASS_SUCCESS_SECRET_TOKEN]:(state,payload) => {
    state.loading = false;
    state.secretToken = payload;
    state.error = null;
  },
  [types.M_FORGETPASS_FAILED_SECRET_TOKEN]: (state, payload) => {
    state.loading = false;
    state.secretToken = null;
    state.error = payload;
  },
  [types.M_FORGETPASS_CLEAR_ERROR]:(state) => {
    state.error = null;
  },
  [types.M_FORGETPASS_CLEAR_DATA]:(state) => {
    state.loading= false;
    state.email= null;
    state.secretToken=null;
    state.error= null;
  }
};

const actions = {
  [types.A_FORGETPASS_REQUEST_EMAIL]: ({ commit }, email) => {
    commit(types.M_FORGETPASS_REQUEST_EMAIL);
    api
      .post(`/forgetpassword?email=${email}`)
      .then(() => {
        commit(types.M_FORGETPASS_SUCCESS_EMAIL, email);
        router.replace(`/forgetpassword/${email}`)
      })
      .catch((err) => {
        commit(types.M_FORGETPASS_FAILED_EMAIL, err.response.data.message);
      });
  },
  [types.A_FORGETPASS_CLEAR_ERROR]: ({commit}) => {
      commit(types.M_FORGETPASS_CLEAR_ERROR);
  },
  [types.A_FORGETPASS_REQUEST_SECRET_TOKEN]: ({commit},payload) => {
    commit(types.M_FORGETPASS_REQUEST_SECRET_TOKEN);
    api.post("/checksecrettoken",payload).then(() => {
      commit(types.M_FORGETPASS_SUCCESS_SECRET_TOKEN, payload.secretToken);
        router.replace(`/forgetpassword/${payload.email}/${payload.secretToken}`);
    }).catch((err)=> {
      commit(types.M_FORGETPASS_FAILED_SECRET_TOKEN,err.response.data.message);
    })
  },
  [types.A_FORGETPASS_RESET_PASSWORD] : ({commit},payload) => {
    commit(types.M_FORGETPASS_REQUEST_SECRET_TOKEN);
    console.log(payload);
    api.post("/resetpassword",payload).then((result) => {
      commit(types.M_FORGETPASS_CLEAR_DATA);
      router.replace("/");
      alert(result.response.data.message);
    }).catch((err)=> {
      commit(types.M_FORGETPASS_FAILED_SECRET_TOKEN,err.response.data.message);
    })
  }
};

const getters = {
  forgetPassLoading: (state) => {
    return state.loading;
  },
  forgetPassEmail: (state) => {
    return state.email;
  },
  forgetPassError: (state) => {
    return state.error;
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
