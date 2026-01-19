<template>
  <div class>
    <el-table
      :data="listData"
      :span-method="objectSpanMethod"
      border
      class="tableArea"
      style="width: 1000%"
      header-row-style="display: none;"
      @row-contextmenu="rightclick"

    >
      <el-table-column
        v-for="(item, index) in rowList"
        :key="index"
        :prop="item.value"
        align="center"
        width="200"
      ></el-table-column>

      <!-- <el-table-column  prop="timeDate" align="center" width="200"></el-table-column>
        <el-table-column  prop="amount" align="center"></el-table-column>
        <el-table-column  prop="price" align="center"></el-table-column>
        <el-table-column  prop="productName" width="200px" align="center"></el-table-column>
        <el-table-column  prop="updateTime" align="center"></el-table-column> -->
    </el-table>
    <div class="normalDom" @contextmenu.prevent="onContextmenu">区域内右键</div>

    <rightMenu
      :class-index="0"
      :rightclickInfo="rightclickInfo"
      @copy="copy"
      @look="look"
      @edit="edit"
      @delete="deleteFn"
      @refresh="refresh"
    ></rightMenu>
  </div>
</template>
<script>
export default {
  name: "tableMerge",
  data() {
    return {
      rightclickInfo: {},

      listData: [],
      testArr1: [],
      testArr2: [],
      testPosition1: 0,
      testPosition2: 0,
      timeDataList: [],
      time: [
        "00:15",
        "00:30",
        "00:45",
        "01:00",
        "01:15",
        "01:30",
        "01:45",
        "02:00",
        "02:15",
        "02:30",
        "02:45",
        "03:00",
        "03:15",
        "03:30",
        "03:45",
        "04:00",
        "04:15",
        "04:30",
        "04:45",
        "05:00",
        "05:15",
        "05:30",
        "05:45",
        "06:00",
        "06:15",
        "06:30",
        "06:45",
        "07:00",
        "07:15",
        "07:30",
        "07:45",
        "08:00",
        "08:15",
        "08:30",
        "08:45",
        "09:00",
        "09:15",
        "09:30",
        "09:45",
        "10:00",
        "10:15",
        "10:30",
        "10:45",
        "11:00",
        "11:15",
        "11:30",
        "11:45",
        "12:00",
        "12:15",
        "12:30",
        "12:45",
        "13:00",
        "13:15",
        "13:30",
        "13:45",
        "14:00",
        "14:15",
        "14:30",
        "14:45",
        "15:00",
        "15:15",
        "15:30",
        "15:45",
        "16:00",
        "16:15",
        "16:30",
        "16:45",
        "17:00",
        "17:15",
        "17:30",
        "17:45",
        "18:00",
        "18:15",
        "18:30",
        "18:45",
        "19:00",
        "19:15",
        "19:30",
        "19:45",
        "20:00",
        "20:15",
        "20:30",
        "20:45",
        "21:00",
        "21:15",
        "21:30",
        "21:45",
        "22:00",
        "22:15",
        "22:30",
        "22:45",
        "23:00",
        "23:15",
        "23:30",
        "23:45",
        "24:00",
      ],
      rowList: [
        {
          value: "timeDate",
        },
        {
          value: "timer",
        },
        // {
        //   value:'amount',
        // },
        // {
        //   value:'price',
        // },
        // {
        //   value:'productName',
        // },
        // {
        //   value:'updateTime',
        // },
        // {
        //   value:'updateTime1',
        // },
        // {
        //   value:'updateTime2',
        // },
        // {
        //   value:'updateTime3',
        // },
        // {
        //   value:'updateTime4',
        // },
        // {
        //   value:'updateTime5',
        // },
        // {
        //   value:'updateTime6',
        // }
      ],
    };
  },
  methods: {
    // 普通dom右键
    onContextmenu(e) {
      this.rightclickInfo = {
        position: {
          x: e.clientX,
          y: e.clientY,
        },
        menulists: [
          {
            fnName: "copy",
            params: "唉康特",
            icoName: "el-icon-star-on",
            btnName: "唉康特",
          },
          {
            fnName: "look",
            params: "斯坦得有",
            icoName: "el-icon-star-off",
            btnName: "斯坦得有",
          },
        ],
      };
    },
    rightclick(row, column, event) {
      console.log(event.clientX,'event.clientX')

      this.rightclickInfo = {
        position: {
          x: event.clientX,
          y: event.clientY,
        },
        menulists: [
          {
            fnName: "copy",
            params: { row, column, event },
            icoName: "el-icon-document-copy",
            btnName: "复制数据",
            // divided: true,
            // disabled: true,
            // children: [],
          },
          {
            fnName: "look",
            params: { row, column, event },
            icoName: "el-icon-view",
            btnName: "查看行数据",
          },
          {
            fnName: "edit",
            params: { row, column, event },
            icoName: "el-icon-edit",
            btnName: "编辑行数据",
          },
          {
            fnName: "delete",
            params: { row, column, event },
            icoName: "el-icon-delete",
            btnName: "删除行数据",
          },
          {
            fnName: "refresh",
            params: { row, column, event },
            icoName: "el-icon-refresh",
            btnName: "刷新页面",
          },
        ],
      };
      event.preventDefault(); // 阻止默认的鼠标右击事件
    },
    copy(params) {
      console.log(
        "copy",
        params.row ? params.row[params.column.property] : params
      );
    },
    look(params) {
      console.log("look", params.row ? JSON.stringify(params.row) : params);
    },
    edit(params) {
      console.log("edit", params);
    },
    deleteFn(params) {
      console.log("deleteFn", params.row ? params.row.id : params);
    },
    refresh(params) {
      console.log("refresh 刷新页面啦");
    },
    // 获取数据
    queryData() {
      this.listData = [
        {
          id: "201808300001",
          timeDate: "2023/4/4",
          timeData: Array.from({ length: 96 }, (_, index) => index + 1),
          // p1:"00:15",
          // p2:"00:30",
          // p3:"00:45",
          // p4:"01:00",
          // p5:"01:15",
          // p6:"01:30",
        },
        {
          id: "201808300002",
          timeDate: "2023/4/4",
          timeData: Array.from({ length: 96 }, (_, index) => index + 1),
        },
        {
          id: "201808300001",
          timeDate: "2023/4/4",
          timeData: Array.from(
            { length: 96 },
            () => Math.floor(Math.random() * 91) + 10
          ),
        },
        {
          id: "201808300002",
          timeDate: "2023/4/4",
          timeData: Array.from(
            { length: 96 },
            () => Math.floor(Math.random() * 91) + 10
          ),
        },

        {
          id: "201808300003",
          timeDate: "2023/4/4",
          timeData: Array.from(
            { length: 96 },
            () => Math.floor(Math.random() * 91) + 10
          ),
        },

        {
          id: "201808300004",
          timeDate: "2023/4/4",
          timeData: Array.from(
            { length: 96 },
            () => Math.floor(Math.random() * 91) + 10
          ),
        },

        {
          id: "201808300005",
          timeDate: "2023/4/4",
          timeData: Array.from(
            { length: 96 },
            () => Math.floor(Math.random() * 91) + 10
          ),
        },

        {
          id: "201808300006",
          timeDate: "2023/4/4",
          timeData: Array.from(
            { length: 96 },
            () => Math.floor(Math.random() * 91) + 10
          ),
        },

        {
          id: "201808300001",
          timeDate: "2023/4/5",
          timeData: Array.from(
            { length: 96 },
            () => Math.floor(Math.random() * 91) + 10
          ),
          // p1:"00:15",
          // p2:"00:30",
          // p3:"00:45",
          // p4:"01:00",
          // p5:"01:15",
          // p6:"01:30",
        },

        {
          id: "201808300002",
          timeDate: "2023/4/5",
          timeData: Array.from(
            { length: 96 },
            () => Math.floor(Math.random() * 91) + 10
          ),
        },
        {
          id: "201808300001",
          timeDate: "2023/4/5",
          timeData: Array.from(
            { length: 96 },
            () => Math.floor(Math.random() * 91) + 10
          ),
        },
        {
          id: "201808300002",
          timeDate: "2023/4/5",
          timeData: Array.from(
            { length: 96 },
            () => Math.floor(Math.random() * 91) + 10
          ),
        },

        {
          id: "201808300003",
          timeDate: "2023/4/5",
          timeData: Array.from(
            { length: 96 },
            () => Math.floor(Math.random() * 91) + 10
          ),
        },

        {
          id: "201808300004",
          timeDate: "2023/4/5",
          timeData: Array.from(
            { length: 96 },
            () => Math.floor(Math.random() * 91) + 10
          ),
        },

        {
          id: "201808300005",
          timeDate: "2023/4/5",
          timeData: Array.from(
            { length: 96 },
            () => Math.floor(Math.random() * 91) + 10
          ),
        },

        {
          id: "201808300006",
          timeDate: "2023/4/5",
          timeData: Array.from(
            { length: 96 },
            () => Math.floor(Math.random() * 91) + 10
          ),
        },

      
    },
    getTimeDataList() {
      // let time1 = this.time.slice(0,this.time.length)
      // 将time数组等长分成三份
      let time0 = this.time.slice(0, this.time.length / 4);
      let time2 = this.time.slice(this.time.length / 4, this.time.length / 2);
      let time4 = this.time.slice(
        this.time.length / 2,
        (this.time.length / 4) * 3
      );
      let time6 = this.time.slice((this.time.length / 4) * 3, this.time.length);

      for (let i = 1; i < 25; i++) {
        this.rowList.push({
          value: `p${i}`,
        });
      }
      this.listData.forEach((e, index) => {
        if (index == 0) {
          for (let i = 1; i < 25; i++) {
            e[`p${i}`] = time0[i - 1];
            // q:这里的time${index}拼接成了字符串，其实我是希望他们拼接，然后访问拼接后的变量，这里应该怎么写呢？
          }
        } else if (index == 2) {
          for (let i = 1; i < 25; i++) {
            e[`p${i}`] = time2[i - 1];
          }
        } else if (index == 4) {
          for (let i = 1; i < 25; i++) {
            e[`p${i}`] = time4[i - 1];
          }
        } else {
          for (let i = 1; i < 25; i++) {
            e[`p${i}`] = time6[i - 1];
          }
        }
        // this.getTableList()
        if (index % 2 === 0) {
          e.timer = "时点";
          //   for (let i = 1; i < 25; i++) {
          //   e[`p${i}`] = obj[index][i - 1];
          // }
        } else {
          e.timer = "历史预测价";
        }
        if (e.timer == "历史预测价") {
          // console.log(e,'eeeeeeeeeeeeeeeeeeee')
          for (let k in e) {
            if (k[0] == "p") {
              e[k] = e.timeData[k.slice(1) - 1];
            }
          }
        }
      });
      console.log(this.listData, "this.listData");
      // this.listData.forEach((e,index)=>{
      //   if(e.timer = '历史预测价'){
      //     for(let i = 1;i<25;i++){
      //       e[`p${i}`] = e.timeData[i-1]
      //     }
      //   }
      // })

      // console.log(rowList)
      // rowList.push({
      //   value:
      // })
      // console.log(time1);
      // console.log(time2.length);
      // console.log(time3.length);
      // console.log(time4.length);
    },
  },
  mounted() {
    this.queryData();
    // this.getTimeDataList();
  },
};
</script>
<style>
.normalDom {
  width: 240px;
  height: 240px;
  line-height: 240px;
  text-align: center;
  border: 6px dotted pink;
  font-weight: 600;
}
</style>
