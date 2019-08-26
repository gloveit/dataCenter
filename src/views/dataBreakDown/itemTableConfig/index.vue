<template>
  <div class='data-perspective-conifg-wrap'>
    <div class='table-page'>
      <gc-breadcrumb />
      <div class="title">
        表字段配置
      </div>
      <div class='content'>
        <div class="con1">
          <!-- <el-input
              placeholder="请输入内容"
              v-model="title"
              :disabled="true"
              style="width: 30%;"
            >
            </el-input> -->
          <div style="float: right">
            <a-button
              plain
              style='margin-right: 10px'
              @click="back"
            >返回</a-button>
            <a-button
              type="primary"
              plain
              @click="save"
            >保存</a-button>
          </div>
        </div>
        <div class="con2">
          <!-- <div style="height: 95%;margin-top: 5px;">
            <el-table
              highlight-current-row
              border
              stripe
              :data="tableData"
              :height="tableHeight"
            >
              <el-table-column
                prop="name"
                label="name"
              ></el-table-column>
              <el-table-column label="text">
                <template slot-scope="scope">
                  <el-input
                    size="small"
                    v-model="scope.row.text"
                    placeholder="请输入内容"
                  ></el-input>
                </template>
              </el-table-column>
              <el-table-column
                prop="type"
                label="type"
              >
                <template slot-scope="scope">
                  <el-select
                    v-model="scope.row.type"
                    placeholder="请选择"
                    @change="handleEdit1(scope.$index, scope.row)"
                  >
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column label="show">
                <template slot-scope="scope">
                  <el-select
                    v-model="scope.row.show"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="item in shows"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column
                prop="condition"
                label="condition"
              >
                <template slot-scope="scope">
                  <el-select
                    v-model="scope.row.condition"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="item in conditions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column
                prop="query"
                label="query"
              >
                <template slot-scope="scope">
                  <el-input
                    size="small"
                    :disabled="scope.row.dis"
                    v-model="scope.row.query"
                    placeholder="请输入内容"
                  ></el-input>
                </template>
              </el-table-column>
            </el-table>
          </div> -->
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import { getTableApi } from '@/api/dataBreak'
export default {
  data () {
    return {
      tableHeight: '100%',
      tableData: [],
      title: this.$route.query.table,
      options: [{
        value: '1',
        label: 'string'
      }, {
        value: '2',
        label: 'date'
      }, {
        value: '3',
        label: 'reference'
      }],
      shows: [{
        value: '1',
        label: 'true'
      },
      {
        value: '2',
        label: 'false'
      }],
      conditions: [{
        value: '1',
        label: 'true'
      },
      {
        value: '2',
        label: 'false'
      }]
    }
  },
  methods: {
    dataAjax: function () {
      getTableApi({
        table: this.title
      }).then(data => {
      })
      //   this.$axios.get(window.API.host + 'dataCenter/table/columns?table=' + this.title).then((res) => {
      //     this.tableData = res.data
      //     this.tableData.forEach(function (i) {
      //       i.dis = true
      //     })
      //   })
    },
    // 返回
    back () {
      this.$router.back(-1)
    },
    handleEdit1 (index, row) {
      if (row.type === '3') {
        row.dis = false
      }
    },
    save: function () {
      let json = JSON.stringify(this.tableData)
      this.axios({
        method: 'post',
        url: window.API.host + 'dataCenter/table/save',
        data: { json: json }
      }).then((res) => {
        if (res.data.msg = 'success') {
          this.$message.success('保存成功！')
        }
      })
    }
  },
  mounted () {
    this.dataAjax()
  }
}
</script>

<style scoped>
.content {
  display: block;
  height: 93%;
  position: relative;
  padding: 20px 2%;
  background: #f0f3fc;
}
.con1 {
  height: 45px;
  width: 100%;
  font-size: 18px;
}
.con2 {
  height: calc(95% - 50px);
  width: 97%;
  padding: 20px;
  background: #ffffff;
}
</style>
