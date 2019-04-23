import axios from 'axios'
import { Message } from 'element-ui'

// http requser 拦截器
axios.interceptors.request.use((config) => {
    return config
}, (err) => {
    alert('请求超时')
    return Promise.resolve(err)
})

// 响应拦截， 异常处理
axios.interceptors.response.use((data) => {
    return data
}, (err) => {
    if (err && err.response) {
        switch (err.response.status) {
            case 400:
                Message.error('错误请求')
            break;
            case 401:
                Message.error('未授权，请重新登录')
                break;
            case 403:
                Message.error('拒绝访问')
                break;
            case 404:
                Message.error('请求错误,未找到该资源')
                break;
            case 405:
                Message.error('请求方法未允许')
                break;
            case 408:
                Message.error('请求超时')
                break;
            case 500:
                Message.error('服务器端出错')
                break;
            case 501:
                Message.error('网络未实现')
                break;
            case 502:
                Message.error('网络错误')
                break;
            case 503:
                Message.error('服务不可用')
                break;
            case 504:
                Message.error('网络超时')
                break;
            case 505:
                Message.error('http版本不支持该请求')
                break;
            default:
                Message.error(`连接错误${err.response.status}`)
        }
    } else {
        Message.error('服务器连接失败')
    }
})

/**
 *  封装 get 方法
 *  @returns { Promise }
 */

 export function get(url, params = {}) {
     return new Promise((resolve, rejects) => {
         axios.get(url).then((res) => {
             resolve(res.data)
         }).catch((err) => {
             rejects(err)
         })
     })
 }

 /**
  *  封装 post 方法
  *  @returns { Promise }
  */

  export function post(url, params ={}) {
      return new Promise((resolve, reject) => {
          axios.post(url, params).then((res) => {
              resolve(res.data)
          }).catch((err) => {
              reject(err)
          })
      })
  } 

  /**
   *  获取接口方法
   */

   export const server = {
       /**
        * 
        * @param {Object} paramsObj  登录 
        * method POST
        * 字段 telephone & Password
        */
       login (paramsObj) {
           return post('/consumer/admin/admin/login', paramsObj)
       },
       /**
        * 
        * @param {Object} paramsObj  查找教师姓名
        * method get
        * 字段 teaName 
        */
       searchTeacher (paramsObj) {
           return post('/consumer/admin/teacher/get/', paramsObj)
       },
       /**
        * 
        * @param {Object} paramsObj 查看教师详情
        * method GET
        * 字段  teaUUID
        */
       cheackTeacherDetail (paramsObj) {
           return get('/consumer/admin/teacher/get/info/' + paramsObj.teaUUID)
       },
       /**
        * 
        * @param {Object} paramsObj 修改教师信息
        * methods POST
        * FormData 
        */
       changeTeaInfo (paramsObj) {
            return post('/consumer/admin//teacher/update', paramsObj)
       },
       /**
        * 
        * @param {Object} paramsObj 获取家长信息列表
        * method get
        * pageNum
        */
       getParList (paramsObj) {
           return get('/consumer/admin/parent/list/'+ paramsObj.pageNum)
       },
       /**
        * 
        * @param {Object} paramsObj 修改家长信息
        * methods post
        * 字段
        * parName
        * telephone
        * employer
        * parUUID
        * 
        */
       updateParInfo (paramsObj) {
           return post('/consumer/admin/parent/update', paramsObj)
       },
       /**
        * 
        * @param {Object} paramsObj 删除家长信息
        * method get
        * 字段
        * parUUID
        */
       delParInfo (paramsObj) {
            return get('/consumer/admin/parent/delete/'+paramsObj.parUUID)
       },
       /**
        * 
        * 获取学院信息
        * method get
        */
       getCollegeList () {
            return get('/consumer/admin/college/list')
       },
       /**
        * 
        * @param {Object} paramsObj 查看学院学生信息
        * method get
        * 字段
        * colID 学院id
        * pageNum 页数
        */
       getColStuList (paramsObj) {
           return get('/consumer/admin/classInfo/list/'+paramsObj.colID+'/'+paramsObj.pageNum)
       },
       /**
        * 
        * @param {Object} paramsObj 获取年级学生
        * method get
        * 字段
        * classUUID
        * pageNum
        */
       getClassStuList (paramsObj) {
           return get('/consumer/admin/student/list/'+ paramsObj.classUUID+'/'+paramsObj.pageNum)
       },
       /**
        * 
        * @param {Object} paramsObj 获取学生详细信息
        * methods get
        * 字段
        * stuUUID
        */
       getStuDetailInfo (paramsObj) {
            return get('/consumer/admin/student/get/' + paramsObj.stuUUID)
       },
       /**
        * 
        * @param {Object} paramsObj 删除学生信息
        * methods get
        * stuUUID
        */
       delStuInfo (paramsObj) {
            return get('/consumer/admin/student/delete/' + paramsObj.stuUUID)
       }    
   }