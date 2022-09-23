import { createRouter, createWebHistory } from "vue-router";
import routes from "./router";
import store from "../store";
import * as types from "../store/login/constant";
import api from "../api";

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

const checkAdmin = async() => {
  try {
    await api.post("/admin")
    return true
  }catch {
    return false
  }
}

router.beforeEach(async (to, from, next)=> {
  store.dispatch(types.A_GET_TOKEN);
  const admin = await checkAdmin()
  console.log(admin);
  switch(to.meta.guard) {
    case "isHastoken":
      if(store.getters.getToken) {
        next(from.fullPath);
      }
      break;
    case "admin" : 
      if(!admin) {
        next(from.fullPath);
      }
      break;
  }
  next()
});

export default router;
