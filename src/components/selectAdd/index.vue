<template>
  <el-select
    v-model="labels"
    :multiple="false"
    :placeholder="`请选择${order}`"
    ref="template"
    :disabled="disabledSelect"
    clearable
    @visible-change="(v) => visibleChange(v, 'template')"
  >
    <el-option
      v-for="(item, index) in labelslist"
      :key="index"
      :label="item[label]"
      :value="item[val]"
    >
      {{ item[label] }}
      <!-- <span style="float: left" class="span-style">{{ item.value }}</span> -->
      <span style="float: right" class="span-style"></span>
      <div class="flag" @click="showShipTemplate(item.code, true)"></div>
    </el-option>
  </el-select>
</template>
<script>
export default {
  name: "selectAdd",
  props: {
    // 最开始的下拉列表数据
    labelslist: {
      type: Array,
      default: [],
    },
    // 新增选项的接口
    api: {
      type: Function,
      default: () => {},
    },
    // 新增选项的字段
    // query: {
    //   type: String,
    //   default: "stationName",
    // },
    // 下拉框label绑定显示的字段名
    label: {
      type: String,
      default: "label",
    },
    // 下拉框label绑定数据的字段名
    val: {
      type: String,
      default: "value",
    },
    // 下拉框的名字
    order: {
      type: String,
      default: "选项",
    },
    // 外部绑定的下拉框的数据
    formVla: {
      type: String,
      default: "",
    },
    // 添加选项的按钮是否在最上方
    isUp:{
      type:Boolean,
      default:true
    },
    paramsObj:{
      type:Object,
      default:()=>{}
    },
    disabledSelect: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      // labelslist: [],
      labels: "",
      params: {},
    };
  },
  created() {
    this.labels = this.formVla;
  },
  methods: {
    getData(api) {

      this.params[this.label] = this.labels;

      if(this.paramsObj) this.params = {...this.params,...this.paramsObj}
      // console.log(this.params, "_____________23141234");
      return new Promise(() => {
        api(this.params)
          .then((res) => {
            if (res.code === "000000") {
              this.$message.success("新增成功!");
              this.$emit("getQueryStationList",true);
            }
          })
          .catch(() => {
            this.$message.error("数据加载失败!");
          });
      });
    },
    // 添加商品标签
    showShipTemplate() {
      this.$prompt(`请输入新的${this.order}`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      }).then(({ value }) => {
        this.labels = value;
        this.getData(this.api);
      });
    },
    visibleChange(visible, refName) {
      // this.$nextTick(() => {
        if (visible) {
          const ref = this.$refs[refName];
          let popper = ref.$refs.popper;
          if (popper.$el) popper = popper.$el;
          if (
            !Array.from(popper.children).some(
              (v) => v.className === "el-template-menu__list"
            )
          ) {
            const el = document.createElement("ul");
            el.className = "el-template-menu__list";
            el.style =
              "border-bottom:2px solid rgb(219 225 241); padding:0; color:rgb(64 158 255);font-size: 13px;margin: 0px;text-align: center; ";
            el.innerHTML = `<li class="el-cascader-node text-center" style="height:36px;line-height: 36px;">
            <span class="el-cascader-node__label"><i class="font-blue el-icon-plus"></i>添加${this.order}</span>
            </li>`;
            // console.log(
            //   document.querySelector(".el-scrollbar"),
            //   "sssssssssssssss"
            // );
            // console.log(popper.childNode,'sssssssssssssss')
            // console.log(popper.children[0], "231111111111");
            // console.log(popper, "popper");
            if(this.isUp){
              popper.insertBefore(el, popper.children[0]);
            }else{
              popper.appendChild(el);
            }
            el.onclick = () => {
              this.showShipTemplate(null, false);
            };
          }
        }
      // });
    },
  },
};
</script>
<style lang="scss" scoped>
::v-deep .el-cascader-node {
  text-align: center;
}
</style>
