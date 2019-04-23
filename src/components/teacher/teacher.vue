<template>
    <div class="teacher">
        <div class="search">
            <div class="search-info">
                <input type="text" class="search-info" placeholder="请输入老师姓名, 如 张三" v-model="teaName" @keyup.enter="search()"><button @click="search()"><i class="mdi mdi-account-search"></i> 搜索</button>
            </div>
            <div class="ops">
                <a href="http://192.168.22.46:8006/teacher/download">
                    <span>
                        <i class="mdi mdi-download"></i>
                        下载教师信息模板
                    </span>
                </a>
                <br>
                <span @click="openTeaInfoUpload()">
                    <i class="mdi mdi-upload"></i>
                    导入教师信息
                </span>
            </div>
        </div>
        <div class="search-content">
            <div class="row">
                <div class="col-sm-6 col-lg-3" v-for="(item, index) in searchLists" :key="index">
                    <div class="card">
                        <div class="card-header bg-info">
                            教师名
                        </div>
                        <div class="card-body">
                            <p style="cursor: pointer;" >{{item.teaName}} <button type="button" class="btn btn-info btn-xs" style="float: right;" @click="checkTeacherInfo(item)">查看详情</button></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 修改教师信息 -->
        <el-dialog
            title="教师信息详情"
            :visible.sync="isChangeTeacherInfoShow"
            width="30%"
            >
            <div class="teacherDetail">
                <form ref="changeTeaInfo">
                    <input type="hidden" name="teaUUID" v-model="teacherInfo.teaUUID">
                    <div class="form-group">
                        <label>姓名</label>
                        <input type="text" class="form-control" placeholder="请输入教师姓名" name="teaName" v-model="teacherInfo.teaName" :disabled="isChange">
                    </div>
                    <div class="form-group">
                        <label>电话</label>
                        <input type="text" class="form-control" placeholder="请输入电话" name="telephone" v-model="teacherInfo.telephone" :disabled="isChange" maxlength="11">
                    </div>
                    <input type="hidden" name="password" v-model="teacherInfo.password">
                </form>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="isChangeTeacherInfoShow = false">取 消</el-button>
                <el-button type="success" @click="changeTeacherInfoBtn()" v-if="isChange">修 改</el-button>
                <el-button type="primary" @click="postTeaChangeInfo()" v-if="!isChange">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 导入教师信息 -->
        <el-dialog
            title="导入教师信息"
            :visible.sync="isTeaUpShow"
            width="30%"
            >
            <div class="teacherDetail">
                <form ref="upTeaFile">
                    <div class="form-group">
                        <input type="file" name="multipartFile">
                    </div>
                    <div class="form-group">
                        <p>注意事项: 文件格式只能为: <strong>.xls，.xlsx</strong></p>
                    </div>
                </form>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="isTeaUpShow = false">取 消</el-button>
                <el-button @click="uploadTeaInfoFile()" type="primary">上传到服务器</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'teacher',
    data () {
        return {
            teaName: '',
            searchLists: [],
            isChangeTeacherInfoShow: false,
            isChange: true,
            teaDefInfo: {},
            teacherInfo: {
                teaUUID: '',
                teaName: '',
                telephone: '',
                password: null
            },
            isTeaUpShow: false,
            headers: {  // 请求头
                'Content-Type': 'multipart/form-data'
            },
        }
    },
    methods: {
        uploadTeaInfoFile () {  // 上传文件
            const formData = new FormData(this.$refs.upTeaFile)
            axios.post('/admin/teacher/import', formData, this.headers).then((res) => {
                console.log(res)
                if (res == undefined) {
                    this.$message.error('文件上传失败，请检查文件格式');
                    return
                } else if (res.data){
                    this.$message({
                        message: '文件上传成功',
                        type: 'success'
                    });
                    this.isTeaUpShow = false
                }
            }).catch((err) => {
                console.log(err)
            })
        },
        openTeaInfoUpload () {
            this.isTeaUpShow = true
        },
        postTeaChangeInfo () {  // 提交修改信息
            console.log(this.teacherInfo)
            var formData = new FormData(this.$refs.changeTeaInfo)

            this.$server.changeTeaInfo(formData).then((res) => {
                console.log(res)
                if (res) {
                    this.isChangeTeacherInfoShow = false
                    this.$message({
                        message: '修改成功',
                        type: 'success'
                    })
                    this.search()
                } else {
                    this.$message.error('修改失败！')
                    return
                }
            }).catch((err) => {
                console.log(err)
            })
        },
        changeTeacherInfoBtn () {  // 修改老师信息
            this.isChange = !this.isChange
        },
        checkTeacherInfo (item) { // 查看详情
            this.isChangeTeacherInfoShow = true
            this.isChange = true
            console.log(item)
            
            this.$server.cheackTeacherDetail(item).then((res) => {
                console.log(res)
                if (res) {
                    this.teaDefInfo = res
                    this.teacherInfo = res
                }
            }).catch((err) => {
                console.log(err)
            })
        },
        search () {  // 搜索
            if (this.teaName != '') {
                this.$loading({
                    lock: true,
                    text: 'Loading',
                })
                var params = new URLSearchParams
                params.append('teaName', this.teaName)

                this.$server.searchTeacher(params).then((res) => {
                    console.log(res)
                    if (res.length != 0) {
                        this.searchLists = res
                        this.$loading().close()
                    } else {
                        this.$message({
                            message: '暂无数据！',
                            type: 'success'
                        })
                        this.$loading().close()
                    }
                    
                }).catch((err) => {
                    console.log(err)
                    this.$loading().close()
                    this.$message.error('搜索失败！')
                })
            } else {
                this.$message({
                    message: '请输入搜索内容',
                    type: 'warning'
                })
                return
            }
        }
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
