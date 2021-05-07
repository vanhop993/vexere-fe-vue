<template>
  <section class="a-template-admin">
    <AdminSidebar />
    <div class="a-template-admin-body">
      <AdminNarbar />
      <div class="a-template-admin-content">
        <router-view></router-view>
      </div>
    </div>
  </section>
</template>
<script>
import AdminSidebar from "../../components/AdminSidebar";
import AdminNarbar from "../../components/AdminNavbar";
export default {
  components: {
    AdminSidebar,
    AdminNarbar,
  },
};
</script>
<style scoped>
.a-template-admin-content {
  background-color: #ecf0f5;
  padding: 15px;
}
.a-template-admin-body {
  margin-left: 250px;
  transition-duration: 0.5s;
}
.a-template-body-close {
  margin-left: 80px;
}
</style>
<style>
body {
  background-color: #ecf0f5;
}
</style>