<template>
    <div class="college">
        <div class="row">
            <div class="col-sm-12">
                <div class="card">
                    <div class="card-header">
                        <h4>学院信息</h4>
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-sm-6 col-lg-3" v-for="(item, index) in collegeLists" :key="index">
                                <div class="card" >
                                    <div class="card-body bg-primary" :class="classArr[index].className">
                                        <h4 style="color: #fff;">{{item.colName}}</h4>
                                        <span @click="checkColStu(item)" style="cursor: pointer;">查看学院学生 <i class="mdi mdi-chevron-double-right"></i> </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'college',
    props: ['collegeLists'],
    data() {
        return {
            classArr: [
                {id:1, className: 'bg-primary'},
                {id:1, className: 'bg-success'},
                {id:1, className: 'bg-info'},
                {id:1, className: 'bg-warning'},
                {id:1, className: 'bg-danger'},
                {id:1, className: 'bg-purple'},
                {id:1, className: 'bg-cyan'},
                {id:1, className: 'bg-brown'},
            ]
        }
    },
    methods: {
        checkColStu (item) {  // 查看学院学生信息
            this.$emit('checkColStuList', item)
        }
    }
}
</script>

<style scoped>

</style>
