<template>
  <div id="app">
    <router-view />
  </div>
</template>
<style lang='less'>
body,
html,
#app {
  width: 100%;
  height: 100%;
  min-width: 1366px;
  min-height: 600px;
  box-sizing: border-box;
}
.ant-table-thead > tr > th,
.ant-table-tbody > tr > td {
  height: 40px !important;
  padding: 6px !important;
}

.ant-table-thead > tr > th {
  background: #ebedf0 !important;
}
.ant-calendar-date:hover {
  background: #498de5 !important;
  cursor: pointer;
  color: #fff;
}
.ant-calendar-selected-date .ant-calendar-date,
.ant-calendar-selected-start-date .ant-calendar-date,
.ant-calendar-selected-end-date .ant-calendar-date {
  background: #498de5 !important;
}
.ant-calendar-range .ant-calendar-in-range-cell > div {
  color: #fff;
}
.ant-calendar-range .ant-calendar-in-range-cell:before {
  background: #498de5 !important;
}
.ant-pagination-options-quick-jumper input {
  width: 50px !important;
  height: 30px !important;
  border-radius: 2px !important;
}
.ant-pagination-item-active {
  background: #498de5 !important;
  border-radius: 2px !important;
  border: none !important;
  a {
    color: #fff !important;
  }
}
ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
a {
  text-decoration: none;
}
html,
body {
  padding: 0;
  margin: 0;
}
.ant-select .ant-select-selection--single {
  border-radius: 2px !important;
}
.ant-input {
  border-radius: 2px !important;
}
.ant-select-dropdown-menu-item-active {
  background-color: #fff !important;
}
.ant-btn {
  border-radius: 2px !important;

  &.ant-btn-primary {
    color: #fff;
    background: #498de5 !important;
    border: 1px solid #498de5 !important;
  }
}
.ant-select-dropdown-menu-item-selected,
.ant-select-dropdown-menu-item-selected:hover {
  background-color: #fff !important;
  font-weight: 600;
  color: #498de5 !important;
}
.ant-pagination-item {
  border: none !important;
  height: 30px !important;
  // width: 30px !important;
  background: #f0f2f5 !important;
  border-radius: 2px !important;
}
.ant-pagination .ant-pagination-prev .ant-pagination-item-link,
.ant-pagination-next .ant-pagination-item-link {
  border: none !important;
  background: #f0f2f5 !important;

  height: 30px !important;
  width: 30px !important;
  i {
    color: #c0c4cc !important;
  }
}
.ant-pagination-item-active {
  background: #498de5 !important;
  border-radius: 2px;
}
.ant-select-dropdown-menu-item:hover {
  background: #f5f7fa !important;
}
.gc-modal-wrap {
  .ant-modal-header {
    padding: 14px 20px;
    border-bottom: none;
    border-radius: 3px 3px 0 0;
  }
  .ant-modal-body {
    padding: 0;
  }
  .ant-modal-footer {
    border-top: none;
    padding: 9px 20px;
    box-sizing: border-box;
    text-align: center;
    border-radius: 0 0 3px 3px;
  }
}
</style>
