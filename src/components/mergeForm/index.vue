/* * @name : 表格框架页组件 * @author : FuYaJuan * @参数 { fieldList : {Array} 表格字段 } * @参数 { queryParam : {Object} 查询条件对象 } *
@参数 { api : {Function} 查询接口函数 } * @参数 { exportFn : {Function()} 分页中的导出函数 } * @参数 { showIndex
:{Boolean}是否显示序号，默认显示 } * @参数 { showColumnSetting : {Boolean} 是否开启动态列设置，默认显示 } * @参数 { showExportBtn
:{Boolean}是否显示导出按钮，默认显示 } * @参数 { showCheckbox : {Boolean} 是否显示复选框， 默认显示 } * @参数 { page :
{Boolean}是否带分页，默认带分页 } * @参数 { fixed : {String} 列是否固定在左侧或者右侧，默认右侧 } * @参数 { tableOptionWidth 最后一列的宽度
} * @参数{ columnNum: {Number} 表格默认展示列数设置,不设置默认为 8 列 } * @表格设置点击列 需要点击的列在 fieldList里 加上type:"link"
,clickFn:方法名示例:{ name: '任务编号', value: 'id', type:"link" ,clickFn:方法名 },data里定义let 方法名 = (row) =>{}
@表格设置弹出框 触发方式click/focus/hover/manual, 在 fieldList里 加上type: 'popover', popTrigger: 'hover', popPlacement:'top-start', popTitle:'项目名称列表', popvalue: 'specialityName' 方法名示例:{ name: "责任项目数量", value: "itemCount", noSort: true, ifchoose: true, type: 'popover', popTrigger: 'hover', popPlacement:'top-start', popTitle:'项目名称列表', popvalue: 'specialityName' }
@参数{sortBy:后端翻译的表格字段要在fieldList中加上未翻译之前的字段名,否则会影响后端排序用法示例{name:"xxx", value: "orgName"
,sortBy:"orgId"}} * @参数{noSort:{Boolean}不需要排序功能的列加上noSort:true 用法示例{name:"xxx", value: "orgName" ,noSort:true}} @事件 {
getDataInit : {Function()} 重新查询第一页的表格数据 } * @事件{handleCurrentChange : {Function()} 重新查询当前页的表格数据 } * @事件 {
getMultipleSelection : {Function()} 获取表格多行选中的数据 } * @version 1.0 * @edit: 2020/05/20 */

<template>
  <div>
    <div class="s-o-t-wrap">
      <!--查询条件 -->
      <div class="search-wrap" v-if="searShow">
        <slot name="searchBar" />
      </div>

    <!-- 操作 -->
      <div class="table-top-option-wrap" v-if="btnShow">
        <div class="left">
          <slot name="tableTopOptionLeft" />
        </div>
        <div class="right">
          <slot name="tableTopOptionRight" />
        </div>
      </div>

      <!-- 表格hqz5210js18678267122 height="66vh"   v-loading="loading" element-loading-text="加载中...  需要显示边框且拖拽就加 border" -->
      <div class="table-wrap" id="table-wrap" ref="tableWrap">
        <!-- :style="height==='0'?{height:'100%'}:{height:height}"
                      :height="height==='0'?'':height" -->
        <el-table  :height="height == '0' ? '' : height" v-loading="loading" ref="crudForm" :data="tableData"
          :summary-method="(e) => totalValue" :show-summary="totalValue.length === 0 ? false : true"
          @selection-change="handleSelectionChange" @sort-change="sortChange" @cell-click="cellClick"
          header-row-class-name="table-header" cell-class-name="table-body-td" :cell-style="columnStyle" border stripe>
          <el-table-column v-if="showIndex" type="index" width="50" align="center" />
          <el-table-column v-if="showCheckbox" type="selection" width="55" align="center" />

          <template v-for="(item, index) in fieldList.filter((item) => item.ifchoose)">
            <!-- align="center" -->
            :render-header="renderHeader"
            <el-table-column align="center" v-if="item.show" :key="index" :label="item.name" :prop="item.value"
              :width="item.width" show="true" :sortable="item.noSort ? false : 'custom'"
              :formatter="item.formatter ? item.formatter : null" :sort-by="item.sortBy ? item.sortBy : item.value"
              show-overflow-tooltip>
              <template slot-scope="scope">
                <el-button class="click_cell" v-if="item.type === 'link'" type="text" size="small"
                  @click="item.clickFn(scope.row)">{{
                    item.formatter
                    ? item.formatter(scope.row)
                    : scope.row[item.value]
                  }}</el-button>
                <el-input v-else-if="item.type === 'input'" v-model="scope.row[item.value]" size="mini"></el-input>
                <a v-else-if="item.type === 'aLink'" :href="scope.row[item.url]" :download="scope.row[item.value]">{{
                  scope.row[item.value] }}</a>
                <el-popover v-else-if="item.type === 'popover'"
                  :placement="item.popPlacement ? item.popPlacement : 'top-start'" width="500" :trigger="item.popTrigger">
                  <ul style="margin: 0;padding-right:10px;max-height: 400px;overflow-y: auto;">
                    <li style="list-style: none;font-weight: bold;">{{ item.popTitle }}</li>
                    <li style="list-style: disc;" v-for="(iname,index) in scope.row[item.popValue]" :key="index">
                      {{ iname }}
                    </li>
                  </ul>
                  <a slot="reference">
                    {{
                      item.formatter
                      ? item.formatter(scope.row)
                      : scope.row[item.value]
                    }}
                  </a>
                </el-popover>
                <span v-else-if="scope.row && !scope.row.taskTimeStr && item.type == 'taskTimeStr'">--</span>
                <template v-else>{{
                  item.formatter
                  ? item.formatter(scope.row)
                  : scope.row[item.value]
                }}</template>
              </template>
            </el-table-column>
          </template>

          <el-table-column :fixed="fixed" :width="tableOptionWidth" :label="tableOptionName" align="center"
            v-if="showColumnHandle">
            <template slot-scope="scope">
              <slot name="tableOption" :row="scope.row" />
            </template>
          </el-table-column>

          <el-table-column width="40" :fixed="fixed" v-if="showColumnSetting">
            <template slot="header">
              <el-popover placement="bottom" min-width="80" trigger="click" popper-class="col-setting-popover">
                <el-button class="set_btn" slot="reference" type="text" icon="el-icon-setting"
                  style="padding: 0; border-color: #f1f1f1" title="展示列设置"></el-button>
                <div class="col-setting-title">展示列设置</div>
                <el-checkbox-group v-model="colOptions" :min="1" class="col-setting-group">
                  <el-checkbox v-for="item in colSelect" :label="item" :key="item">{{ item }}</el-checkbox>
                </el-checkbox-group>
              </el-popover>
            </template>
          </el-table-column>

          <!-- 展示radio按钮 -->
          <el-table-column  width="200" label="操作" align="center" v-if="showRadio">
            <template slot-scope="scopeContent">
              <span class="check-again" @click="checkAgainBtn(scopeContent.row)"
                v-if="scopeContent.row && !scopeContent.row.operateState">重新检测</span>
              <el-switch v-else v-model="scopeContent.row.operateState" :active-value='1' :inactive-value='2'
                @change="changeRadioState(scopeContent.row)" active-color="rgba(0, 112, 107, 1)" inactive-color="#eee">
              </el-switch>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <!-- 分页跟在表格下面 -->
    <div class="dialogPage" v-if="dialogPage" ref="page">
      <el-pagination :current-page.sync="listInfo.query.current" :page-size="listInfo.query.size"
        :total="listInfo.pageTotal" :page-sizes="[10, 20, 30, 40, 50, 100]"
        layout="total, sizes, prev, pager, next, jumper, slot" @size-change="handleSizeChange"
        @current-change="handleCurrentChange" popper-class="date-style">
        <span class="el-pagination__jump page-option-wrap">
          <span v-if="showExportBtn">
            <a class="el-icon-upload2 page-option-icon" href="javascript:;" @click="exportTable" title="导出">
            </a>
            <i class="split-line"></i>
          </span>

          <span v-if="showRefreshBtn">
            <a class="el-icon-refresh page-option-icon" href="javascript:;" @click="refresh" title="刷新">
            </a>
          </span>
        </span>
      </el-pagination>
    </div>
    <!-- 分页固定在下方 -->
    <div class="page-wrap-fixed" v-if="page" id="page-wrap-fixed" ref="page">
      <el-pagination :current-page.sync="listInfo.query.current" :page-size="listInfo.query.size"
        :total="listInfo.pageTotal" :page-sizes="pageSizesCount" layout="total, sizes, prev, pager, next, jumper, slot"
        @size-change="handleSizeChange" @current-change="handleCurrentChange">
        <span class="el-pagination__jump page-option-wrap">
          <span>
            <a class="page-option-icon" href="javascript:;" @click="refresh" title="刷新">
              <!-- <img src="@static/img/7.png" /> -->
            </a>
          </span>
          <span v-if="showExportBtn">
            <i class="split-line"></i>
            <a class="page-option-icon" href="javascript:;" @click="exportTable" title="导出">
              <!-- <img src="@static/img/8.png" /> -->
            </a>
          </span>
        </span>
      </el-pagination>
    </div>
  </div>
</template>

<script>
import elementResizeDetectorMaker from "element-resize-detector";
// import { Loading } from "element-ui";
/* eslint-disable */
export default {
  name: "mergeFrom",
  props: {
    height: {
      type: String,
      default: () => "0",
    },
    // 接收一个数组。表示有合计
    totalValue: {
      type: Array,
      default: () => [],
    },
    // 表格字段配置
    fieldList: {
      type: Array,
      default: () => [],
    },
    // 查询条件
    queryParam: {
      type: Object,
      default: () => { },
    },
    // 获取数据的接口
    api: {
      type: Function,
    },
    // q: Unexpected mutation of "queryParam"   如何解决这个报错？

    // 导出
    exportFn: {
      type: Function,
    },
    // 最后一列显示的列名
    tableOptionName: {
      type: String,
      default: "操作",
    },
    // 是否带分页
    page: {
      type: Boolean,
      default: true,
    },
    // 表格是否显示序号
    showIndex: {
      type: Boolean,
      default: true,
    },
    // 表格是否显示复选框
    showCheckbox: {
      type: Boolean,
      default: true,
    },
    // 列是否固定在左侧或者右侧
    fixed: {
      type: String,
      default: "right",
    },
    // 最后一列的宽度
    tableOptionWidth: {
      // type: Number,
      default: 220,
    },
    // 是否开启动态列设置
    showColumnSetting: {
      type: Boolean,
      default: true,
    },
    //是否显示刷新按钮
    showRefreshBtn: {
      type: Boolean,
      default: false,
    },
    // 是否显示导出按钮
    showExportBtn: {
      type: Boolean,
      default: true,
    },
    // 是否显示操作列
    showColumnHandle: {
      type: Boolean,
      default: true,
    },
    // 是否是对话框分页
    dialogPage: {
      type: Boolean,
      default: false,
    },
    columnNum: {
      default: 8,
    },
    searShow: {
      type: Boolean,
      default: true,
    },
    btnShow: {
      type: Boolean,
      default: true,
    },
    pageSizesCount: {
      type: Array,
      default: () => [10, 20, 30, 40, 50, 100],
    },
    //是否默认加载数据
    outLoad: {
      type: Boolean,
      default: true,
    },
    // 展示radio列
    showRadio: {
      type: Boolean,
      default: false,
    }
  },
  components: {},
  data() {
    return {
      loading: false,
      colOptions: [],
      colSelect: [],
      tableData: [],
      exportData: {
        headers: [],
        values: [],
      },
      multipleSelection: [],
      // loading: false,
      listInfo: {
        pageTotal: 0, // 总条数
        pageSizes: [5, 10, 20, 50, 100], // 分页数量列表
        query: {
          // 查询条件
          current: 1, // 当前页
          size: 10, // 每页条数
        },
      },
      pazeSizesCount1: [10, 20, 30, 40, 50, 100],
    };
  },
  created() {
    if (this.outLoad) {
      this.getData(this.api);
    }
  },
  mounted() {
    // this.watchSize();
    // window.addEventListener('resize', this.watchSize)
    for (let i = 0; i < this.fieldList.length; i++) {
      this.colSelect.push(this.fieldList[i].name);
      if (this.showColumnSetting) {
        if (this.colSelect.length > Number(this.columnNum)) {
          continue;
        }
      }
      this.colOptions.push(this.fieldList[i].name);
    }
  },
  computed: {},
  watch: {
    colOptions(colArr) {
      let self = this;
      for (let i in self.fieldList) {
        if (colArr.indexOf(self.fieldList[i].name) === -1) {
          self.fieldList[i].show = false;
        } else {
          self.fieldList[i].show = true;
        }
      }
    },
    // queryParam(val) {
    //   console.log(val);
    //   if (val) {
    //     this.getData(this.api);
    //   }
    // },
  },
  beforeUpdate() {
    this.$nextTick(() => {
      this.$refs.crudForm.doLayout();
    });
  },
  methods: {
    // getRowKey(row) {
    //   return row.id;
    // },
    // 表头部重新渲染
    renderHeader(h, { column, $index }) {
      // 新建一个 span
      let span = document.createElement("span");
      // 设置表头名称
      span.innerText = column.label;
      // 临时插入 document
      document.body.appendChild(span);
      // 重点：获取 span 最小宽度，设置当前列，注意这里加了 20，字段较多时还是有挤压，且渲染后的 div 内左右 padding 都是 10，所以 +20 。（可能还有边距/边框等值，需要根据实际情况加上）
      column.minWidth = span.getBoundingClientRect().width + 10;
      // 移除 document 中临时的 span
      document.body.removeChild(span);
      return h("span", column.label);
    },
    // 分页width
    watchSize() {
      // let _this = this;
      let erd = elementResizeDetectorMaker();
      let pageWidth = document.getElementById("page-wrap-fixed");
      erd.listenTo(this.$refs.tableWrap, function (element) {
        pageWidth.style.width = element.offsetWidth + "px";
      });
    },
    // 分页-刷新
    refresh() {
      this.listInfo.query.current = 1;
      this.getData(this.api);
    },
    // 导出
    exportTable() {
      if (!this.tableData.length) {
        this.$message({
          showClose: true,
          message: "列表数据为空,无法导出!",
          type: "warning",
        });
        return;
      }
      this.exportData.headers = [];
      this.exportData.values = [];
      for (let i = 0; i < this.fieldList.length; i++) {
        if (this.fieldList[i].show == true) {
          this.exportData.headers.push(this.fieldList[i].name);
          this.exportData.values.push(this.fieldList[i].value);
        }
      }
      this.exportFn ? this.exportFn() : null;
    },
    // 表格多行选中
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 获取表格多行选择的数据
    getMultipleSelection() {
      return this.multipleSelection;
    },
    // 调用接口 获取数据
    getData(api) {
      this.loading = true;
      // let loadingInstance = Loading.service({ fullscreen: true });
      // console.log(loadingInstance,'_____________23141234')
      return new Promise(() => {
        api(this.handleParams())
          .then((res) => {
            // loadingInstance.close();
            // console.log(res.data);
            this.loading = false;
            if (res.code === "200") {
              const d = res.data;
              // 区分list和分页
              if (d.rows) {
                this.tableData = d.rows;
                this.listInfo.pageTotal = d.totalRows;
                this.listInfo.query.size = d.pageSize;
                this.listInfo.query.current = d.pageNo;
              }
              if (d.pageResult) {
                this.tableData = d.pageResult.rows;
                this.listInfo.pageTotal = d.pageResult.totalRows;
                this.listInfo.query.size = d.pageResult.pageSize;
                this.listInfo.query.current = d.pageResult.pageNo;
              }
              if (d.hisRiskList) {
                this.tableData = d.hisRiskList;
                // this.listInfo.pageTotal = d.pageResult.totalRows;
                // this.listInfo.query.size = d.pageResult.pageSize;
                // this.listInfo.query.current = d.pageResult.pageNo;
              }
              if (d.risks) {
                this.tableData = d.risks;
                // this.listInfo.pageTotal = d.pageResult.totalRows;
                // this.listInfo.query.size = d.pageResult.pageSize;
                // this.listInfo.query.current = d.pageResult.pageNo;
              }
            } else {
              this.$message.error(res.message);
            }
          })
          .catch(() => {
            this.$message.error("数据加载失败!");
          });
      });
    },
    // 重新查询第一页的表格数据
    getDataInit() {
      this.listInfo.query.current = 1;
      this.getData(this.api);
    },
    // 处理接口调用所需的参数
    handleParams() {
      const obj = {};
      for (const key in this.queryParam) {
        if (this.queryParam[key] || this.queryParam[key] === 0) {
          obj[key] = this.queryParam[key];
        }
      }
      // console.log({ ...this.listInfo.query }, { ...obj }, '{ ...this.listInfo.query, ...obj }');
      return { ...this.listInfo.query, ...obj };
    },
    // pageSize 改变时会触发
    handleSizeChange(val) {
      const query = this.listInfo.query;
      query.size = val; // 每页条数
      query.current = 1; // 每页条数切换，重置当前页
      this.getData(this.api);
    },
    // currentPage 改变时会触发
    handleCurrentChange(val) {
      this.listInfo.query.current = val; // 当前页
      this.getData(this.api);
    },
    // 列排序
    sortChange(column) {
      this.queryParam.sortColumn = column.column.sortBy;
      if (column.order === "ascending") {
        this.queryParam.order = "asc";
      } else {
        this.queryParam.order = "desc";
      }

      this.getData(this.api);
    },
    // 点击列
    columnStyle(row, column, rowIndex, columnIndex) {
      for (let i = 0; i < this.fieldList.length; i++) {
        if (!!this.fieldList[i].clickable) {
          if (row.column.label == this.fieldList[i].name) {
            return "color: #1396c2; cursor: pointer";
          } else {
            continue;
          }
        }
      }
    },
    // 表格点击事件
    cellClick(row, column, cell, event) {
      this.$emit("cell-click", row, column, cell, event);
    },
    // 切换switch框选中状态
    changeRadioState(e) {
      this.$emit("changeRadio", e.taskId);
    },
    // 点击重新检测
    checkAgainBtn(e) {
      this.$emit("checkAgain", e.taskId);
    },
  },
  beforeDestroy() {
    // window.removeEventListener('resize', this.watchSize)
  },
};
/* eslint-enable */
</script>

<style lang="scss" scoped>
// .pagetable {
//     position: absolute;
//     bottom: 0;
//     left: 50%;
//     transform: translate(-50%, 0%);
//     width: 100%;
//     height: 40px;
//     background-color: #f1f1f1;
//     .el-pagination {
//         position: absolute;
//         top: 50%;
//         left: 50%;
//         transform: translate(-50%, -50%);
//         span,
//         a {
//             display: inline-block;
//         }
//         a {
//             width: 20px;
//             height: 23px;
//             color: #1396c2;
//             font-size: 14px;
//             font-weight: 800;
//             margin-right: 16px;
//         }
//     }
// }
.check-again {
  cursor: pointer;
  padding: 8px 12px;
  color: rgba(0, 112, 107, 1);
}

// .check-again:hover {
//   color: rgba(0, 112, 107, 1);
// }

.dialogPage {
  padding: 10px 0;
  text-align: center;
  width: 100%;
  margin-top: -45px;
}

.s-o-t-wrap {
  margin-bottom: 45px;
}

.search-wrap {
  background-color: #fcfcfc;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
  // eslint-disable-next-line
  padding: 16px 30px 6px;

  ::v-deep .el-input {
    width: 180px;
  }

  ::v-deep .el-date-editor.el-input__inner {
    width: 180px;
  }

  ::v-deep .el-form-item {
    margin: 0 15px 8px 0;
  }

  ::v-deep .el-form-item__label {
    width: 91px;
    text-align: right;
  }

  ::v-deep .el-range-editor .el-range__icon,
  ::v-deep .el-range-editor {
    padding-right: 0;
    display: none;
  }

  ::v-deep .el-range__close-icon {
    color: #c0c4cc;
    font-size: 13px;
    width: 15px;
  }
}

.table-top-option-wrap {
  margin: 10px 15px;
  overflow: hidden;

  .left {
    float: left;

    ::v-deep .el-button--primary {
      width: 120px;
      height: 32px;
      border-radius: 2px;
    }
  }

  .right {
    float: right;

    ::v-deep .el-button {
      width: 120px;
      height: 32px;
      border-radius: 2px;
    }
  }
}

.table-wrap {
  padding: 0 15px;

  .el-table th {
    padding: 4px 0;
  }

  // link类型,在分页切换的时候内容显示异常，会超出单元格
  ::v-deep .el-tooltip {
    width: 100% !important;
  }

  .click_cell {
    color: #1396c2 !important;
    font-size: 14px;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: center;
    white-space: nowrap;
  }

  .set_btn {
    color: #1396c2 !important;
    font-size: 13px;
    border: none;
  }
}

::v-deep .el-table__header th {
  padding: 8px 0 !important;
  font-size: 14px !important;
}

.table-wrap::v-deep .table-header {
  // background-color: #f02b2b !important;
  color: #000000;
  font-weight: bold;

  th {
    background-color: #e4e4e4;
  }
}

.table-wrap::v-deep .table-body-td {
  color: #232323;
  padding: 6px 0;
}

::v-deep .el-table--striped .el-table__body tr.el-table__row--striped.el-table__row--striped.el-table__row--striped td {
  background-color: #f4f4f4 !important;
  /*替换为你需要的颜色，觉得优先级不够就加!important*/
}

::v-deep .el-table__body-wrapper {
  margin-bottom: 3px !important;
}

// ::v-deep .el-table td div {
//   display: inline-block;
// }

::v-deep .el-upload-list {
  display: none;
}

//分页样式
::v-deep .el-pagination__sizes .el-input .el-input__inner:hover {
  border-color: rgba(0, 112, 107, 1);
}

::v-deep .el-pager li.active {
  color: white;
  background-color: rgba(0, 112, 107, 1);
  border-radius: 4px;
}

::v-deep .el-pager li:hover {
  color: rgb(0, 173, 164);
}

::v-deep .el-pagination .btn-next:hover {
  color: rgba(0, 112, 107, 1);
}

::v-deep .el-pagination .btn-prev:hover {
  color: rgba(0, 112, 107, 1);
}

//复选框的样式
::v-deep .el-checkbox__input.is-checked .el-checkbox__inner {
  background-color: rgba(0, 112, 107, 1);
  border-color: rgba(0, 112, 107, 1);
}

::v-deep .el-checkbox__input.is-focus .el-checkbox__inner {
  border-color: rgba(0, 112, 107, 1);
}

::v-deep .el-checkbox__input.is-indeterminate .el-checkbox__inner {
  background-color: rgba(0, 112, 107, 1);
  border-color: rgba(0, 112, 107, 1);
}

::v-deep .el-checkbox__inner:hover {
  border-color: rgba(0, 112, 107, 1);
}
</style>
