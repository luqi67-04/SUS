const express = require('express')
// 创建路由对象
const router = express.Router()

const userHandler = require('../router_handler/user')
//1.导入验证数据的中间件
const expressJoi = require('@escook/express-joi')
//2.导入需要的验证规则的对象
const { reg_login_schema} = require('../schema/user')
// 注册新用户
router.post('/reguser',expressJoi(reg_login_schema),userHandler.regUser)

// 登录
router.post('/login', expressJoi(reg_login_schema),userHandler.login)

// 将路由对象共享出去
module.exports = router