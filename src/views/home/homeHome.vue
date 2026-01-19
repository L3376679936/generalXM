<template>
  <div>
    <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
      <el-radio-button :label="false">展开</el-radio-button>
      <el-radio-button :label="true">收起</el-radio-button>
    </el-radio-group>

    <!-- 核心：给menu加ref，方便后续操作 -->
    <el-menu
      ref="menuRef"
      default-active="1-4-1"
      class="el-menu-vertical-demo custom-collapse-menu"
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse"
    >
      <!-- 导航一（带子菜单） -->
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">导航一</span>
        </template>
        <el-menu-item-group>
          <span slot="title">分组一</span>
          <!-- 1. 选项1 - 带Icon -->
          <el-menu-item index="1-1" data-icon="el-icon-user">
            <i class="el-icon-user"></i>
            <span slot="title">选项1</span>
          </el-menu-item>
          <!-- 2. 选项2 - 带Icon -->
          <el-menu-item index="1-2" data-icon="el-icon-phone">
            <i class="el-icon-phone"></i>
            <span slot="title">选项2</span>
          </el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="分组2">
          <!-- 3. 选项3 - 带Icon -->
          <el-menu-item index="1-3" data-icon="el-icon-s-tools">
            <i class="el-icon-s-tools"></i>
            <span slot="title">选项3</span>
          </el-menu-item>
        </el-menu-item-group>
        <!-- 子菜单：选项4 -->
        <el-submenu index="1-4">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span slot="title">选项4</span>
          </template>
          <!-- 4. 选项4-1 - 带Icon -->
          <el-menu-item index="1-4-1" data-icon="el-icon-setting">
            <i class="el-icon-setting"></i>
            <span slot="title">选项1</span>
          </el-menu-item>
        </el-submenu>
      </el-submenu>

      <!-- 导航二（一级菜单） - 带Icon -->
      <el-menu-item index="2" data-icon="el-icon-menu">
        <i class="el-icon-menu"></i>
        <span slot="title">导航二</span>
      </el-menu-item>

      <!-- 导航三（禁用） - 带Icon -->
      <el-menu-item index="3" disabled data-icon="el-icon-document">
        <i class="el-icon-document"></i>
        <span slot="title">导航三</span>
      </el-menu-item>

      <!-- 导航四 - 带Icon -->
      <el-menu-item index="4" data-icon="el-icon-setting">
        <i class="el-icon-setting"></i>
        <span slot="title">导航四</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isCollapse: true
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
      // 菜单展开时，给悬浮弹层添加图标
      this.addIconToCollapseMenu();
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    // 核心方法：给折叠菜单的悬浮弹层添加图标
    addIconToCollapseMenu() {
      if (!this.isCollapse) return; // 非折叠状态不处理

      // 获取所有折叠菜单的悬浮弹层
      const collapseMenus = document.querySelectorAll('.el-menu--collapse .el-submenu .el-menu');
      collapseMenus.forEach(menu => {
        // 获取弹层内的所有菜单项
        const menuItems = menu.querySelectorAll('.el-menu-item, .el-submenu__title');
        menuItems.forEach(item => {
          // 避免重复添加图标
          if (item.querySelector('.custom-collapse-icon')) return;

          // 获取菜单项的index，匹配原菜单的data-icon属性
          const index = item.getAttribute('index') || item.parentElement.getAttribute('index');
          if (!index) return;

          // 找到原菜单中对应index的菜单项，获取图标类名
          const originItem = this.$refs.menuRef.$el.querySelector(`[index="${index}"]`);
          const iconClass = originItem?.getAttribute('data-icon');
          if (!iconClass) return;

          // 创建图标元素并插入到弹层菜单项中
          const icon = document.createElement('i');
          icon.className = `${iconClass} custom-collapse-icon`;
          item.insertBefore(icon, item.firstChild); // 插入到文本前
        });
      });
    }
  }
};
</script>

<style scoped>
/* 基础菜单样式 */
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}

/* 折叠菜单悬浮弹层样式调整 */
::v-deep .custom-collapse-menu.el-menu--collapse {
  width: 64px; /* 折叠后宽度 */
}

/* 悬浮弹层的菜单项样式（显示图标） */
::v-deep .el-menu--collapse .el-submenu .el-menu {
  padding-left: 0 !important; /* 重置内边距，适配图标 */
}

/* 自定义图标样式 */
::v-deep .custom-collapse-icon {
  margin-right: 8px; /* 图标与文字间距 */
  font-size: 14px; /* 图标大小 */
  width: 16px;
  text-align: center;
}

/* 弹层菜单项对齐 */
::v-deep .el-menu--collapse .el-submenu .el-menu .el-menu-item,
::v-deep .el-menu--collapse .el-submenu .el-menu .el-submenu__title {
  padding-left: 16px !important; /* 调整内边距，让图标显示完整 */
  display: flex;
  align-items: center;
}
</style>