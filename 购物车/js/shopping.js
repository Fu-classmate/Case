//需求实现

/* 
	1 商品的信息展示lis功能
	2 实现全选 反选功能
	3 实现删除功能
	4 实现商品数量的加加跟减减功能
	5 实现用户手动 输入数量功能
	6 实现商品添加功能
	7 实现商品全选功能(总价)
	8 实现 商品 选中的数量占总数多少
*/

// 模拟动态数据

var datas = [{
		txt: '西游记',
		price: 90,
		num: 90
	},
	{
		txt: '三国演义',
		price: 89,
		num: 89
	},
	{
		txt: '水浒传',
		price: 88,
		num: 88
	},
	{
		txt: '红楼梦',
		price: 87,
		num: 87
	},
	{
		txt: '其他',
		price: 86,
		num: 86
	},
]

var tbody = document.querySelector('tbody')

function show() { //动态展示功能
	tbody.innerHTML = ''
	for (var i = 0; i < datas.length; i++) {
		tbody.innerHTML +=
			`
			<tr>
				<td><input type='checkbox' class='ches'></td>
				<td>${datas[i].txt}</td>
				<td>
					<button class='reduce'>-</button>
					<input type='text' value=1 class='text'>
					<button class='add'>+</button>
				</td>
				<td class='price'>${datas[i].price}</td>
				<td class='num'>${datas[i].num}</td>
				<td><button class='remove'>删除</button></td>
			</tr>`
	}
}
show()

function checkeds() { // 全选功能
	var Checked = document.querySelector('.Checked')
	var ches = document.querySelectorAll('.ches')
	Checked.onclick = function() {
		for (var i = 0; i < datas.length; i++) {
			Checked.checked ? ches[i].checked = true : ches[i].checked = false
		}
	}
	for (var i = 0; i < datas.length; i++) {
		ches[i].onclick = function() {
			for (var i = 0; i < datas.length; i++) {
				if (!ches[i].checked) {
					Checked.checked = false
					break
				}
				Checked.checked = true
			}
		}
	}
}
checkeds()

function Remove() { //删除功能
	var remove = document.querySelectorAll('.remove')
	var ches = tbody.querySelectorAll('.ches');

	for (var i = 0; i < datas.length; i++) {
		remove[i].addEventListener('click', function() {
			var message = window.confirm('您真的要删除吗')
			if (message) tbody.removeChild(this.parentNode.parentNode)

			delCheck()
			sub()
		})
	}
}
Remove()

function num() { //加加减减功能
	var reduce = document.querySelectorAll('.reduce')
	var add = document.querySelectorAll('.add')

	for (var i = 0; i < datas.length; i++) {
		add[i].addEventListener('click', function() {
			++this.previousElementSibling.value
			sub()
		})
		reduce[i].addEventListener('click', function() {
			var numInput = --this.nextElementSibling.value
			if (numInput <= 1) this.nextElementSibling.value = 1
			sub()
		})
	}
}
num()

function sub() { // 计算小计
	var price = document.querySelectorAll('.price')
	var totalPrice = document.querySelector('.totalPrice')
	var num = document.querySelectorAll('.num')
	var text = document.querySelectorAll('.text')

	var numAll = 0
	for (var i = 0; i < text.length; i++) {
		num[i].innerText = text[i].value * price[i].innerText
		numAll += Number(num[i].innerText)
	}
	totalPrice.innerText = numAll
}
sub()

function add() { //添加功能
	var btn = document.querySelector('.toAddCart')
	var Name = document.querySelector('.productName')
	var Price = document.querySelector('.productPrice')
	var Sub = document.querySelector('.productSub')
	var Checked = document.querySelector('.Checked')

	btn.addEventListener('click', function() {
		var arr = {}
		arr.txt = Name.value
		arr.price = Price.value
		arr.num = arr.price
		datas.push(arr)

		Name.value = ''
		Price.value = ''

		if(Checked.checked) Checked.checked = false  //清空全选

		show()
		checkeds()
		num()
		sub()
		Remove()
	})
}
add()

function purge() { //清空购物车功能
	var clearCart = document.querySelector('.clearCart');
	var Checked = document.querySelector('.Checked')
	clearCart.onclick = function() {
		var flag = window.confirm('是否要清空购物车');
		if (flag) {
			datas = []
			show()
			if(Checked.checked) Checked.checked = false  //清空全选
		}
	}
}
purge()

function delCheck() { //重新获取单选按钮
	var Checked = document.querySelector('.Checked')
	var ches = document.querySelectorAll('.ches')
	for (var j = 0; j < ches.length; j++) {
		if (!ches[j].checked) {
			Checked.checked = false;
			break;
		} else {
			Checked.checked = true;
		}
	}
}
