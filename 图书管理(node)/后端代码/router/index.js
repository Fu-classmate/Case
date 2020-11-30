const express = require('express')
const router = express.Router()

//导入
const mongoodb = require('../mongodb/index.js')

// 查询
router.get('/index', (req, res) => {
	// console.log('路径请求')
	// 获取到数据库的数据 发送到前端
	mongoodb.find({}).then((result) => {
		res.send(result)
	})
})

//查询单条数据
router.get('/query',(req,res)=>{
	let {id} = req.query
	mongoodb.findById({_id:id})
		.then(result => {
			res.send(result)
		})
		.catch(err => {
			res.send({
				status: 500,
				msg: '查询当前数据失败 找不到这条数据',
				message: err.message
			})
		})
})

//删除数据接口
router.get('/delete', (req, res) => {
	//localhost:3000/delete?id=100   
	//let query = res.query    //获取到的id = 100
	// 结构赋值
	let {id} = req.query

	mongoodb.deleteOne({
			_id: id
		})
		.then(result => {
			if (result.ok == 1) {
				res.send({
					status: 200,
					msg: '删除成功'
				})
			}
		})
		.catch(err => {
			res.send({
				status: 500,
				msg: '删除失败',
				message: err.message
			})
		})

})

// 增加数据接口
router.post('/addBooks', (req, res) => {
	let {name,author,category,desc} = req.body

	mongoodb.create({name,author,category,desc})
		.then(result => {
			// 如果能够走 then 这个函数 那么表示成功
			res.send({
				status: 200,
				msg: '增加成功'
			})
		})
		.catch(err => {
			// 如果能够走 catch 这个函数 那么表示失败
			res.send({
				status: 500,
				msg: '增加失败',
				message: err.message
			})
		})
})

// 修改对应的数据
router.post('/update',(req,res)=>{
	let {id,name,author,category,desc} = req.body
	mongoodb.updateOne({_id:id},{name,author,category,desc})
		.then(result => {
			res.send({
				status: 200,
				msg: '修改数据成功'
			})
		})
		.catch(err => {
			res.send({
				status: 500,
				msg: '修改数据失败',
				message: err.message
			})
		})
})

module.exports = router
