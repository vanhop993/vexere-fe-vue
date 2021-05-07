import * as types from "./constant";
import api from "../../api";
const state ={
    loading:false,
    listUltility:null,
    error:null,
}

const mutations = {
    [types.M_REQUEST_ULTILITY]:(state) => {
        state.loading = true;
        state.listUltility = null;
        state.error = null;
    },
    [types.M_SUCCESS_LIST_ULTILITY]:(state,payload) => {
        state.loading = false;
        state.listUltility = payload;
        state.error = null;
    },
    [types.M_ERROR_ULTILITY]:(state,payload) => {
        state.loading = false;
        state.listUltility = null;
        state.error = payload;
    },
}

const actions = {
    [types.A_GET_LIST_ULTILITY]:({commit}) => {
        commit(types.M_REQUEST_ULTILITY);
        api.get("/allutility").then((result) => {
            commit(types.M_SUCCESS_LIST_ULTILITY,result.data);
        }).catch((err) => {
            commit(types.M_ERROR_ULTILITY,err.response.data.message);
        })
    }
}

const getters = {
    loadingUltility:(state) => {
        return state.loading;
    },
    listUltility:(state) => {
        return state.listUltility
    },
    errorUltility:(state) => {
        return state.error
    }
}

export default {
    state,mutations,actions,getters
}