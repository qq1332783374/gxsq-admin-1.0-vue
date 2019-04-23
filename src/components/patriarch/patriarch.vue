<template>
    <div class="patriarch">
        <div class="search">
            <!-- <div class="search-info">
                <input type="text" class="search-info" placeholder="请输入老师姓名, 如 张三" v-model="teaName" @keyup.enter="search()"><button @click="search()"><i class="mdi mdi-account-search"></i> 搜索</button>
            </div> -->
            <div class="ops">
                <a href="http://192.168.22.46:8006/parent/download">
                    <span>
                        <i class="mdi mdi-download"></i>
                        下载家长信息模板
                    </span>
                </a>
                <br>
                <span @click="handleParInfoShow">
                    <i class="mdi mdi-upload"></i>
                    导入家长信息
                </span>
            </div>
        </div>
        <el-table
            :data="parLists"
            style="width: 100%;"
            highlight-current-row
            v-loading="listLoading"
        >
            <el-table-column 
                label="家长姓名"
                prop="parName"
            />
            <el-table-column
                label="家长电话"
                prop="telephone"
            />
            <el-table-column
                label="工作单位"
                prop="employer"
            />
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                        size="mini"
                        type="primary"
                        @click="handleCheck(scope.$index, scope.row)"
                    >查看
                    </el-button>
                    <el-button
                        size="mini"
                        type="danger"
                        @click="handleDel(scope.$index, scope.row)"
                    >删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-col :span="24">
            <el-pagination
                background
                layout="prev, pager, next"
                :total="total"
                :page-size="10"
                @current-change="handleCurrentChange"
            >
            </el-pagination>
        </el-col>

        <!-- 查看家长信息 -->
        <el-dialog
            title="详细信息"
            :visible.sync="parDetailInfoShow"
            width="30%"
            >
            <div class="teacherDetail">
                <form ref="changeTeaInfo">
                    <input type="hidden" name="teaUUID" v-model="parDetailInfo.parUUID">
                    <div class="form-group">
                        <label>姓名</label>
                        <input type="text" class="form-control" placeholder="请输入家长姓名" name="teaName" v-model="parDetailInfo.parName" :disabled="isChange">
                    </div>
                    <div class="form-group">
                        <label>电话</label>
                        <input type="text" class="form-control" placeholder="请输入家长电话" name="telephone" v-model="parDetailInfo.telephone" :disabled="isChange" maxlength="11">
                    </div>
                    <div class="form-group">
                        <label>工作单位</label>
                        <input type="text" class="form-control" placeholder="请输入家长工作单位" name="employer" v-model="parDetailInfo.employer" :disabled="isChange">
                    </div>
                </form>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancel()">取 消</el-button>
                <el-button type="success" @click="changeParInfoBtn()" v-if="isChange">修 改</el-button>
                <el-button type="primary" @click="postParChangeInfo()" v-if="!isChange">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 导入家长信息 -->
        <el-dialog
            title="导入家长信息"
            :visible.sync="isParUpShow"
            width="30%"
            >
            <div class="teacherDetail">
                <form ref="upParFile">
                    <div class="form-group">
                        <input type="file" name="multipartFile">
                    </div>
                    <div class="form-group">
                        <p>注意事项: 文件格式只能为: <strong>.xls，.xlsx</strong></p>
                    </div>
                </form>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="isParUpShow = false">取 消</el-button>
                <el-button @click="uploadParInfoFile()" type="primary">上传到服务器</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'patriarch',
    data () {
        return {
            listLoading: false,
            pageNum: 1,  // 起始页面
            total: -99,   // 总条数
            pages: '',  // 总页数
            pageSize: 0,  // 页面显示条数
            parLists: [],
            parDetailInfoShow: false,
            parDetailInfo: {  // 家长详细信息
                parUUID: '',
                parName: '',
                telephone: '',
                employer: '',
            },  
            isChange: true,
            isParUpShow: false,
            headers: {  // 请求头
                'Content-Type': 'multipart/form-data'
            },
        }
    },
    methods: {
        uploadParInfoFile () {  // 上传家长信息
            const formData = new FormData(this.$refs.upParFile)
            axios.post('/consumer/admin/parent/import', formData, this.headers).then((res) => {
                console.log(res)
                if (res == undefined) {
                    this.$message.error('文件上传失败，请检查文件格式');
                    return
                } else if (res.data){
                    this.$message({
                        message: '文件上传成功',
                        type: 'success'
                    });
                    this.isParUpShow = false
                }
            }).catch((err) => {
                console.log(err)
            })
        },
        handleParInfoShow () {
            this.isParUpShow = true
        },
        cancel () {  // 取消
            this.parDetailInfoShow = false
            this.isChange = true
        },
        postParChangeInfo () {  // 提交修改信息
            console.log(1)
            if (this.parDetailInfo.parName == '') {
                this.errTips('家长姓名不能为空')
                return
            } else if (this.parDetailInfo.telephone == '') {
                this.errTips('家长电话不能为空')
                return
            } else if (this.parDetailInfo.employer == '') {
                this.errTips('家长单位不能为空')
                return
            } else {
                var params = new URLSearchParams
                params.append('parUUID', this.parDetailInfo.parUUID)
                params.append('parName', this.parDetailInfo.parName)
                params.append('telephone', this.parDetailInfo.telephone)
                params.append('employer', this.parDetailInfo.employer)

                this.$loading({
                    lock: true,
                    text: 'Loading'
                })

                this.$server.updateParInfo(params).then((res) => {
                    console.log(res)
                    if (res) {
                        this.$loading().close()
                        this.$message({
                            message: '修改成功',
                            type: 'success'
                        });
                        this.parDetailInfoShow = false
                        this.isChange = true
                        // 重载
                        this.getPraList(this.pageNum)
                    } else {
                        this.$loading().close()
                        this.$message.error('修改失败！');
                        return
                    }
                }).catch((err) => {
                    console.log(err)
                    this.$loading().close()
                })
            }
        },
        changeParInfoBtn () {  // 修改按钮
            this.isChange = !this.isChange
        },
        
        handleDel (index, item) {  // 删除
            console.log(item)
            this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$loading({
                    lock: true,
                    text: 'Loading'
                })

                this.$server.delParInfo(item).then((res) => {
                    console.log(res)
                    if (res) {
                        this.$loading().close()
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        // 重载
                        this.getPraList(this.pageNum)
                    }
                    
                }).catch((err) => {
                    this.$loading().close()
                })
                
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
            
        }, 
        handleCheck (index, item) {  // 查看
            this.parDetailInfoShow = true
            this.parDetailInfo = item
            console.log(item)
        },
        handleCurrentChange (val) {  // 分页切换
            console.log(val)
            this.pageNum = val
            this.getPraList(val)
        },
        getPraList (pageNum) { 
            this.listLoading = true
            const params = {
                pageNum: pageNum || 1
            }
            this.$server.getParList(params).then((res) => {
                console.log(res)
                if (res.list.legth != 0) {
                    this.listLoading = false
                    this.parLists = res.list
                    this.total = res.total
                    this.pages = res.pages
                    this.pageSize = res.pageSize
                } else {
                    this.listLoading = false
                }
            }).catch((err) => {
                console.log(err)
            })
        },
        errTips (tips) {
            this.$message({
                message: tips,
                type: 'warning'
            });
        }
    },
    created () {
        // 获取家长信息模板
        this.getPraList()
    }
}
</script>

<style scoped>
.search {
    box-sizing: border-box;
    padding: 15px;
    background: #fff;
    border: 1px solid #ddd;
    box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.11);
    display: flex;
    align-items: center;
    margin-bottom: 15px;
}
.search-info {
    flex: 1;
}
.search-info input{
    padding: 5px 12px;
    min-width: 200px;
    outline: none;
}
.search-info button {
    padding: 6px 12px;
    border: 1px solid #2b99ff;
    background: #2b99ff;
    color: #fff;
}
.stu {
    padding: 15px;
    background: #fff;
    box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.11);
}
.ops {
    cursor: pointer;
}
.ops span:hover {
    color: #2b99ff;
}
</style>
