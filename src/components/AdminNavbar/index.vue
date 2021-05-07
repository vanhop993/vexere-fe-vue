<template>
  <section class="a-header">
    <div class="a-header-childer">
      <div class="a-header-container">
        <div class="a-header-user">
          <User />
        </div>
        <div class="a-header-btn-slidebar">
          <Icon :classIcon="'bi bi-justify btn-control-slidebar'"/>
        </div>
      </div>
    </div>
    <div class="c-subheader bg-light">
      <ol class="breadcrumb border-0 mb-0">
        <li role="presentation" class="breadcrumb-item">
          <a href="#/" class="router-link-active" target="_self"> Admin </a>
        </li>
        <li role="presentation" class="active breadcrumb-item">
          <span>{{breadcrumb}}</span>
        </li>
      </ol> 
    </div>
  </section>
</template>
<script>
import User from '../User';
import Icon from '../Icon';
export default {
    components:{User, Icon},
    mounted() {
        const btnControlSidebar = document.querySelector(".btn-control-slidebar");
        const sidebar = document.querySelector(".sidebar-admin-page");
        const adminBody = document.querySelector(".a-template-admin-body");
        const logo = document.querySelector(".logo");
        const collapseMenu= sidebar.querySelectorAll(".a-sidebar-menu-collapse-item");
        const collapseMenuItem = sidebar.querySelectorAll(".collapse-menu");
        btnControlSidebar.addEventListener("click",() => {
            let flag = false;
            for(let item of sidebar.classList){
                if(item === "a-sidebar-children-close"){
                    flag = true;
                }
            }
            if(!flag) {
                sidebar.classList.add("a-sidebar-children-close");
                adminBody.classList.add("a-template-body-close");
                logo.querySelector(".nameLogo").classList.add("d-none");
                collapseMenu.forEach(item =>{
                  item.classList.add("d-none");
                })
                collapseMenuItem.forEach(item => {
                  item.classList.remove("show");
                })
            }else{
                sidebar.classList.remove("a-sidebar-children-close");
                adminBody.classList.remove("a-template-body-close");
                logo.querySelector(".nameLogo").classList.remove("d-none");
                collapseMenu.forEach(item =>{
                  item.classList.remove("d-none");
                })
            }
        })  
    },
}
</script>
<style scoped>
.btn-control-slidebar{
  cursor: pointer;
}
.a-header {
  position: sticky;
  top: 0;
  z-index: 1000;
  box-shadow: 1px 10px 5px #aaaaaa;
}
.a-header-childer {
  height: 50px;
  right: 0;
  left: 0;
  background-color: white;
  border-bottom: 1px solid #dee2e6;
}
.a-header-container {
  height: inherit;
  position: relative;
  z-index: 1000;
}
.a-header-user {
  position: absolute;
  right: 3%;
  top: 50%;
  transform: translateY(-50%);
}
.a-header-btn-slidebar {
  position: absolute;
  left: 3%;
  top: 50%;
  transform: translateY(-50%);
}
.breadcrumb {
  background-color: white;
}
</style>
<style>
.a-sidebar-children-close {
  width: 80px;
}
.a-template-body-close{
  margin-left: 80px;
}
</style>