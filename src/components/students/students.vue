<template>
    <div class="students">
        <!-- 学院信息 -->
        <div class="row">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header">
                        <h4 class=" text-info">学院信息</h4>
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-sm-3 col-lg-3" v-for="(item, index) in collegeLists" :key="index">
                                <div class="card" >
                                    <div class="card-body bg-primary" :class="classArr[index].className">
                                        <h5 style="color: #fff;">{{item.colName}}</h5>
                                        <span @click="checkColStu(item)" style="cursor: pointer;">查看学院班级 <i class="mdi mdi-chevron-double-right"></i> </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 班级信息 -->
        <div class="row">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header">
                        <h4 class="text-info">班级信息</h4>
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <el-table
                                :data="classList"
                                style="width: 100%;"
                                highlight-current-row
                                v-loading="isLoading"
                            >
                                <el-table-column 
                                    label="年级"
                                    prop="grade"
                                />
                                <el-table-column
                                    label="班级"
                                    prop="className"
                                />
                                <el-table-column
                                    label="辅导员"
                                    prop="teaName"
                                />
                                <el-table-column label="操作">
                                    <template slot-scope="scope">
                                        <el-button
                                            size="mini"
                                            type="primary"
                                            @click="handleCheck(scope.$index, scope.row)"
                                        >查看
                                        </el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                            <!-- 分页 -->
                            <el-col :span="24">
                                <el-pagination
                                    background
                                    layout="prev, pager, next"
                                    :total="classPage.total"
                                    :page-size="classPage.pageSize"
                                    @current-change="handleCurrentChange"
                                >
                                </el-pagination>
                            </el-col>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 班级学生 -->
        <div class="row">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header">
                        <h4 class="text-info">班级学生</h4>
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <el-table
                                :data="stuLists"
                                style="width: 100%;"
                                highlight-current-row
                                v-loading="isLoading1"
                            >
                                <el-table-column 
                                    label="班级"
                                    prop="className"
                                />
                                <el-table-column
                                    label="姓名"
                                    prop="stuName"
                                />
                                <el-table-column
                                    label="政治面貌"
                                    prop="polStatus"
                                />
                                <el-table-column
                                    label="身份证"
                                    prop="idCard"
                                />
                                <el-table-column
                                    label="电话"
                                    prop="telephone"
                                />
                                <el-table-column
                                    label="家庭住址"
                                    prop="familyAdd"
                                />
                                <el-table-column label="操作">
                                    <template slot-scope="scope">
                                        <el-button
                                            size="mini"
                                            type="primary"
                                            @click="handleCheckStu(scope.$index, scope.row)"
                                        >查看
                                        </el-button>
                                        <!-- <el-button
                                            size="mini"
                                            type="danger"
                                            @click="handleDelStu(scope.$index, scope.row)"
                                        >删除
                                        </el-button> -->
                                    </template>
                                </el-table-column>
                            </el-table>
                            <!-- 分页 -->
                            <el-col :span="24">
                                <el-pagination
                                    background
                                    layout="prev, pager, next"
                                    :total="stuPage.total"
                                    :page-size="stuPage.pageSize"
                                    @current-change="handleCurrentChangeStu"
                                >
                                </el-pagination>
                            </el-col>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 学生详细信息 -->
        <el-dialog
            title="学生详细信息"
            :visible.sync="stuDetaileInfoShow"
            width="30%"
            >
            <div class="stuDetail">
                <ul class="list-group">
                    <li class="list-group-item">
                        <span style="font-weight: bold; width: 23%; display: inline-block;">班级：</span>{{stuDetailInfo.className}}
                    </li>
                    <li class="list-group-item">
                        <span style="font-weight: bold;width: 23%; display: inline-block;">姓名：</span>{{stuDetailInfo.stuName}}
                    </li>
                    <li class="list-group-item">
                        <span style="font-weight: bold;width: 23%; display: inline-block;">身份证：</span>{{stuDetailInfo.idCard}}
                    </li>
                    <li class="list-group-item">
                        <span style="font-weight: bold;width: 23%; display: inline-block;">身份：</span>{{stuDetailInfo.polStatus}}
                    </li>
                    <li class="list-group-item">
                        <span style="font-weight: bold;width: 23%; display: inline-block;">家庭地址：</span>{{stuDetailInfo.familyAdd}}
                    </li>
                </ul>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="stuDetaileInfoShow = false">取 消</el-button>
                <el-button type="primary" @click="stuDetaileInfoShow = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>

export default {
    name: 'students',
    data () {
        return { 
            collegeLists: [],  // 学院列表
            classPage: {
                pageNum: 1,  // 起始页面
                total: -99,   // 总条数
                pages: '',  // 总页数
                pageSize: 10,  // 页面显示条数
            },
            classList: [],  // 班级列表
            isLoading: false,
            classArr: [
                {id:1, className: 'bg-primary'},
                {id:1, className: 'bg-success'},
                {id:1, className: 'bg-info'},
                {id:1, className: 'bg-warning'},
                {id:1, className: 'bg-danger'},
                {id:1, className: 'bg-purple'},
                {id:1, className: 'bg-cyan'},
                {id:1, className: 'bg-brown'},
            ],
            stuPage: {
                pageNum: 1,  // 起始页面
                total: -99,   // 总条数
                pages: '',  // 总页数
                pageSize: 10,  // 页面显示条数
            },
            stuLists: [],
            isLoading1: false,
            stuDetailInfo: {},
            stuDetaileInfoShow: false,
        }
    },
    methods: {

        handleCurrentChangeStu (val) {   // 学生分页
            console.log(val)
        },
        handleCheckStu (index, item) {  // 查看学生详细信息
            console.log(item)
            this.stuDetaileInfoShow = true
            this.$server.getStuDetailInfo(item).then((res) => {
                console.log(res)
                if (res) {
                    if (item.res == 0) {
                        item.res = '群众'
                    } else if (item.res == 1) {
                        item.res = '共青团员'
                    } else if (item.res == 2) {
                        item.res = '其他'
                    }
                    this.stuDetailInfo = res
                }
            }).catch((err) => {
                console.log(err)
            })
        },
        handleCheck (index, item) {  // 查看班级学生
            console.log(item)
            this.$loading({
                lock: true,
                text: 'Loading'
            })

            const params = {
                classUUID: item.classUUID,
                pageNum: this.stuPage.pageNum || 1
            }
            this.isLoading1 = true
            this.$server.getClassStuList(params).then((res) => {
                console.log(res)
                if (res.list.length != 0) {
                    this.$loading().close()
                    this.isLoading1 = false
                    res.list.forEach((item, index) => {
                        /**
                         * 0：群众 1：共青团员 2：其他
                         */

                        if (item.polStatus == 0) {
                            item.polStatus = '群众'
                        } else if (item.polStatus == 1) {
                            item.polStatus = '共青团员'
                        } else if (item.polStatus == 2) {
                            item.polStatus = '其他'
                        }
                    })
                    
                    
                    this.stuLists = res.list
                    this.stuPage.total = res.total
                    this.stuPage.pages = res.pages
                    this.stuPage.pageSize = res.pageSize

                } else {
                    this.$loading().close()
                    this.isLoading1 = false
                    this.stuLists = res.list
                    this.$message({
                        message: '暂无数据',
                        type: 'success'
                    });

                }

            }).catch((err) => {
                console.log(err)
            })
        },
        handleCurrentChange (val) {  // 班级分页
            this.classPage.pageNum = val
            
        },
        checkColStu (item) {  // 查看学院学生列表
            console.log(item)
            this.$loading({
                lock: true,
                text: 'Loading'
            })

            const params = {
                colID: item.colID,
                pageNum: this.classPage.pageNum ||1
            }
            this.isLoading = true
            this.$server.getColStuList(params).then((res) => {
                console.log(res)
                if (res.list.length != 0) {
                    this.$loading().close()
                    this.isLoading = false
                    this.classList = res.list
                    this.classPage.total = res.total
                    this.classPage.pages = res.pages
                    this.classPage.pageSize = res.pageSize

                } else {
                    this.$loading().close()
                    this.isLoading = false
                    this.classList = res.list
                    this.stuLists = []
                    this.$message({
                        message: '暂无数据',
                        type: 'success'
                    });

                }
            }).catch((err) => {
                console.log(err)
                this.$loading().close()
            })
        },
        getColList () {  // 获取学院信息
            this.$server.getCollegeList().then((res) => {
                console.log(res)
                if (res.length != 0 ) {
                    this.collegeLists = res
                }
            }).catch((err) => { 
                console.log(err)
            })
        }
    },
    created () {
        // 获取学院信息
        this.getColList()
    }
}
</script>

<style scoped>

</style>
