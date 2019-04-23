<template>
  <div class="leftAside">
    <aside class="lyear-layout-sidebar">
      <div class="sidebar-header myTitle" id="logo">
        <h4>
          <router-link to="/index" style="color: #2b99ff;">广现社区Admin</router-link>
        </h4>
      </div>
      <div class="lyear-layout-sidebar-scroll ps">
        <el-menu 
            :default-active="$route.path"
            class="el-menu-vertical-demo" 
            @open="handleOpen" 
            @close="handleClose" 
            router
        >
            <template v-for="(item, index) in $router.options.routes" v-if="!item.hidden">
                <el-submenu :index="index+''" v-if="!item.leaf">
                    <template slot="title">
                        <i :class="item.icon" style="font-size: 18px;"></i>
                        <span slot="title">{{item.name}}</span>
                    </template>
                    <el-menu-item v-for="child in item.children" :index="child.path" :key="child.path" v-if="!child.hidden">{{child.name}}</el-menu-item>
                </el-submenu>
            </template>
        </el-menu>

        <div class="sidebar-footer">
            <p class="copyright">
                Copyright © 2019. <span style="color: #2b99ff;">广现社区Admin</span> All rights reserved.
            </p>
        </div>
      </div>
    </aside>
  </div>
</template>

<script>
  export default {
    name: "leftAside",
    methods: {
      handleOpen(key, keyPath) {
        //console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        //console.log(key, keyPath);
      }
    }
  };

</script>

<style scoped>
  .myTitle {
    display: flex;
    justify-content: center;
    align-content: center;
    padding: 15px;
  }

</style>
