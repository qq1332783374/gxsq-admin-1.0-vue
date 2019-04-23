<template>
    <div class="home">
        <div class="lyear-layout-container">
            <!-- 左侧栏 -->
            <left-aside></left-aside>
            <!-- 右侧 -->
            <div class="content">
                <!-- 头部 -->
                <my-header></my-header>
                <!-- 主要内容 -->
                <main class="lyear-layout-content">
                    <div class="container-fluid">
                        <router-view></router-view>
                    </div>
                </main>
            </div>
        </div>
    </div>
</template>

<script>
import leftAside from 'common/leftAside/leftAside'
import myHeader from 'common/myHeader/myHeader'
export default {
    name: 'home',
    components: {
        leftAside,
        myHeader,
    },
    data() {
        return {
            
        }
    },
    methods: { 

    }
}
</script>

<style scoped>

</style>
