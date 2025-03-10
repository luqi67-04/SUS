// 导入 express 模块
const express = require('express')

// 创建 express 的服务器实例
const app = express()
const joi = require('joi')
// write your code here...
// 导入 cors 中间件
const cors = require('cors')
// 将 cors 注册为全局中间件
app.use(cors())
//配置解析表单数据的中间件
app.use(express.urlencoded({ extended: false }))
//一定要在路由之前封装res.cc函数
app.use((req, res, next) => { 
  res.cc = function (err, status = 1) { 
    res.send({
      status,
      message: err instanceof Error ? err.message : err,
    })
  }
  next()
})
//一定要在路由之前配置解析Token的中间件
const expressJWT = require('express-jwt')
const config = require('./config')

app.use(expressJWT({ secret: config.jwtSecretKey }).unless({path: [/^\/api\//] }))
// 导入并注册用户路由模块
const userRouter = require('./router/user')
app.use('/api', userRouter)

//导入并注册用户信息的路由模块
const userinfoRouter = require('./router/userinfo')
app.use('/my', userinfoRouter)

//导入并使用文章分类的路由模块
const artCateRouter = require('./router/artcate')
app.use('/my/article', artCateRouter)

//导入并使用文章路由模块
const artticleRouter = require('./router/article')
//为文章路由挂载统一的访问前缀
app.use('/my/article',artticleRouter)
//定义错误级别的中间件
app.use((err, req, res, next) => { 
  if (err instanceof joi.ValidationError) return res.cc(err)
  //捕获身份认证失败的错误
  if(err.name === 'UnauthorizedError') return res.cc('身份认证失败')
  //未知的错误
  res.cc(err)
})


// 托管静态资源文件
app.use('/uploads', express.static('./uploads'))


// 调用 app.listen 方法，指定端口号并启动web服务器
app.listen(3007, function () {
  console.log('api server running at http://127.0.0.1:3007')
})