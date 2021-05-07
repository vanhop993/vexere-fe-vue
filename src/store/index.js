import { createStore } from 'vuex';
import login from "./login";
import profile from "./profile";
import FogetPassword from "./ForgetPassword";
import place from "./Place";
import trip from "./Trip";
import company from "./Company";
import bus from "./Bus";
import ultility from "./Ultility";

export default createStore({
  modules: {
    login,profile,FogetPassword,place,trip,company,bus,ultility
  }
})
