<template>
  <el-table
    :data="tableData"
    :span-method="(param) => objectSpanMethod(param, tableData)"
    border
    style="width: 100%"
  >
    <!-- <el-table-column prop="id" label="ID" width="180"> </el-table-column>
    <el-table-column prop="name" label="姓名"> </el-table-column>
    <el-table-column prop="amount1" sortable label="数值 1"> </el-table-column>
    <el-table-column prop="amount2" sortable label="数值 2"> </el-table-column>
    <el-table-column prop="amount3" sortable label="数值 3"> </el-table-column> -->
    <el-table-column v-for="(item, index) in headList" :key="index" :prop="item.value" :label="item.name"> </el-table-column>
  </el-table>
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
export default {
  data() {
    return {
        headList: [
        {
          name: "姓名",
          value: "batchName",
          noSort: true,
        },
        { name: "国家", value: "unitCode", noSort: true },
        { name: "地区", value: "areaCode", noSort: true },
        { name: "开始时间", value: "validTime", noSort: true },
        { name: "出发时间", value: "buyTime", noSort: true },
        { name: "总额", value: "subsidyEstimate", noSort: true },
        { name: "一月流量", value: "month1", noSort: true },
        { name: "二月流量", value: "month2", noSort: false },
      ],
      tableData: [
        {
          id: 1,
          batchName: "你好",
          areaCode: "云南省",
          unitCode: "山东省 济宁市 金乡县",
          validTime: "2008-05-08~1991-06-01",
          buyTime: "1984-03-06~2015-02-09",
          subsidyEstimate: 159,
          month1: 468,
          month2: 405,
        },
        {
          id: 2,
          batchName: "你好",
          areaCode: "西藏自治区",
          unitCode: "上海 上海市 普陀区",
          validTime: "2023-04-07~1970-09-07",
          buyTime: "2007-08-10~2012-09-25",
          subsidyEstimate: 170,
          month1: 831,
          month2: 646,
        },
        {
          id: 3,
          batchName: "你好",
          areaCode: "香港特别行政区",
          unitCode: "湖北省 十堰市 张湾区",
          validTime: "2000-01-05~1974-11-26",
          buyTime: "1999-10-28~1970-05-04",
          subsidyEstimate: 436,
          month1: 706,
          month2: 859,
        },
        {
          id: 4,
          batchName: "你好",
          areaCode: "澳门特别行政区",
          unitCode: "四川省 广元市 利州区",
          validTime: "1984-04-09~1973-11-17",
          buyTime: "1985-02-04~1980-09-27",
          subsidyEstimate: 758,
          month1: 565,
          month2: 444,
        },
        {
          id: 5,
          batchName: "你好",
          areaCode: "山东省",
          unitCode: "新疆维吾尔自治区 伊犁哈萨克自治州 昭苏县",
          validTime: "2000-06-26~2011-06-05",
          buyTime: "1993-07-24~1998-02-28",
          subsidyEstimate: 189,
          month1: 144,
          month2: 175,
        },
        {
          id: 6,
          batchName: "你好",
          areaCode: "新疆维吾尔自治区",
          unitCode: "香港特别行政区 新界 沙田区",
          validTime: "1977-02-12~2000-12-26",
          buyTime: "2022-07-28~2021-07-07",
          subsidyEstimate: 902,
          month1: 363,
          month2: 210,
        },
        {
          id: 7,
          batchName: "你好",
          areaCode: "澳门特别行政区",
          unitCode: "西藏自治区 那曲地区 尼玛县",
          validTime: "1973-08-05~2018-11-23",
          buyTime: "1988-06-28~1989-05-02",
          subsidyEstimate: 649,
          month1: 341,
          month2: 800,
        },
        {
          id: 8,
          batchName: "你好",
          areaCode: "贵州省",
          unitCode: "新疆维吾尔自治区 克孜勒苏柯尔克孜自治州 阿克陶县",
          validTime: "2004-02-05~1995-01-13",
          buyTime: "1980-04-15~1978-02-23",
          subsidyEstimate: 108,
          month1: 395,
          month2: 482,
        },
        {
          id: 9,
          batchName: "你好",
          areaCode: "四川省",
          unitCode: "吉林省 松原市 其它区",
          validTime: "2009-08-15~2005-12-28",
          buyTime: "1994-04-13~2011-10-21",
          subsidyEstimate: 326,
          month1: 681,
          month2: 628,
        },
        {
          id: 10,
          batchName: "你好",
          areaCode: "澳门特别行政区",
          unitCode: "山西省 阳泉市 城区",
          validTime: "1991-03-18~2004-02-27",
          buyTime: "1970-03-04~1993-11-15",
          subsidyEstimate: 169,
          month1: 200,
          month2: 791,
        },
      ],
      // 配置spanRule来控制合并表格的规则
      spanRule: {
        rule: {
          0: ["batchName"],
          1: ["unitCode"],
          2: ["areaCode"],
          3: ["validTime"],
          4: ["buyTime"],
          5: ["subsidyEstimate"],
          6: ["month1"],
          7: ["month2"],
        },
      },
    };
  },
  methods: {
    // 表格合并
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
  },
};
</script>
