// 导入
const express = require('express')
const bodyParser = require('body-parser')
const router = require('./router/index.js')

const app = new express()

//app.use(express.static('文件夹名字'))  挂载静态资源
app.use(express.static('../前端代码/public'))

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use(router)

app.listen(3000,()=>{
	console.log('启动成功')
})