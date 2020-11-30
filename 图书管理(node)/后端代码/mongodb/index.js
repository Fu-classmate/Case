const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/fu-classmate', {
		useUnifedTopology: true,
		useNewUrlParser: true
})


// 创建数据库
const connetions = new mongoose.Schema({
	name: String,
	author: String,
	category: String,
	desc: String
})

// 创建表
const BooksSheets = mongoose.model('tessBooks', connetions)

// 创建10条  第一种方式
// for(let i=1;i<=10;i++){
// 	const UserBooks = new BooksSheets({
// 		name:'西游记',
// 		author:'吴承恩',
// 		category:'文学',
// 		desc:'猴哥的故事'
// 	})
// 	UserBooks.save()
// }

// 第二种方式  可以在后面加then catch
BooksSheets.create({
		name: '红楼梦',
		author: '曹雪芹',
		category:'文学',
		desc:'一个封建王朝的辛酸史'
	})
	.then(res => console.log('添加成功'))
	.catch(err => console.log('添加失败'))


module.exports = BooksSheets
