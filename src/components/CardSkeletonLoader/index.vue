<template>
  <div class="container-fluid mb-2 card-skeleton-loader">
    <div class="row border-skeleton-card">
      <div class="col-12 col-md-3 p-0 card-skeleton-container-img d-none d-md-block">
        <img />
      </div>
      <div class="col-12 col-md-9 mb-2">
        <div class="card-skeleton-text"></div>
        <div class="type-bus card-skeleton-text"></div>
        <div class="card-skeleton-text"></div>
        <div class="card-skeleton-text mt-3"></div>
      </div>
      <div class="card-skeleton-text mt-2 card-skeleton-container-btn"></div>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style scoped>
.border-skeleton-card {
  padding: 16px;
  border: 1px solid;
  border-radius: 4px;
  border: 1px solid rgb(192, 192, 192);
  transition-duration: 0.5s;
  background-color: white;
}
.card-skeleton-container-img{
  overflow: hidden;
}
.card-skeleton-loader img {
  position: relative;
  width: 100%;
  height: 150px;
  background-color: #dddddd;
}

.card-skeleton-text {
  position: relative;
  width: 100%;
  height: 24px;
  background-color: #dddddd;
  overflow: hidden;

}
.card-skeleton-container-img::after,
.card-skeleton-text::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    90deg,
    transparent,
    rgb(148, 147, 147),
    transparent
  );
  animation: skeleton 1.3s linear 0.3s infinite;
}
.type-bus {
  margin: 10px 0 20px 0;
}
.card-skeleton-container-btn {
  margin-right: 15px;
}
@keyframes skeleton {
  0% {
    opacity: 0;
    transform: translateX(-100%);
  }
  65% {
    opacity: 1;
    transform: translateX(100%);

  }
  100% {
    opacity: 1;
    transform: translateX(100%);
  }
}
</style>