import api from "../../api";
import * as types from "./constant";
import Swal from "sweetalert2";
import { A_FETCH_PROFILE } from "../profile/constant";
import router from "../../router";
const state = {
    loading:false,
    companyDetail:null,
    listCompany:null,
    error:null,
};

const mutations = {
    [types.M_COMPANY_REQUEST]:(state) => {
        state.loading = true;
        state.companyDetail = null;
        state.error=null;
    },
    [types.M_COMPANY_SUCCESS]:(state,payload) => {
        state.loading = false;
        state.companyDetail = payload;
        state.error=null;
    },
    [types.M_LIST_COMPANY_SUCCESS]:(state,payload) => {
        state.loading = false;
        state.listCompany = payload;
        state.error=null;
    },
    [types.M_COMPANY_ERROR]:(state,payload) => {
        state.loading = true;
        state.companyDetail = null;
        state.error=payload;
    },
    [types.M_CLEAR_COMPANY_DETAIL]:(state) => {
        state.loading = true;
        state.companyDetail = null;
        state.error=null;
    }
};

const actions = {
    [types.A_GET_COMPANY]: ({commit},data) => {
        commit(types.M_COMPANY_REQUEST);
        api.get(`/company?_id=${data}`).then((result) => {
            commit(types.M_COMPANY_SUCCESS,result.data);
        }).catch((err) => {
            commit(types.M_COMPANY_ERROR,err.response.data.message);
        })
    },
    [types.A_GET_ALL_COMPANY]:({commit}) => {
        commit(types.M_COMPANY_REQUEST);
        api.get("/allcompany").then((result) => {
            commit(types.M_LIST_COMPANY_SUCCESS,result.data);
        }).catch((err) => {
            commit(types.M_COMPANY_ERROR,err.response.data.message);
        })
    },
    [types.A_DELETE_COMPANY]:({commit,dispatch},id) => {
        commit(types.M_COMPANY_REQUEST);
        api.delete(`/company?id=${id}`).then((result) => {
            Swal.fire({
                title:`${result.data.message}`,
                icon: "success",
                timer:"3000"
            })
            dispatch(types.A_GET_ALL_COMPANY)
        }).catch((err) => {
            dispatch(A_FETCH_PROFILE)
            commit(types.M_COMPANY_ERROR,err.response.data.message);
            Swal.fire({
                title:err.response.data.message || `Error!can not delete company`,
                icon: "error",
                timer:"3000"
            })
        })
    },
    [types.A_POST_NEW_COMPANY]:({commit,dispatch},data) =>{
        commit(types.M_COMPANY_REQUEST);
        api.post("/company",data[0]).then((result) => {
            if(data[1]){
                let obj = {
                    company:result.data._id,
                    ...data[1]
                }
                dispatch(types.A_POST_NEW_INTRO_COMPANY,obj);
            }else{
                Swal.fire({
                    text: "Lưu nhà xe thành công",
                    icon: "success",
                    timer: 1500
                  })
                dispatch(types.A_GET_ALL_COMPANY);
            }
            router.replace("/admin/listcompany")
        }).catch((err)=>{
            dispatch(A_FETCH_PROFILE)
            commit(types.M_COMPANY_ERROR,err.response.data.message);
        })
    },
    [types.A_POST_NEW_INTRO_COMPANY]:({commit,dispatch},intro) => {
        commit(types.M_COMPANY_REQUEST);
        api.post("/company/introduce",intro).then((result) =>{
            dispatch(types.A_GET_ALL_COMPANY);
            Swal.fire({
                text: `${result.data.message}`,
                icon: "success",
                timer: 1500
              })
            dispatch(types.A_GET_ALL_COMPANY);
            router.replace("/admin/listcompany");
        }).catch((err) => {
            dispatch(A_FETCH_PROFILE)
            commit(types.M_COMPANY_ERROR,err.response.data.message);
        })
    },
    [types.A_CLEAR_COMPANY_DETAIL]:({commit}) =>{
        commit(types.M_CLEAR_COMPANY_DETAIL);
    },
    [types.A_PUT_COMPANY]:({commit,dispatch},data) =>{
        commit(types.M_COMPANY_REQUEST);
        api.put("/company",data[0]).then(() => {
            dispatch(types.A_PUT_COMPANY_INTRO,data[1]);
        }).catch((err) => {
            dispatch(A_FETCH_PROFILE)
            commit(types.M_COMPANY_ERROR,err.response.data.message);
        })
    },
    [types.A_PUT_COMPANY_INTRO]:({commit,dispatch},data) =>{
        commit(types.M_COMPANY_REQUEST);
        api.put("/company/introduce",data).then((result) => {
            Swal.fire({
                text: `${result.data.message}`,
                icon: "success",
                timer: 1500
              })
            dispatch(types.A_GET_ALL_COMPANY);
            router.replace("/admin/listcompany");
        }).catch((err) => {
            dispatch(A_FETCH_PROFILE)
            commit(types.M_COMPANY_ERROR,err.response.data.message);
        })
    }
};

const getters = {
    companyLoading:(state) => {
        return state.loading;
    },
    companyDetail:(state) => {
        return state.companyDetail;
    },
    listCompany:(state) => {
        return state.listCompany;
    },
    companyError:(state) => {
        return state.error;
    },
}

export default {
    state,mutations,actions,getters
}