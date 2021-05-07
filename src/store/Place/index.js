
import api from "../../api";
import * as types from "./constant";
const state = {
    loading :false,
    place:null,
    error:null,
};
const mutations = {
    [types.M_ALL_PLACE_LOADING] : (state) => {
        state.loading =true;
        state.place=null;
        state.error=null;
    },
    [types.M_ALL_PLACE_SUCCESS] : (state,payload) => {
        state.loading =false;
        state.place=payload;
        state.error=null;
    },
    [types.M_ALL_PLACE_FAILED] : (state,payload) => {
        state.loading =false;
        state.place=null;
        state.error=payload;
    } 
};
const actions = {
    [types.A_ALL_PLACE_REQUEST] : ({commit}) => {
        commit(types.M_ALL_PLACE_LOADING);
        api.get("/place").then((result) => {
            commit(types.M_ALL_PLACE_SUCCESS,result.data);
        }).catch((err) => {
            commit(types.M_ALL_PLACE_FAILED,err.response?.data)
        })
    }
};
const getters ={
    placeLoading : (state) => {
        return state.loading;
    },
    place : (state) => {
        return state.place;
    }
}

export default {
    state,mutations,actions,getters
}