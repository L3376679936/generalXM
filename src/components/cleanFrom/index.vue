/* * @name : 表格框架页组件 * @author : FuYaJuan * @参数 { fieldList : {Array}
表格字段 } * @参数 { queryParam : {Object} 查询条件对象 } * @参数 { api :
{Function} 查询接口函数 } * @参数 { exportFn : {Function()} 分页中的导出函数 } *
@参数 { showIndex :{Boolean}是否显示序号，默认显示 } * @参数 { showColumnSetting
: {Boolean} 是否开启动态列设置，默认显示 } * @参数 { showExportBtn
:{Boolean}是否显示导出按钮，默认显示 } * @参数 { showCheckbox : {Boolean}
是否显示复选框， 默认显示 } * @参数 { page : {Boolean}是否带分页，默认带分页 } *
@参数 { fixed : {String} 列是否固定在左侧或者右侧，默认右侧 } * @参数 {
tableOptionWidth 最后一列的宽度 } * @参数{ columnNum: {Number}
表格默认展示列数设置,不设置默认为 8 列 } * @表格设置点击列 需要点击的列在
fieldList里 加上type:"link" ,clickFn:方法名示例:{ name: '任务编号', value: 'id',
type:"link" ,clickFn:方法名 },data里定义let 方法名 = (row) =>{}
@参数{sortBy:后端翻译的表格字段要在fieldList中加上未翻译之前的字段名,否则会影响后端排序用法示例{name:"xxx",
value: "orgName" ,sortBy:"orgId"}} *
@参数{noSort:{Boolean}不需要排序功能的列加上noSort:true 用法示例{name:"xxx",
value: "orgName" ,noSort:true}} @事件 { getDataInit : {Function()}
重新查询第一页的表格数据 } * @事件{handleCurrentChange : {Function()}
重新查询当前页的表格数据 } * @事件 { getMultipleSelection : {Function()}
获取表格多行选中的数据 } * @version 1.0 * @edit: 2020/05/20 */

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
        <el-table
          v-loading="loading"
          ref="crudForm"
          :row-key="getRowKey"
          :data="tableData"
          :summary-method="(e) => totalValue"
          :show-summary="totalValue.length === 0 ? false : true"
          @selection-change="handleSelectionChange"
          @sort-change="sortChange"
          @cell-click="cellClick"
          header-row-class-name="table-header"
          cell-class-name="table-body-td"
          :cell-style="columnStyle"
          :row-class-name="rowClassName"
          border
          :stripe="isStripe"
     :span-method="(param)=>objectSpanMethod(param,tableData)"

        >
          <el-table-column
            v-if="showIndex"
            type="index"
            width="50"
            align="center"
          />
          <el-table-column
            v-if="showCheckbox"
            type="selection"
            width="55"
            align="center"
          />

          <template
            v-for="(item, index) in fieldList.filter((item) => !item.hidden)"
          >
            <!-- align="center" -->
            <!-- :render-header="renderHeader" -->
            <el-table-column
              v-if="item.show"
              :key="index"
              :label="item.name"
              :prop="item.value"
              :width="item.width"
              show="true"
              :sortable="item.noSort ? false : 'custom'"
              :formatter="item.formatter ? item.formatter : null"
              :sort-by="item.sortBy ? item.sortBy : item.value"
              show-tooltip-when-overflow
            >
              <template slot-scope="scope">
                <el-button
                  class="click_cell"
                  v-if="item.type === 'link'"
                  type="text"
                  size="small"
                  @click="item.clickFn(scope.row)"
                  >{{
                    item.formatter
                      ? item.formatter(scope.row)
                      : scope.row[item.value]
                  }}</el-button
                >
                <el-input
                  v-else-if="item.type === 'input'"
                  v-model="scope.row[item.value]"
                  size="mini"
                ></el-input>
                <a
                  v-else-if="item.type === 'aLink'"
                  :href="scope.row[item.url]"
                  :download="scope.row[item.value]"
                  >{{ scope.row[item.value] }}</a
                >
                <template v-else>{{
                  item.formatter
                    ? item.formatter(scope.row)
                    : scope.row[item.value]
                }}</template>
              </template>
            </el-table-column>
          </template>

          <el-table-column
            :fixed="fixed"
            :width="tableOptionWidth"
            :label="tableOptionName"
            align="left"
            v-if="showColumnHandle"
          >
            <template slot-scope="scope">
              <slot name="tableOption" :row="scope.row" />
            </template>
          </el-table-column>

          <el-table-column width="40" :fixed="fixed" v-if="showColumnSetting">
            <template slot="header">
              <el-popover
                placement="bottom"
                min-width="80"
                trigger="click"
                popper-class="col-setting-popover"
              >
                <el-button
                  class="set_btn"
                  slot="reference"
                  type="text"
                  icon="el-icon-setting"
                  style="padding: 0; border-color: #f1f1f1"
                  title="展示列设置"
                ></el-button>
                <div class="col-setting-title">展示列设置</div>
                <el-checkbox-group
                  v-model="colOptions"
                  :min="1"
                  class="col-setting-group"
                >
                  <el-checkbox
                    v-for="item in colSelect"
                    :label="item"
                    :key="item"
                    >{{ item }}</el-checkbox
                  >
                </el-checkbox-group>
              </el-popover>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="dialogPage" v-if="dialogPage" ref="page">
      <el-pagination
        :current-page.sync="listInfo.query.current"
        :page-size="listInfo.query.size"
        :total="listInfo.pageTotal"
        :page-sizes="[10, 20, 30, 40, 50, 100]"
        layout="total, sizes, prev, pager, next, jumper, slot"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      >
        <span class="el-pagination__jump page-option-wrap">
          <span v-if="showExportBtn">
            <a
              class="el-icon-upload2 page-option-icon"
              href="javascript:;"
              @click="exportTable"
              title="导出"
            >
            </a>
            <i class="split-line"></i>
          </span>

          <span>
            <a
              class="el-icon-refresh page-option-icon"
              href="javascript:;"
              @click="refresh"
              title="刷新"
            >
            </a>
          </span>
        </span>
      </el-pagination>
    </div>
    <!-- 分页 -->
    <div class="page-wrap-fixed" v-if="page" id="page-wrap-fixed" ref="page">
      <el-pagination
        :current-page.sync="listInfo.query.current"
        :page-size="listInfo.query.size"
        :total="listInfo.pageTotal"
        :page-sizes="pageSizesCount"
        layout="total, sizes, prev, pager, next, jumper, slot"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      >
        <span class="el-pagination__jump page-option-wrap">
          <span>
            <a
              class="page-option-icon"
              href="javascript:;"
              @click="refresh"
              title="刷新"
            >
              <!-- <img src="@static/img/7.png" /> -->
            </a>
          </span>
          <span v-if="showExportBtn">
            <i class="split-line"></i>
            <a
              class="page-option-icon"
              href="javascript:;"
              @click="exportTable"
              title="导出"
            >
              <!-- <img src="@static/img/8.png" /> -->
            </a>
          </span>
        </span>
      </el-pagination>
    </div>
  </div>
</template>

<script>
function filterArray(item) {
  const valueArray = this.rule.filter((prop) => {
    return item[prop] === this.data[prop];
  });
  if (valueArray.length === this.rule.length) {
    return true;
  } else {
    return false;
  }
}
import elementResizeDetectorMaker from "element-resize-detector";
import Sortable from "sortablejs";

// import { Loading } from "element-ui";
/* eslint-disable */
export default {
  name: "CleanFrom",
  props: {
    height: {
      type: String,
      default: () => "0",
    },
    // 是否是斑马纹
    isStripe: {
      type: Boolean,
      default: true,
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
      default: () => {},
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
    //表格是否可拖拽排序
    sortDraw: {
      type: Boolean,
      default: true,
    },
  },
  components: {},
  data() {
    return {
      // 是否开启闪烁
      isFlicker: false,
      sortable: null,
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
      colors: ["255, 0, 0", "0, 255, 0", "0, 0, 255", "255, 255, 0"], // 颜色数组
              spanRule: {
        rule: {
          // 第一列取id字段，若与下一行数据一致则合并
          0: ["id"],
          1: ["name"],
        },
      },
    };
  },
  created() {
    if (this.outLoad) {
      this.getData(this.api);
    }
  },
mounted() {
  if (this.sortDraw) {
    this.columnDropInit();
    this.rowDropInit();
  }

  // 1. 新增：计算数据列的起始索引（跳过序号列、复选框列）
  let startColumnIndex = 0;
  if (this.showIndex) startColumnIndex++; // 序号列占1个索引
  if (this.showCheckbox) startColumnIndex++; // 复选框列占1个索引
  // 初始化合并规则（避免残留旧规则）
  this.spanRule.rule = {};

  // 2. 保留原有循环逻辑，补充合并规则绑定
  for (let i = 0; i < this.fieldList.length; i++) {
    const field = this.fieldList[i];
    
    // 原有逻辑1：收集所有字段名到colSelect（动态列候选池）
    this.colSelect.push(field.name);

    // 新增逻辑：为“当前字段”绑定正确的合并规则索引
    // 仅当字段需要显示时（默认show=true，或被colOptions控制），才生成合并规则
    if (field.show !== false) {
      const targetColIndex = startColumnIndex + i; // 数据列的实际索引（跳过前面的固定列）
      this.spanRule.rule[targetColIndex] = [field.value]; // 绑定字段的value（如batchName、unitCode）
    }

    // 原有逻辑2：控制初始显示的列数（不超过columnNum）
    if (this.showColumnSetting) {
      if (this.colSelect.length > Number(this.columnNum)) {
        continue; // 超过最大列数时，不加入colOptions（初始不显示）
      }
    }
    this.colOptions.push(field.name); // 初始显示的列名池
  }

  console.log(this.spanRule, '修正后的合并规则（含正确索引）');
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
         objectSpanMethod({ row, column, rowIndex, columnIndex }, item) {
      if (Object.keys(this.spanRule.rule).includes(columnIndex.toString())) {
        // filter验证数组
        const currentTable = {
          rule: this.spanRule.rule[columnIndex],
          data: item[rowIndex],
        };
        // 该单元格是否被合并 true 合并， false : 不合并
        let chooseSpan = false;
        if (rowIndex !== 0) {
          chooseSpan = filterArray.call(currentTable, item[rowIndex - 1]);
        }
        if (chooseSpan) {
          return {
            rowspan: 0,
            colspan: 0,
          };
        } else {
          return {
            rowspan: item.filter(filterArray, currentTable).length,
            colspan: 1,
          };
        }
      }
    },
    columnDropInit() {
      // 第一步，获取列容器
      const wrapperColumn = document.querySelector(
        ".el-table__header-wrapper tr"
      );
      // 第二步，给列容器指定对应拖拽规则
      this.sortable = Sortable.create(wrapperColumn, {
        animation: 500,
        delay: 0,
        onEnd: (event) => {
          console.log(
            "拖拽完成以后发现表头数据并没有改变，所以需要我们手动更新表头数据",
            this.fieldList
          );
          console.log(
            "根据旧索引和新索引去更新，其实就是交换位置",
            event.oldIndex,
            event.newIndex
          );

          // 接下来做索引的交换
          let tempHableHeader = [...this.fieldList]; // 先存一份临时变量表头数据
          let temp; // 临时变量用于交换
          temp = tempHableHeader[event.oldIndex - 2]; // 注意这里-2是因为，我在表格的前面加了两列（勾选框列，和序号列）
          tempHableHeader[event.oldIndex - 2] =
            tempHableHeader[event.newIndex - 2]; // 如果没有这两列，序号就是正常对应的，就不用减2
          tempHableHeader[event.newIndex - 2] = temp;

          // 重要的事情说三遍！！！
          // 这里一定要先把表头数据清空，然后再下一轮中去赋值，否则会渲染错误
          // 这里一定要先把表头数据清空，然后再下一轮中去赋值，否则会渲染错误
          // 这里一定要先把表头数据清空，然后再下一轮中去赋值，否则会渲染错误
          this.fieldList = []; // 大家可以注掉试试哦
          this.$nextTick(() => {
            this.fieldList = tempHableHeader;
          });
        },
      });
    },

    rowClassName({ row, rowIndex }) {
      if (this.isFlicker) {
        if (rowIndex % 2 === 1) {
          return "flicker-blue";
        } else {
          return "flicker-red";
        }
      }
      //
    },

    // 行拖拽
    // 个人认为行拖拽不用加，因为加了以后，就不能双击选行单元格的文字了，当然还是要听产品大佬安排
    rowDropInit() {
      // 第一步，获取行容器
      const wrapperRow = document.querySelector(
        ".el-table__body-wrapper tbody"
      );
      const that = this; // 存一份指向
      // 第二步，给行容器指定对应拖拽规则
      Sortable.create(wrapperRow, {
        onEnd({ newIndex, oldIndex }) {
          // 这里是区分上面的列拖拽的另外一种写法

          // 首先删除原来的那一项，并且保存一份原来的那一项，因为splice返回的是一个数组，数组中的第一项就是删掉的那一项
          const currRow = that.tableData.splice(oldIndex, 1)[0];
          // 然后把这一项加入到新位置上
          that.tableData.splice(newIndex, 0, currRow);
        },
      });
    },
    getRowKey(row) {
      return row.id;
    },
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
            console.log(res.data);
            this.loading = false;
            if (res.code === "000000") {
              const d = res.data;
              // 区分list和分页
              if (d.records) {
                this.tableData = d.records;
                this.listInfo.pageTotal = d.total;
                this.listInfo.query.size = d.size;
                this.listInfo.query.current = d.current;
              } else if (d.stationInfos) {
                this.tableData = d.stationInfos.records;
                this.listInfo.pageTotal = d.stationInfos.total;
                this.listInfo.query.size = d.stationInfos.size;
                this.listInfo.query.current = d.stationInfos.current;
              }
            } else if (res.mesg) {
              this.$message.error(res.mesg);
            } else {
              this.$message.error(res.data);
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
            return "color: #1396c2; cursor: pointer;";
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
  },
  beforeDestroy() {
    // window.removeEventListener('resize', this.watchSize)
  },
};
/* eslint-enable */
</script>

<style lang="scss" scoped>
::v-deep
  .el-table--striped
  .el-table__body
  tr.el-table__row--striped
  td.el-table__cell {
  background-color: transparent;
}
::v-deep .el-table__body .el-table__row.hover-row td {
  background-color: transparent;
}
/* CSS */
::v-deep {
  .flicker-blue {
    --flicker-color: 0, 0, 255;
    box-shadow: 0 0 6px 2px rgba(var(--flicker-color), 1) inset;
    transition: all 2.5s cubic-bezier(0.42, 0, 0.58, 1);
    animation: flickerAnimation 2.5s infinite;
  }

  .flicker-red {
    --flicker-color: 255, 0, 0;
    box-shadow: 0 0 6px 2px rgba(var(--flicker-color), 1) inset;
    transition: all 2.5s cubic-bezier(0.42, 0, 0.58, 1);
    animation: flickerAnimation 2.5s infinite;
  }

  .flicker-green {
    --flicker-color: 0, 255, 0;
    box-shadow: 0 0 6px 2px rgba(var(--flicker-color), 1) inset;
    transition: all 2.5s cubic-bewier(0.42, 0, 0.58, 1);
    animation: flickerAnimation 2.5s infinite;
  }

  @keyframes flickerAnimation {
    /* Animation styles */
    0%,
    100% {
      box-shadow: 0 0 5px 0px rgba(var(--flicker-color), 0.7) inset;
    }

    10% {
      box-shadow: 0 0 6px 2px rgba(var(--flicker-color), 0.65) inset;
    }

    20% {
      box-shadow: 0 0 8px 4px rgba(var(--flicker-color), 0.6) inset;
    }

    30% {
      box-shadow: 0 0 10px 6px rgba(var(--flicker-color), 0.5) inset;
    }

    40% {
      box-shadow: 0 0 12px 8px rgba(var(--flicker-color), 0.4) inset;
    }

    50% {
      box-shadow: 0 0 14px 10px rgba(var(--flicker-color), 0.4) inset;
    }

    60% {
      box-shadow: 0 0 12px 8px rgba(var(--flicker-color), 0.5) inset;
    }

    70% {
      box-shadow: 0 0 10px 6px rgba(var(--flicker-color), 0.6) inset;
    }

    80% {
      box-shadow: 0 0 8px 4px rgba(var(--flicker-color), 0.65) inset;
    }

    90% {
      box-shadow: 0 0 6px 2px rgba(var(--flicker-color), 0.6) inset;
    }
  }
}

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

    >>> .el-button--primary {
      width: 120px;
      height: 32px;
      border-radius: 2px;
    }
  }

  .right {
    float: right;

    >>> .el-button {
      width: 120px;
      height: 32px;
      border-radius: 2px;
    }
  }
}

.table-wrap {
  padding: 0 15px;

  .el-table th {
    padding: 2px 0;
  }

  .click_cell {
    color: #1396c2 !important;
    font-size: 14px;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: left;
  }

  .set_btn {
    color: #1396c2 !important;
    font-size: 13px;
    border: none;
    cursor: pointer;
  }
}

::v-deep .el-table__header th {
  padding: 5px 0 0 !important;
  font-size: 13px !important;
}

.table-wrap >>> .table-header {
  background-color: #f1f1f1;
  color: #232323;
  font-weight: bold;

  th {
    background-color: #f1f1f1;
  }
}

.table-wrap >>> .table-body-td {
  color: #232323;
  padding: 3px 0;
}

>>> .el-table--striped
  .el-table__body
  tr.el-table__row--striped.el-table__row--striped.el-table__row--striped
  td {
  background-color: #f7f7f7 !important;
  /*替换为你需要的颜色，觉得优先级不够就加!important*/
}

::v-deep .el-table__body-wrapper {
  margin-bottom: 3px !important;
}

::v-deep .el-table td div {
  display: inline-block;
}

::v-deep .el-table {
  cursor: pointer;
}

::v-deep .el-upload-list {
  display: none;
}
</style>
