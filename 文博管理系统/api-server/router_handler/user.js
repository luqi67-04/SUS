//导入数据库操作模块
const db = require('../db/index')
//导入 `bcryptjs`模块
const bcrypt = require('bcryptjs')
//导入生成Token 的包
const jwt = require('jsonwebtoken')
//导入全局的配置文件
const config = require('../config')
//注册新用户处理函数
exports.regUser = (req, res) => {
    const userinfo = req.body
    //对表单中的数据，进行合法性的校验
    // if (!userinfo.username || !userinfo.password) { 
    //     return res.send({status: 1,message:'用户名或密码不合法'})
    // }
    // console.log(userinfo)
    //sql查询语句
    const sqlStr = 'select * from ev_users where username=?'
    db.query(sqlStr, userinfo.username, (err, results) => {
        //执行sql语句失败
        if (err) {
            // return res.send({ status: 1, message: err.message })
            return res.cc(err)
        }
        if (results.length > 0) {
            // return res.send({ status: 1, message: '用户名已被占用' })
            return res.cc('用户名已被占用')
        }
        userinfo.password = bcrypt.hashSync(userinfo.password, 10)
        //定义插入新用户的sql语句
        const sql = 'insert into ev_users set ?'
        db.query(sql, { username: userinfo.username, password: userinfo.password }, (err, results) => { 
            //判断sql语句是否执行成功
            if (err)
            //     return res.send({
            //     status: 1, message: err.message
                // })
                return res.cc(err)
             //判断影响行数是否为1
             if (results.affectedRows !== 1) { 
                 //  return res.send({ status: 1, message: '注册用户失败，请稍再试！' })
                 return res.cc('注册用户失败，请稍再试！')
            } 
            res.cc('注册成功',0)
        })  
    })
}
//注册登录函数
exports.login = (req, res) => { 
    const userinfo = req.body
    const sql = `select * from ev_users where username = ?`
    db.query(sql, userinfo.username, function (err, results) {
        //执行sql语句失败
        if (err) return res.cc(err)
        if (results.length !== 1) return res.cc('登陆失败')
        // res.send('login Ok')
        const compareResult = bcrypt.compareSync(userinfo.password, results[0].password)
        if (!compareResult) return res.cc('登录失败')
        //TODO:在服务器中生成Token字符串
        const user = { ...results[0],password:'',user_pic:'' }
        //    对用户的信息进行加密，生成Token字符串
        const tokenStr = jwt.sign(user, config.jwtSecretKey, { expiresIn: config.expiresIn })
        // console.log(tokenStr)
        //调用res.send()将Token响应给客户端
        res.send({
            status: 0,
            message: '登录成功',
            token:'Bearer '+tokenStr,
        })
    })
}
