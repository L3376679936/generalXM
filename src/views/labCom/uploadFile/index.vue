<template>
  <div>
    <el-card class="box-card">
      <div class="titleHead">文件上传&&下拉框新增选项&&导入导出表格</div>
      <el-divider></el-divider>
      <FileUpload :individual="true" :url="'http://192.168.0.110:8080/add/file'" :fileData="fileData"></FileUpload>
      <el-divider></el-divider>
      <FileUploadS :url="'http://192.168.0.110:8080/add/file'" :fileData="fileData"></FileUploadS>
      <el-divider></el-divider>
      <el-upload class="upload-demo" action="" ref="upload" :on-change="handleChange" :file-list="fileListUpload"
        :limit="1" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
        :auto-upload="false">
        <el-button size="small" type="primary" :loading="loading"  >导入表格预览</el-button>
        <div slot="tip" class="el-upload__tip">
          只 能 上 传 xlsx / xls 文 件
        </div>
      </el-upload>
      <el-button size="small" type="primary" @click="doExport">导出</el-button>
      <el-button size="small" type="primary" @click="getParamData">获取数据</el-button>

      {{ this.sheetList }}
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane :label="item" v-for="(item, index) in sheetList" :name="`${index}`" :key="index">
          <!-- <div id="tableHtml" v-if="activeName == index"></div> -->
          <tablequery1
              v-for="(item, index) in arrHeader"
              :heightD="120"
              :table-height="'155px'"
              style="width: 100%"
              :key="index"
              :rowClass="'true'"
              :tableData="arrData[index]"
              :columns="item"
              :showPagination="false"
            >
            </tablequery1>
        </el-tab-pane>
      </el-tabs>

      <!-- {{ outdataExport }} -->

    </el-card>
  </div>
</template>

<script>
import FileUploadS from "@/components/fileUpload/indexNum.vue";
import tablequery1 from "@/components/TableQueryNew/index.vue";
import download from "@/utils/xlsxFile";

export default {
  name: "LabProjectIndex",
  components: {
    FileUploadS,
    tablequery1,
  },

  data() {
    return {
      activeName: 0,
      loading: false,
      outdata: null,
      fileListUpload: [],
      outdataExport: [],
      arrData: [],
            arrHeader: [],
      dataArr: [],
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
      tableHeaderData2: [
        [
          { label: "时点", prop: "item0", width: 146 },
          { label: "00:15", prop: "item1", width: 93 },
          { label: "00:30", prop: "item2", width: 93 },
          { label: "00:45", prop: "item3", width: 93 },
          { label: "01:00", prop: "item4", width: 93 },
          { label: "01:15", prop: "item5", width: 93 },
          { label: "01:30", prop: "item6", width: 93 },
          { label: "01:45", prop: "item7", width: 93 },
          { label: "02:00", prop: "item8", width: 93 },
          { label: "02:15", prop: "item9", width: 93 },
          { label: "02:30", prop: "item10", width: 93 },
          { label: "02:45", prop: "item11", width: 93 },
          { label: "03:00", prop: "item12", width: 93 },
          { label: "03:15", prop: "item13", width: 93 },
          { label: "03:30", prop: "item14", width: 93 },
          { label: "03:45", prop: "item15", width: 93 },
          { label: "04:00", prop: "item16", width: 93 },
        ],
        [
          { label: "时点", prop: "item0", width: 146 },
          { label: "04:15", prop: "item1", width: 93 },
          { label: "04:30", prop: "item2", width: 93 },
          { label: "04:45", prop: "item3", width: 93 },
          { label: "05:00", prop: "item4", width: 93 },
          { label: "05:15", prop: "item5", width: 93 },
          { label: "05:30", prop: "item6", width: 93 },
          { label: "05:45", prop: "item7", width: 93 },
          { label: "06:00", prop: "item8", width: 93 },
          { label: "06:15", prop: "item9", width: 93 },
          { label: "06:30", prop: "item10", width: 93 },
          { label: "06:45", prop: "item11", width: 93 },
          { label: "07:00", prop: "item12", width: 93 },
          { label: "07:15", prop: "item13", width: 93 },
          { label: "07:30", prop: "item14", width: 93 },
          { label: "07:45", prop: "item15", width: 93 },
          { label: "08:00", prop: "item16", width: 93 },
        ],
        [
          { label: "时点", prop: "item0", width: 146 },
          { label: "08:15", prop: "item1", width: 93 },
          { label: "08:30", prop: "item2", width: 93 },
          { label: "08:45", prop: "item3", width: 93 },
          { label: "09:00", prop: "item4", width: 93 },
          { label: "09:15", prop: "item6", width: 93 },
          { label: "09:30", prop: "item7", width: 93 },
          { label: "09:45", prop: "item8", width: 93 },
          { label: "10:00", prop: "item9", width: 93 },
          { label: "10:15", prop: "item10", width: 93 },
          { label: "10:30", prop: "item11", width: 93 },
          { label: "10:45", prop: "item12", width: 93 },
          { label: "11:00", prop: "item13", width: 93 },
          { label: "11:15", prop: "item14", width: 93 },
          { label: "11:30", prop: "item15", width: 93 },
          { label: "11:45", prop: "item16", width: 93 },
          { label: "12:00", prop: "item12", width: 93 },
        ],
        [
          { label: "时点", prop: "item0", width: 146 },
          { label: "12:15", prop: "item1", width: 93 },
          { label: "12:30", prop: "item2", width: 93 },
          { label: "12:45", prop: "item3", width: 93 },
          { label: "13:00", prop: "item4", width: 93 },
          { label: "13:15", prop: "item5", width: 93 },
          { label: "13:30", prop: "item6", width: 93 },
          { label: "13:45", prop: "item7", width: 93 },
          { label: "14:00", prop: "item8", width: 93 },
          { label: "14:15", prop: "item9", width: 93 },
          { label: "14:30", prop: "item10", width: 93 },
          { label: "14:45", prop: "item11", width: 93 },
          { label: "15:00", prop: "item12", width: 93 },
          { label: "15:15", prop: "item13", width: 93 },
          { label: "15:30", prop: "item14", width: 93 },
          { label: "15:45", prop: "item15", width: 93 },
          { label: "16:00", prop: "item16", width: 93 },
        ],
        [
          { label: "时点", prop: "item0", width: 146 },
          { label: "16:15", prop: "item1", width: 93 },
          { label: "16:30", prop: "item2", width: 93 },
          { label: "16:45", prop: "item3", width: 93 },
          { label: "17:00", prop: "item4", width: 93 },
          { label: "17:15", prop: "item5", width: 93 },
          { label: "17:30", prop: "item6", width: 93 },
          { label: "17:45", prop: "item7", width: 93 },
          { label: "18:00", prop: "item8", width: 93 },
          { label: "18:15", prop: "item9", width: 93 },
          { label: "18:30", prop: "item10", width: 93 },
          { label: "18:45", prop: "item11", width: 93 },
          { label: "19:00", prop: "item12", width: 93 },
          { label: "19:15", prop: "item13", width: 93 },
          { label: "19:30", prop: "item14", width: 93 },
          { label: "19:45", prop: "item15", width: 93 },
          { label: "20:00", prop: "item16", width: 93 },
        ],
        [
          { label: "时点", prop: "item0", width: 146 },
          { label: "20:15", prop: "item1", width: 93 },
          { label: "20:30", prop: "item2", width: 93 },
          { label: "20:45", prop: "item3", width: 93 },
          { label: "21:00", prop: "item4", width: 93 },
          { label: "21:15", prop: "item5", width: 93 },
          { label: "21:30", prop: "item6", width: 93 },
          { label: "21:45", prop: "item7", width: 93 },
          { label: "22:00", prop: "item8", width: 93 },
          { label: "22:15", prop: "item9", width: 93 },
          { label: "22:30", prop: "item10", width: 93 },
          { label: "22:45", prop: "item11", width: 93 },
          { label: "23:00", prop: "item12", width: 93 },
          { label: "23:15", prop: "item13", width: 93 },
          { label: "23:30", prop: "item14", width: 93 },
          { label: "23:45", prop: "item15", width: 93 },
          { label: "24:00", prop: "item16", width: 93 },
        ],
      ],
 
      sheetList: [],
      fileData: {
        name: "file",
        info: "上传文件测试",
      },
      marketTypelist: [
        {
          key: "1",
          name: "河北",
        },
        {
          key: "11",
          name: "黑龙江",
        },
        {
          key: "12",
          name: "吉林",
        },
        {
          key: "13",
          name: "辽宁",
        },
        {
          key: "14",
          name: "蒙东",
        },
        {
          key: "15",
          name: "山西",
        },
        {
          key: "16",
          name: "四川",
        },
        {
          key: "21",
          name: "河南",
        },
        {
          key: "22",
          name: "山东",
        },
        {
          key: "23",
          name: "天津",
        },
        {
          key: "24",
          name: "冀北",
        },
        {
          key: "25",
          name: "安徽",
        },
        {
          key: "26",
          name: "浙江",
        },
      ],
    };
  },

  mounted() { },

  methods: {
    getParamData() {
            let arr = [];
            for (let i = 0; i < this.dataArr.length; i++) {
                arr.push(
                    this.getExportDataList(
                        this.dataArr[i],
                        this.time,
                        this.sheetList[i],
                    )
                );
                // console.log(arr, '9999999999999999')
            }
        },
    getDataList(xlsx, time) {
            let newXlsx= xlsx.filter((_, index) => index % 3 !== 2);
            // 2、5、8、11、14、17、20、23、26、29、32、35、38、41、44、47
            // for (let i = 0; i < xlsx.length; i++) {
            //     if (i % 3 !== 2) {
            //         newXlsx.push(xlsx[i]);
            //     }
            // }
            // console.log(newXlsx, 'newXlsx')
            let newXlsx1 = []; //出清电量（日前）
            let newXlsx2 = []; ////

            for (let i = 0; i < newXlsx.length; i++) {
                delete newXlsx[i]['数据类型']
                delete newXlsx[i]['elm']
                delete newXlsx[i]['isRootInsert']
                // console.log(newXlsx[i],'newXlsx[i]newXlsx[i]newXlsx[i]')
                if (i % 2 == 0) {
                    newXlsx1.push(Object.values(newXlsx[i]));
                } else{
                    newXlsx2.push(Object.values(newXlsx[i]));
                }
            }



            let tableData = [
                [{}, {}],
                [{}, {}],
                [{}, {}],
                [{}, {}],
                [{}, {}],
                [{}, {}]
            ];
            let headerList = [
                [], [], [], [], [], []
            ]
            for (let i = 0; i < 6; i++) {
                for (let j = 0; j < 17; j++) {
                    if (j == 0) {
                        headerList[i].push({
                            label: '时点',
                            prop: 'item0',
                            width: 135
                        })
                        tableData[i][0][["item0"]] = "出清电量(日前)";
                        tableData[i][1]["item0"] = "出清电价(日前)";
                    } else {
                        headerList[i].push({
                            // label: times[i][j - 1],
                            label: time[i * 16 + j - 1],
                            prop: "item" + j,
                            width: 73
                        })
                        tableData[i][0][["item" + j]] = newXlsx1.flat()[i * 16 + j - 1];
                        tableData[i][1][["item" + j]] = newXlsx2.flat()[i * 16 + j - 1];
                    }

                    // tableData[i].push({['item' + (j+1)]:eval(`newXlsx1_${i+1}`)[j]})
                }
            }

            // console.log(tableData);
            // console.log(headerList);
            return [tableData, headerList]

        },
    getExportDataList(xlsx, time, keys) {
      let params = {};
      params[keys] = [];
      let memberName = "";
      let marketType = this.fileName.indexOf("日前") > -1 ? "1" : "2";
      let tradeUnitName = "";
      let tradeUnitId = "";
      // console.log(keys.slice(keys.indexOf('2'),keys.length),'keys.slice(keys.')
      let sliceKeys = keys.slice(keys.indexOf('2'),keys.length);
      let tradeDate = '20'+ sliceKeys.slice(0,2) + '-' + sliceKeys.slice(2,4) + '-' + sliceKeys.slice(4,6)
      // console.log(tradeDate,'tradeDate')
      for (let i = 0; i < this.marketTypelist.length; i++) {
        if (keys.includes(this.marketTypelist[i].name)) {
          memberName = this.marketTypelist[i].name;
          tradeUnitName = this.marketTypelist[i].name;
          tradeUnitId = this.marketTypelist[i].key;
        }
      }
      let newXlsx = [];
      // 2、5、8、11、14、17、20、23、26、29、32、35、38、41、44、47
      for (let i = 0; i < xlsx.length; i++) {
        if (i % 3 !== 2) {
          newXlsx.push(xlsx[i]);
        }
      }
      let newXlsx1 = []; //出清电量（日前）
      let newXlsx2 = []; ////

      for (let i = 0; i < newXlsx.length; i++) {
        if (i % 2 == 0) {
          newXlsx1.push(newXlsx[i]);
        } else {
          newXlsx2.push(newXlsx[i]);
        }
      }
      newXlsx1 = newXlsx1.reduce((pre, cur) => {
        for (let k in cur) {
          if (cur[k] !== "出清电量（日前）" && cur[k] !== "出清电价（日前）") {
            pre.push(cur[k]);
          }
        }
        return pre;
      }, []);

      newXlsx2 = newXlsx2.reduce((pre, cur) => {
        for (let k in cur) {
          if (cur[k] !== "出清电量（日前）" && cur[k] !== "出清电价（日前）") {
            pre.push(cur[k]);
          }
        }
        return pre;
      }, []);

      console.log(newXlsx1);
      console.log(newXlsx2);
      for (let i = 0; i < newXlsx1.length; i++) {
        params[keys].push([
          {
            // memberName:
            marketType,
            memberName,
            tradeUnitName,
            tradeUnitId,
            tradeDate,
            "96Point": time[i],
            clearType: "1",
            value: newXlsx1[i],
          },
          {
            marketType,
            "96Point": time[i],
            memberName,
            tradeUnitName,
            tradeUnitId,
            tradeDate,
            clearType: "2",
            value: newXlsx2[i],
          },
        ]);
      }
      params[keys] = params[keys].flat();
      return params;
    },
    handleClick(val) {
      // console.log(val.index,'index')
      this.importfxx(this.fileTemp);
    },
    doExport(e) {
      download(this.outdataExport, "人员信息.xlsx"); //导出的文件名
    },
    handleChange(file, fileList) {
      this.loading = true;
      this.fileTemp = file.raw;
      this.fileName = file.raw.name;
      if (this.fileTemp) {
        if (
          this.fileTemp.type ==
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
          this.fileTemp.type == "application/vnd.ms-excel"
        ) {
          this.importfxx(this.fileTemp);
          this.$refs.upload.clearFiles();
        } else {
          this.$message({
            type: "warning",
            message: "附件格式错误，请删除后重新上传！",
          });
        }
      } else {
        this.$message({
          type: "warning",
          message: "请上传附件！",
        });
      }
    },

    handleRemove(file, fileList) {
      this.fileTemp = null;
    },
    importfxx(obj) {
            let _this = this;
            // 通过DOM取文件数据
            this.file = obj;
            let rABS = false; //是否将文件读取为二进制字符串
            let f = this.file;
            let reader = new FileReader();
            //if (!FileReader.prototype.readAsBinaryString) {
            FileReader.prototype.readAsBinaryString = function (f) {
                let binary = "";
                let rABS = false; //是否将文件读取为二进制字符串
                let wb; //读取完成的数据
                let reader = new FileReader();
                reader.onload = function () {
                    let bytes = new Uint8Array(reader.result);
                    let length = bytes.byteLength;
                    for (let i = 0; i < length; i++) {
                        binary += String.fromCharCode(bytes[i]);
                    }
                    // console.log(binary, "binarybinary");
                    let XLSX = require("xlsx");
                    if (rABS) {
                        wb = XLSX.read(binary, {
                            //手动转化
                            type: "base64",
                        });
                    } else {
                        wb = XLSX.read(binary, {
                            type: "binary",
                        });
                    }

                    // this.outdata = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]); //转换为数据(数组对象)
                    // 将读取到的数据转换成html
                    // console.log(wb.SheetNames, "wb.SheetNameswb.SheetNames");
                    // console.log(_this.activeName,'_this.activeName')
                    // _this.outdata = XLSX.utils.sheet_to_html(
                    //     wb.Sheets[wb.SheetNames[_this.activeName]]
                    // ); //转换为html
                    // console.log(_this.outdata)
                    // setTimeout(() => {
                    //     document.querySelector("#tableHtml").innerHTML = _this.outdata;
                    // }, 0);

                    // console.log(`#${_this.sheetList[0]}`,';;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;')
                    // document.querySelector(`#${_this.sheetList[0]}`).innerHTML = this.outdata;
                    // document.getElementById(`${_this.sheetList[0]}`).innerHTML = this.outdata;
                    _this.sheetList = wb.SheetNames.filter((e) => e[0] !== "S");
      this.loading = false
                    _this.loading = false
                    for (
                        let i = 0;
                        i < _this.sheetList.length;
                        i++
                    ) {
                        _this.dataArr.push(
                            XLSX.utils.sheet_to_json(wb.Sheets[_this.sheetList[i]])
                        );
                    }
                    // for (let i = 0; i < wb.Sheets[_this.sheetList[_this.activeName]].length; i++) {
                    //     console.log(wb.Sheets[_this.sheetList[_this.activeName]])
                    //     _this.arrData.push(
                    //         _this.getDataList(
                    //             XLSX.utils.sheet_to_json(
                    //                 wb.Sheets[_this.sheetList[_this.activeName]]
                    //             ),
                    //             _this.time
                    //         )[0]
                    //     );

                    //     _this.arrHeader.push(
                    //         _this.getDataList(
                    //             XLSX.utils.sheet_to_json(
                    //                 wb.Sheets[_this.sheetList[_this.activeName]]
                    //             ),
                    //             _this.time
                    //         )[1]
                    //     );

                    // }
                    let  data =  XLSX.utils.sheet_to_json(wb.Sheets[_this.sheetList[_this.activeName]])
                    _this.arrData =  _this.getDataList( data ,_this.time)[0]
                    _this.arrHeader =  _this.getDataList(data,_this.time)[1]
                    // console.log(              XLSX.utils.sheet_to_json(
                    //                 wb.Sheets[_this.sheetList[_this.activeName]]
                    //             ),'thth')
                    // console.log(_this.arrData,'_this')
                    // console.log(_this.arrHeader,'_thish')

                    _this.outdataExport = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]); //转换数据
                    console.log(_this.outdataExport, "outdataoutdata")
                    this.tableToHtml(XLSX.utils.sheet_to_html(wb.Sheets[wb.SheetNames[0]]))
                    console.log(this.outdata, "outdataoutdata");
                };
                reader.readAsArrayBuffer(f);
            };

            if (rABS) {
                reader.readAsArrayBuffer(f);
            } else {
                reader.readAsBinaryString(f);
            }
        },
  },
};
</script>

<style lang="scss" scoped>
#tableHtml {
  width: 100%;
  height: 600px;
  overflow: auto;
}

.titleHead {
  color: rgba(64, 158, 255,1);
  font-size: 32px;
  font-weight: 700;
}

.itemDemo {
  padding: 10px;
}

#tableHtml ::v-deep table {
  // color: red;
  border-right: 1px solid #000;
  border-bottom: 1px solid #000;
  border-collapse: collapse;
  margin: auto;
}

#tableHtml ::v-deep table td {
  border-left: 1px solid #000;
  border-top: 1px solid #000;
  white-space: nowrap;
  text-align: center;
  padding: 0.5rem;
}

#tableHtml ::v-deep tbody tr:nth-of-type(1) {
  font-weight: bold;
  font-size: 20px;
}
</style>
