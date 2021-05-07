import { createRouter, createWebHistory } from "vue-router";
import api from "../api";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Client"),
    children: [
      {
        path: "/",
        component: () => import("../views/Client/Home"),
      },
      {
        path: "/trip/:departurePlace/:arrivalPlace/:startedDate",
        component: () => import("../views/Client/BookTrip"),
      },
      {
        path: "/signin",
        component: () => import("../views/Client/Signin"),
        beforeEnter: (to, from, next) => {
          const token = localStorage.getItem("token");
          if (token) {
            next("/");
          } else {
            next();
          }
        },
      },
      {
        path: "/signup",
        component: () => import("../views/Client/Signup"),
        beforeEnter: (to, from, next) => {
          const token = localStorage.getItem("token");
          if (token) {
            next("/");
          } else {
            next();
          }
        },
      },
      {
        path: "/profile",
        component: () => import("../views/Client/Profile"),
        beforeEnter: (to, from, next) => {
          if (!localStorage.getItem("token")) {
            next("/signin");
          }
          next();
        },
      },
      {
        path: "/forgetpassword",
        component: () => import("../views/Client/ForgetPassword"),
        beforeEnter: (to, from, next) => {
          if (localStorage.getItem("token")) {
            next("/");
          }
          next();
        },
      },
      {
        path: "/forgetpassword/:email",
        component: () => import("../views/Client/CheckSecretToken"),
        beforeEnter: (to, from, next) => {
          if (localStorage.getItem("token")) {
            next("/");
          }
          next();
        },
      },
      {
        path: "/forgetpassword/:email/:secretToken",
        component: () => import("../views/Client/ResetPassword"),
        beforeEnter: (to, from, next) => {
          if (localStorage.getItem("token")) {
            next("/");
          }
          next();
        },
      },
    ],
  },
  {
    path: "/admin",
    redirect: "/admin/dashboard",
    beforeEnter: (to, from, next) => {
      api
        .post("/admin")
        .then(() => {
          next();
        })
        .catch(() => {
          next("/");
        });
    },
  },
  {
    path: "/admin",
    component: () => import("../views/Admin"),
    beforeEnter: (to, from, next) => {
      api
        .post("/admin")
        .then(() => {
          next();
        })
        .catch(() => {
          next("/");
        });
    },
    children: [
      {
        path: "/admin/dashboard",
        component: () => import("../views/Admin/DashboardPage"),
        beforeEnter: (to, from, next) => {
          api
            .post("/admin")
            .then(() => {
              next();
            })
            .catch(() => {
              next("/");
            });
        },
      },
      {
        path: "/admin/listcompany",
        component: () => import("../views/Admin/CompanyListPage"),
      },
      {
        path: "/admin/addcompany",
        component: () => import("../components/FormCompany"),
      },
      {
        path: "/admin/updatecompany/:id",
        component: () => import("../components/FormCompany"),
      },
      {
        path: "/admin/listbus",
        component: () => import("../views/Admin/BusListPage"),
      },  
      {
        path: "/admin/addbus",
        component: () => import("../components/FormBus"),
      },
      {
        path: "/admin/updatebus/:id",
        component: () => import("../components/FormBus"),
      },
      {
        path: "/admin/listtrip",
        component: () => import("../views/Admin/TripListPage"),
      },
      {
        path: "/admin/addtrip",
        component: () => import("../components/FormTrip"),
      },
      {
        path: "/admin/listplace",
        component: () => import("../views/Admin/PlaceListPage"),
      },
      {
        path: "/admin/listuser",
        component: () => import("../views/Admin/UserListPage"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
