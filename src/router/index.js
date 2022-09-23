import { createRouter, createWebHistory } from "vue-router";
import routes from "./router";
import store from "../store";
import * as types from "../store/login/constant";
import api from "../api";

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next)=> {
  store.dispatch(types.A_GET_TOKEN);
  switch(to.meta.guard) {
    case "isHastoken":
      if(store.getters.getToken) {
        next(from.fullPath);
      }
      break;
    case "admin" : 
        api
          .post("/admin")
          .then(() => {
            next();
          })
          .catch(() => {
            next("/");
          });
      break;
  }
  next()
});

export default router;
