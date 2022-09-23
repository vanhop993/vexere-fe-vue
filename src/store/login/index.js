import api from "../../api";
import router from "../../router";
import setHeaders from "../../utils/setHeaders";
import { A_FETCH_PROFILE } from "../profile/constant";
import * as types from "./constant";
import Swal from "sweetalert2";
import jwtDecode from "jwt-decode";
const state = {
  loading: false,
  err: null,
  token: null,
  admin: false,
};
const mutations = {
  [types.M_SIGNIN_REQUEST]: (state) => {
    state.loading = true;
    state.err = null;
    state.token = null;
  },

  [types.M_SIGNIN_SUCCESS]: (state, payload) => {
    state.loading = false;
    state.err = null;
    state.token = payload;
  },

  [types.M_SIGNIN_FAILED]: (state, payload) => {
    state.loading = false;
    state.err = payload;
    state.token = null;
  },
  [types.M_SIGNIN_CLEAR]: (state) => {
    state.loading = false;
    state.err = null;
    state.token = null;
  },
  [types.M_SET_ADMIN]: (state, payload) => {
    state.admin = payload;
  },
};
const actions = {
  [types.A_SAVE_LOCALSTORAGE]:({dispatch},payload) => {
    const user = jwtDecode(payload);
    localStorage.setItem("token", payload);
    localStorage.setItem("exp",user.exp)
    setHeaders(payload);   
    const exp = (user.exp - user.iat)*1000;
    dispatch(types.A_SET_TIMEOUT_LOGOUT,exp)
    dispatch(A_FETCH_PROFILE);
  },
  [types.A_SIGNIN_APP]: ({ commit,dispatch }, form) => {
    commit(types.M_SIGNIN_REQUEST);
    api
      .post("/signin", form)
      .then((result) => {
        commit(types.M_SIGNIN_SUCCESS, result.data);
        dispatch(types.A_SAVE_LOCALSTORAGE,result.data);
        router.replace("/");
      })
      .catch((err) => {
        commit(types.M_SIGNIN_FAILED, err);
        Swal.fire({
          text: err.response.data.message || "error signin",
          icon: "error",
        });
      });
  },
  [types.A_SIGNIN_FACEBOOK]: ({ commit,dispatch }, token) => {
    commit(types.M_SIGNIN_REQUEST);
    api
      .post("/facebook/signin", token)
      .then((result) => {
        commit(types.M_SIGNIN_SUCCESS, result.data);
        dispatch(types.A_SAVE_LOCALSTORAGE,result.data);
        router.replace("/");
      })
      .catch((err) => {
        commit(types.M_SIGNIN_FAILED, err);
        Swal.fire({
          text: err.response.data.message || "error signin",
          icon: "error",
        });
      });
  },
  [types.A_SIGNIN_GOOGLE]: ({ commit,dispatch }, token) => {
    commit(types.M_SIGNIN_REQUEST);
    api
      .post("/auth/google/token", token)
      .then((result) => {
        commit(types.M_SIGNIN_SUCCESS, result.data);
        dispatch(types.A_SAVE_LOCALSTORAGE,result.data);
        router.replace("/");
      })
      .catch((err) => {
        commit(types.M_SIGNIN_FAILED, err);
        Swal.fire({
          text: err.response.data.message || "error signin",
          icon: "error",
        });
      });
  },
  [types.A_TRY_SIGNIN]: ({ commit,dispatch }) => {
    const token = localStorage.getItem("token");
    const exp = localStorage.getItem("exp");
    if(!token){
      return ;
    }
    const date = new Date();
    if(date > exp*1000){
      dispatch(A_FETCH_PROFILE);
      dispatch(types.A_SIGN_OUT);
      return
    }
    setHeaders(token);  
    commit(types.M_SIGNIN_SUCCESS, token);
    dispatch(types.A_SAVE_LOCALSTORAGE,token);
  },
  [types.A_SET_TIMEOUT_LOGOUT]:({dispatch},exp)=>{
    setTimeout(() => {
      Swal.fire({
        text: "Lượt đăng nhập của bạn đã hết hạn , vui lòng đăng nhập lại:",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sign in",
      }).then((result) => {
        if (result.isConfirmed) {
          router.replace("/signin");
          dispatch(types.A_SIGN_OUT);
        }
      });
      // dispatch(A_FETCH_PROFILE);
      dispatch(types.A_SIGN_OUT);
      router.push("/");
    },exp)
  },
  [types.A_SIGN_OUT]: ({ commit }) => {
    localStorage.removeItem("token");
    localStorage.removeItem("exp");
    setHeaders(null);
    commit(types.M_SIGNIN_CLEAR);
  },
  [types.A_GET_TOKEN]: ({commit}) => {
    commit(types.M_SIGNIN_SUCCESS, localStorage.getItem("token"))
  },
  [types.A_GET_ADMIN]: ({commit}) => {
    api
      .post("/admin")
      .then(() => {
        commit(types.M_SET_ADMIN, true)
      })
      .catch(() => {
        commit(types.M_SET_ADMIN, false)
      });
  }
};
const getters = {
  loadingAuth: (state) => {
    return state.loading;
  },
  errAuth: (state) => {
    return state.err;
  },
  getToken: (state) => {
    return state.token
  },
  getAdmin: state => {
    return state.admin
  }
};

export default {
  state,
  mutations,
  actions,
  getters,
};
