//这是路由处理函数模块

//导入数据库操作模块
const db = require('../db/index')

//获取文章分类列表的处理函数
exports.getArtCates = (req, res) => { 
    // res.send('ok')
    //定义查询分类列表的sql查询语句
    const sql = 'select * from ev_article_cate where is_delete = 0 order by id asc;'
    //调用db.query()执行sql语句
    db.query(sql, (err, results) => { 
        if (err) return res.cc(err)
        res.send({
            status: 0,
            message: '获取文章分类数据成功',
            data: results,

        })
    })
}

//新增文章分类的路由处理函数
exports.addArticleCates = (req, res) => { 
    // res.send('ok')
    //定义查重的sql语句
    const sql = 'select * from ev_article_cate where name = ? or alias = ?'
    //2.执行sql语句
    db.query(sql, [req.body.name, req.body.alias], (err, results) => { 
        //3.判断是否执行sql语句失败
        if (err) return res.cc(err)
        
        //4.1判断数据的length
        if (results.length === 2) return res.cc('分类名和分类别名分别被占用，请更换后重试')
        if (results.length === 1 && results[0].name === req.body.name && results[0].alias === req.body.alias) return res.cc('分类名和分类别名同时被占用，请更换后重试')
        if (results.length === 1 && results[0].name === req.body.name) return res.cc('分类名被占用，请更换后重试')
        if(results.length === 1 && results[0].alias === req.nody.alias ) return res.cc('分类别名被占用，请更换后重试')
        
        //定义插入文章分类的sql语句
        const sql = 'insert into ev_article_cate set ?'
        db.query(sql, req.body, (err, results) => { 
            if (err) return res.cc(err)
            if (results.affectedRows !== 1) return res.cc('新增文章分类失败')
            res.cc('新增文章分类成功', 0)
        })
    })
}

//删除文章分类的处理函数
exports.deleteCateById = (req, res) => { 
    // res.send('ok')
    //定义标记删除的sql语句
    const sql = 'update ev_article_cate set is_delete=1 where id = ?'
    db.query(sql, req.params.id, (err, results) => { 
        if (err) return res.cc(err)
        if (results.affectedRows !== 1) return res.cc('删除文章分类失败' )
        res.cc('删除文章分类成功',0)
       
    })
}

//根据id 获取文章分类的路由
exports.getArtCateById = (req, res) => { 
    // res.send('ok')
    const sql = 'select * from ev_article_cate where id= ?'
    db.query(sql, req.params.id, (err, results) => { 
        if (err) return res.cc(err)
        if (results.length !== 1) return res.cc('获取文章分类数据失败')
        res.cc({
            satus: 0,
            message: '获取文章分类数据成功',
            data: results[0],
        })
    })
}

//根据id更新文章分类的路由
exports.updateCateById = (req, res) => { 
    // res.send('ok')
    //定义查重的sql语句
    const sql = 'select * from ev_article_cate where Id <>? and ( name=? or alias = ?)'

    db.query(sql, [req.body.Id, req.body.name, req.body.alias], (err, results) => { 
        if (err) return res.cc(err)
        //判断分类名和分类别名是否被占用
        if (results.length === 2) return res.cc('分类名和分类别名被占用，请更换后重试')
        if(results.length === 1 && results[0].name === req.body.name) return res.cc('分类名被占用，请更换后重试')
        if (results.length === 1 && results[0].alias === req.body.alias) return res.cc('分类别名被占用，请更换后重试')
        
        // res.cc('ok',0)
        
        //更新文章分类
        const sql = 'update ev_article_cate set ? where Id = ?'
        db.query(sql, [req.body, req.body.Id], (err, results) => { 
            if (err) res.cc(err)
            if (results.affectedRows !== 1) return res.cc('更新文章分类失败')
            
            //更新文章分类成功
            res.cc('更新文章分类成功', 0)
        })

    })
}