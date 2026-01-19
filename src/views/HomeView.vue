<template>
  <div class="home">
    <el-button type="primary" @click="handleClose">打开 Dialog</el-button>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="date"
        label="日期"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址">
      </el-table-column>
      
    </el-table>
 
<HelloWorld  >

</HelloWorld>
    
    <el-dialog title="外层 Dialog" :close-on-click-modal="false" :close-on-press-escape="false" :visible.sync="outerVisible">
    <!-- <el-dialog
      width="30%"
      title="内层 Dialog"
      :visible.sync="innerVisible"
      append-to-body>
    </el-dialog> -->
    <!-- <div slot="footer" class="dialog-footer">
      <el-button @click="outerVisible = false">取 消</el-button>
      <el-button type="primary" @click="innerVisible = true">打开内层 Dialog</el-button>
    </div> -->
  </el-dialog>
  </div>

</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'HomeView',
  components: {
    HelloWorld
  },
  data() {
        return {
          outerVisible: false,
          upload: {
        fileList: [],
        fileName: []
      },
          tableData: [{
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          }]
        }
  },
  methods: {
    handleClose() {
      this.outerVisible = true;
    },
      // 上传发生变化钩子
      handleFileChange(file, fileList) {
      this.upload.fileList = fileList;
    },
    // 删除之前钩子
    handleFileRemove(file, fileList) {
      this.upload.fileList = fileList;
    },
    // 提交上传文件
    submitFileForm() {
      // 创建新的数据对象
      let formData = new FormData();
      // 将上传的文件放到数据对象中
      this.upload.fileList.forEach(file => {
        formData.append('file', file.raw);
        this.upload.fileName.push(file.name);
      });
      console.log("提交前",formData.getAll('file'));

      // 文件名
      formData.append('fileName', this.upload.fileName);
      // 自定义上传
      this.$api.uploadFile(formData).then(response => {
          console.log(response);
          // if(response.code == 200){
          //   this.$refs.upload.clearFiles();
          //   this.msgSuccess('上传成功！');
          // }else{
          //   this.$message.error(response.msg);
          // }
        })
        // .catch(error => {
        //   this.$message.error('上传失败！');
        // });

    },
  }
}
</script>
