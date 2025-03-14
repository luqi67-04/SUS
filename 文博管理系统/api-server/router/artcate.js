//这是文章分类的路由模块


const express = require('express')
 
const router = express.Router()


//导入文章分类的路由处理函数模块
const artCate_handler = require('../router_handler/artcate')


//导入验证数据的中间件
const expressJoi = require('@escook/express-joi') 


//导入需要的处理函数模块
const article_handler = require('../router_handler/article')
//导入需要的验证规则对象
const { add_cate_schema, delete_cate_schema,get_cate_schema , update_cate_schema} = require('../schema/artcate')


//获取文章分类数据的路由
router.get('/cates', artCate_handler.getArtCates)

//新增文章分类的路由
router.post('/addcates', expressJoi(add_cate_schema), artCate_handler.addArticleCates)

//根据id删除文章分类的路由
router.get('/deletecate/:id',expressJoi(delete_cate_schema), artCate_handler.deleteCateById)

//根据id获取文章分类的路由
router.get('/cates/:id', expressJoi(get_cate_schema), artCate_handler.getArtCateById)

//根据id更新文章发类的路由
router.post('/updatecate', expressJoi(update_cate_schema), artCate_handler.updateCateById)

//发布文章的路由
router.post('/add',article_handler.addArticle)
module.exports = router