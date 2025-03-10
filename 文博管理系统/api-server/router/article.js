
//导入文章的express路由模块
const express = require('express')
//创建路由对象
const router = express.Router()
//导入需要的处理函数模块
const article_handler = require('../router_handler/article')

//导入处理路径的核心模块
//导入解析formdata格式的表单数据的包
const multer = require('multer')
const path = require('path')

//创建multer的实例对象 通过dest属性指定文件的存放路径
const uploads = multer({ dest: path.join(__dirname, '../uploads') })

// 导入验证数据的中间件
const expressJoi = require('@escook/express-joi')


// 导入需要的验证规则对象
const { add_article_schema, get_articleById_schema, delete_schema, update_article_schema, } = require('../schema/article')


//发布文章的路由
router.post('/add', uploads.single('cover_img'), expressJoi(add_article_schema), article_handler.addArticle)

// 获取文章的列表数据
 router.get('/list', article_handler.getArticle)
//根据Id查询文章
router.get(
	'/:Id',
	expressJoi(get_articleById_schema),
	article_handler.getArticleById
)

//根据ID删除文章的路由
router.get('/delete/:Id', expressJoi(delete_schema), article_handler.deleteById)

//更新文章的路由
router.post(
	'/edit',
	uploads.single('cover_img'),
	expressJoi(update_article_schema),
	article_handler.editArticle
)

//向外共享路由对象
module.exports = router