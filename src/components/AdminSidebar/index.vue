<template>
  <section class="sidebar-admin-page">
    <Logo :classLogo="'classLogo'"/>
    <nav class="a-sidebar-nav">
      <ul class="nav nav-pills flex-column d-block">
        <Collapse
          v-for="(menu, index) in sidebar"
          :key="index"
          :title="menu.title.name"
          :plusClass="`a-sidebar-children-border-bottom`"
        >
          <template v-slot:collapseTitle>
            <div
              class="d-flex align-items-center justify-content-between"
            >
              <div class="d-flex align-items-center">
                <Icon :classIcon="menu.title.icon" />
                <span class="a-sidebar-menu-collapse-item">{{ menu.title.name }}</span>
              </div>
              <span class="bi bi-chevron-compact-down a-sidebar-menu-collapse-item"></span>
            </div>
          </template>
          <template v-slot:collapseItems>
            <CollapseItem
              :plusClass="`a-sidebar-border-bottom`"
              v-for="(item, index) in menu.items"
              :key="index"
            >
              <template v-slot:collapse-item>
                <div class="d-flex align-items-center">
                  <Icon :classIcon="item.icon" />
                  <router-link
                    class="a-sidebar-router-link"
                    :to="item.link"
                    >{{ item.name }}</router-link
                  >
                </div>
              </template>
            </CollapseItem>
          </template>
        </Collapse>
      </ul>
    </nav>
  </section>
</template>
<script>
import Icon from "../Icon";
import Collapse from "../Collapse";
import CollapseItem from "../Collapse/CollapseItem";
import { menuSidebar } from "./menuSidebar";
import Logo from "../Logo";
export default {
  data() {
    return {
      sidebar: menuSidebar,
    };
  },
  components: {
    Logo,
    Icon,
    Collapse,
    CollapseItem,
  },
  mounted() {
        const sidebar = document.querySelector(".sidebar-admin-page");
        const adminBody = document.querySelector(".a-template-admin-body");
        const logo = document.querySelector(".logo");
        const collapseMenu= sidebar.querySelectorAll(".a-sidebar-menu-collapse-item");
        // const collapseMenuItem = sidebar.querySelectorAll(".collapse-menu");
        sidebar.addEventListener("click",() => {
            let flag = false;
            for(let item of sidebar.classList){
                if(item === "a-sidebar-children-close"){
                    flag = true;
                }
            }
            if(flag) {
                  sidebar.classList.remove("a-sidebar-children-close");
                adminBody.classList.remove("a-template-body-close");
                logo.querySelector(".nameLogo").classList.remove("d-none");
                collapseMenu.forEach(item =>{
                  item.classList.remove("d-none");
                })
            }
        })  
    },
};
</script>
<style>
.sidebar-admin-page {
  width: 250px;
  z-index: 100;
  transition-duration: 0.5s;
  position: fixed;
  top: 0;
  bottom: 0;
  background-color: #343a40;
  color: #c2c7d0;
}
.classLogo {
  border-bottom: 1px solid #4b545c;
  height: 100px;
  transition-duration: 0.5s;
  font-size: 2.5rem;
}
.a-sidebar-router-link{
    color: #c2c7d0;
    text-decoration: none;
}
.a-sidebar-router-link:hover{
    color: #e1e4eb;
    text-decoration: none;
}
.a-sidebar-children-toggle{
  width: 250px;
}
</style>