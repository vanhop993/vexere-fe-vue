<template>
  <div class="a-dashboard">
    <div class="row">
      <div class="col-md-3">
        <div class="card-counter primary">
          <i class="bi bi-building"></i>
          <span class="count-numbers">12</span>
          <span class="count-name">Company</span>
        </div>
      </div>
      <div class="col-md-3">
        <div class="card-counter danger">
          <i class="fas fa-plane-departure"></i>
          <span class="count-numbers">599</span>
          <span class="count-name">Trip</span>
        </div>
      </div>

      <div class="col-md-3">
        <div class="card-counter success">
          <i class="fa fa-database"></i>
          <span class="count-numbers">6875</span>
          <span class="count-name">Tickets sold</span>
        </div>
      </div>

      <div class="col-md-3">
        <div class="card-counter info">
          <i class="fa fa-users"></i>
          <span class="count-numbers">35</span>
          <span class="count-name">Users</span>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12 col-md-6">
        <div class="bg-white">
          <table class="table">
            <thead>
              <tr>
                <th>Stt</th>
                <th>Tên công ty</th>
                <th>Ngày tạo</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Tiến Oanh</td>
                <td>26/2/2011</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Tiến Oanh</td>
                <td>26/2/2011</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="bg-white">
          <table class="table">
            <thead>
              <tr>
                <th>Stt</th>
                <th>Tên công ty</th>
                <th>Ngày tạo</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Tiến Oanh</td>
                <td>26/2/2011</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Tiến Oanh</td>
                <td>26/2/2011</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="col-12 col-md-6">
        <div class="bg-white">
          <table class="table">
            <thead>
              <tr>
                <th>Stt</th>
                <th>Tên công ty</th>
                <th>Ngày tạo</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Tiến Oanh</td>
                <td>26/2/2011</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Tiến Oanh</td>
                <td>26/2/2011</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="bg-white">
          <table class="table">
            <thead>
              <tr>
                <th>Stt</th>
                <th>Tên công ty</th>
                <th>Ngày tạo</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Tiến Oanh</td>
                <td>26/2/2011</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Tiến Oanh</td>
                <td>26/2/2011</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
.bg-white {
  margin: 5px;
  background-color: white;
  border-radius: 10px;
}
.card-counter {
  box-shadow: 2px 2px 10px #dadada;
  margin: 5px;
  padding: 20px 10px;
  background-color: #fff;
  height: 100px;
  border-radius: 5px;
  transition: 0.3s linear all;
}

.card-counter:hover {
  box-shadow: 4px 4px 20px #dadada;
  transition: 0.3s linear all;
}
.card-counter .bi,
.card-counter .fas {
  display: block !important;
  position: none !important;
}

.card-counter.primary {
  background-color: #007bff;
  color: #fff;
}

.card-counter.danger {
  background-color: #ef5350;
  color: #fff;
}

.card-counter.success {
  background-color: #66bb6a;
  color: #fff;
}

.card-counter.info {
  background-color: #26c6da;
  color: #fff;
}

.a-dashboard .card-counter i {
  font-size: 3em;
  opacity: 0.2;
}

.card-counter .count-numbers {
  position: absolute;
  right: 35px;
  top: 20px;
  font-size: 32px;
  display: block;
}

.card-counter .count-name {
  position: absolute;
  right: 35px;
  top: 65px;
  font-style: italic;
  text-transform: capitalize;
  opacity: 0.5;
  display: block;
  font-size: 18px;
}
</style>