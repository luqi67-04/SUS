//导入验证规则的模块
const joi = require('joi')
const { param } = require('../router/artcate')

//定义name 和 alias 的验证规则

const name = joi.string().required()
const alias = joi.string().alphanum().required()

//定义id 的验证规则
const  id = joi.number().integer().min(1).required()

//向外共享验证规则对象
exports.add_cate_schema = {
    body: {
        name,
        alias,
    },
}

//验证规则对象，删除分类
exports.delete_cate_schema = {
    params: {
        id,
    },
}

//验证根据id获取文章分类的验证对象
exports.get_cate_schema = {
    params: {
        id,
    },
}

//验证规则对象，更新分类
exports.update_cate_schema = {
    body: {
        Id: id,
        name, 
        alias,
    },
    
}