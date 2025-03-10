//导入数据库操作模块
const db = require('../db/index')
// 导入处理密码的模块
const bcrypt = require('bcryptjs')
//获取用户基本信息的处理函数
exports.getUserInfo = (req, res) => {
    // res.send('ok')
    //获取用户信息的sql语句
    const sql = 'select id, username, nickname, email, user_pic from ev_users where id = ?'

    //调用db.query()执行sql语句
    //express-jwt 身份认证成功后会自动在req上挂载user的相关信息
    db.query(sql, req.user.id, (err, results) => { 
        //执行sql语句失败
        if (err) return res.cc(err)
        //执行sql语成功，但查询语句可能为空
        if (results.length !== 1) return res.cc('获取用户信息失败')
        //获取用户信息成功
        res.send({
            status: 0,
            message: '获取用户信息成功',
            data: results[0],
        })
    })
}


//更新用户基本信息
exports.updateUserInfo = (req, res) => { 
    // res.send('ok')
    //定义待执行的sql语句
    const sql = 'update ev_users set ?  where id = ?'
    db.query(sql, [req.body, req.body.id], (err, results) => {
        if (err) return res.cc(err)
        //更新数据失败
        if (results.affectedRows !== 1) return res.cc('更新用户基本信息失败')
        //更新用户信息成功
        res.cc('更新用户信息成功！',0)
        })
}

//更新用户密码的处理函数
exports.updatePassword = (req, res) => { 
    // res.send('ok')
    //根据id查询用户信息
    const sql = 'select * from ev_users where id=?'
    db.query(sql, req.user.id, (err, results) => {
        if (err) return res.cc(err)
        if (results.length !== 1) return res.cc('用户不存在')
        
        //判断用户输入的旧密码是否正确
        const compareResult = bcrypt.compareSync(req.body.oldPwd, results[0].password)
        if (!compareResult) return res.cc('用户输入的旧密码错误')
        
        //更新数据库中的密码
        const sql = 'update ev_users set password = ? where id =?'
         
        //加密后的新密码
        const newPwd = bcrypt.hashSync(req.body.newPwd, 10)

        db.query(sql, [newPwd, req.user.id], (err, results) => { 
            if (err) return res.cc(err)
            //判断影响行数是否为一
            if (results.affectedRows !== 1) return res.cc('更新密码失败')
            //成功
            res.cc('更新密码成功',0)
        })
        // res.cc('ok')
    })
}

//更新用户头像的处理函数
exports.updateAvatar = (req, res) => { 
    // res.send('ok')
    //定义更新用户头像的sql语句
    const sql = 'update ev_users set user_pic=? where id = ?'
    db.query(sql, [req.body.avatar, req.user.id], (err, results) => { 
        if (err) return err.cc(err)
        if (results.affectedRows !== 1) return err.cc('更换用户头像失败')
        res.cc('更新用户头像成功',0)
    })
}