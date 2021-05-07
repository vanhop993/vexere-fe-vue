import * as types from "./constant";
import api from "../../api";
import router from "../../router";
import Swal from "sweetalert2";
const state = {
    loading:false,
    listBus:null,
    detailBus:null,
    error:null,
};

const mutations = {
    [types.M_REQUEST_BUS] : (state) => {
        state.loading = true;
        state.listBus=null;
        state.detailBus=null;
        state.error=null;
    },
    [types.M_SUCCESS_LIST_BUS] : (state,payload) => {
        state.loading = false;
        state.listBus=payload;
        state.detailBus=null;
        state.error=null;
    },
    [types.M_SUCCESS_DETAIL_BUS] : (state,payload) => {
        state.loading = false;
        state.listBus=null;
        state.detailBus=payload;
        state.error=null;
    },
    [types.M_ERROR_BUS] : (state,payload)=>{
        state.loading = false;
        state.listBus=null;
        state.detailBus=null;
        state.error=payload;
    },
};

const actions = {
    [types.A_POST_NEW_BUS] : ({commit} , data) => {
        commit(types.M_REQUEST_BUS);
        api.post("/bus",data).then((result) => {
            commit(types.M_SUCCESS_DETAIL_BUS,result.data);
            router.replace("/admin/listbus");
        }).catch((err) => {
            commit(types.M_ERROR_BUS,err.response.data.massage);
        })
    },
    [types.A_REQUEST_LIST_BUS] : ({commit}) => {
        commit(types.M_REQUEST_BUS);
        api.get("/allbus").then((result) => {
            commit(types.M_SUCCESS_LIST_BUS,result.data);
        }).catch((err)=>{
            commit(types.M_ERROR_BUS,err.response.data.massage);
        })
    },
    [types.A_REQUEST_DETAIL_BUS]:({commit},id) => {
        commit(types.M_REQUEST_BUS);
        api.get(`/bus?_id=${id}`).then((result) => {
            commit(types.M_SUCCESS_DETAIL_BUS,result.data);
        }).catch((err) => {
            commit(types.M_ERROR_BUS,err.response.data.massage);
        })
    },
    [types.A_UPDATE_DETAIL_BUS]:({commit,dispatch},data) => {
        commit(types.M_REQUEST_BUS);
        api.put("/bus",data).then(() => {
            dispatch(types.A_REQUEST_LIST_BUS);
            router.replace("/admin/listbus");
        }).catch((err) => {
            commit(types.M_ERROR_BUS,err.response.data.massage);
        })
    },
    [types.A_DELETE_BUS]:({commit,dispatch},id) => {
        commit(types.M_REQUEST_BUS);
        api.delete(`/bus?id=${id}`).then((result) => {
            Swal.fire({
                icon:"info",
                text:result.data.message,
                timer:2000
            })
            dispatch(types.A_REQUEST_LIST_BUS);
        }).catch((err) => {
            commit(types.M_ERROR_BUS,err.response.data.massage);
        })
    },
    [types.A_REQUEST_LIST_BUS_COMPANY]:({commit},data) => {
        commit(types.M_REQUEST_BUS);
        api.get(`/busofcompany?id=${data}`).then((result) => {
            console.log(result);
            commit(types.M_SUCCESS_LIST_BUS,result.data);
        }).catch((err) => {
            commit(types.M_ERROR_BUS,err.response.data.massage);
        })
    }
}

const getters = {
    busLoading:(state) =>{
        return state.loading;
    },
    listBus:(state) => {
        return state.listBus;
    },
    detailBus:(state) =>{
        return state.detailBus;
    },
    errorBus:(state) => {
        return state.error;
    }
}

export default {
    state,mutations,actions,getters
}