import { createRouter, createWebHistory } from "vue-router";
import routes from "./router";
import store from "../store";
import * as types from "../store/login/constant";

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next)=> {
  store.dispatch(types.A_GET_TOKEN);
  store.dispatch(types.A_GET_ADMIN);
  switch(to.meta.guard) {
    case "isHastoken":
      if(store.getters.getToken) {
        next(from.fullPath);
      }
      break;
    case "admin" : 
      if(!store.getters.getAdmin) {
        next(from.fullPath);
      }
      break;
  }
  next()
});

export default router;
