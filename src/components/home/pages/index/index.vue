<template>
    <div class="index">
        <div class="bg">
        </div>
        <div class="doail">
            <div class="txt">
                <p class="b-title animated fadeIn " style="animation-delay: 0.8s;">欢迎来到广现社区管理端</p>
                <p class="s-title animated fadeIn " style="animation-delay: 0.4s;">Welcome to GX community</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'index'
}
</script>

<style scoped>
.index {
    position: relative;
}
.bg {
    background-image: url("https://www.tanshangbiao.cn/project/images/bg.jpg");
    border-radius: 5px;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.5);
    min-height: 800px;
    background-size:cover;
    background-position:center;
}
.index .doail {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 9;
    background: rgba(255, 255, 255, 0.22);
    display: flex;
    justify-content: center;
    align-items: center;
}
.doail .txt {
    color: #fff;
    text-align: center;
}
.doail .txt .b-title {
    font-size: 36px;
}
.doail .txt .s-title {
    font-size: 24px;
}
</style>
