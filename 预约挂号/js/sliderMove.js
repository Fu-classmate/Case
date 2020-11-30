// 轮播图
var banner = document.querySelector('.banner_slider')
var ul = banner.querySelector('ul')
var btn = banner.querySelectorAll('.btn')
var btnRan = banner.querySelector('.btnS')
action(banner, ul, btnRan, btn, 600)

//a 为最外的盒子
//b 为ul类名 
//c 为小圆点外的ul类名 
//d 为左右箭头标签
//e为最外面盒子的宽度
// f为最外的盒子宽度
function action(a, b, c, d, e) {
	let box = a //a 为最外的盒子
	let ulImg = b //b 为ul类名 
	let LiImg = ulImg.children
	let btnStr = c //c 为小圆点外的ul类名 
	let btn = d // d 为左右箭头标签

	//声明点击初始变量
	let flas = true
	let index = 0

	// 设置css样式
	box.style.width = e + 'px'

	for (let i = 0; i < LiImg.length; i++) {
		LiImg[i].style.width = box.offsetWidth + 'px'
	}

	// 鼠标移入移出 按钮显示隐藏
	box.onmouseover = function() { //移入显示
		btn[0].style.display = 'block'
		btn[1].style.display = 'block'

		//右定时器  移入停止
		clearInterval(timer)
	}
	box.onmouseout = function() { //移出隐藏
		btn[0].style.display = 'none'
		btn[1].style.display = 'none'

		//右定时器  移出启动
		timer = setInterval(function() {
			btn[1].onclick()
		}, 1000)
	}


	// 开启定时器
	timer = setInterval(function() {
		btn[1].onclick() // 调用 右按钮点击事件
	}, 1000)


	//动态添加克隆第一张图片
	let oneLi = ulImg.children[0].cloneNode(true)
	ulImg.appendChild(oneLi);

	//动态获取 li 的宽度
	LiImgs = ulImg.children
	let w = e * LiImgs.length
	ulImg.style.width = w + 'px'

	// 动态 添加 小圆点
	for (let i = 0; i < LiImg.length - 1; i++) { //先循环添加小圆点
		let liBtn = document.createElement('li')
		btnStr.appendChild(liBtn)
	}

	//小圆点点击
	let liBtns = btnStr.children
	for (let i = 0; i < LiImg.length - 1; i++) { //然后 获取小圆点
		liBtns[0].classList.add('active') //给第一个小圆点 添加 类名

		//给所有小圆点添加自定义属性
		liBtns[i].setAttribute('index', i)

		liBtns[i].onclick = function() { //所有小圆点添加点击事件
			index = this.getAttribute('index') //获取自定义属性
			//通过点击 获取 对应的 自定义属性值 然后传参给 图片小圆点关联 的函数
			num(index)

			animation(ulImg, -index * box.offsetWidth, 10, function() {
				flas = true
			})
		}
	}

	//鼠标点击左右轮播
	btn[0].onclick = function() { //左按钮
		if (flas) { //节流阀
			flas = false //进入if后改为false 防止重复点击
			if (index == 0) { //当index为 0 的时候 直接移动到最后的一张图片
				index = LiImg.length - 1
				ulImg.style.left = -index * box.offsetWidth + 'px';
			}
			index-- //左箭头减减
			animation(ulImg, -index * box.offsetWidth, 10, function() {
				flas = true
			})

			//通过index值 传参给 图片小圆点关联 的函数 同步
			num(index)
		}
	}

	btn[1].onclick = function() { //右按钮
		if (flas) {
			flas = false
			if (index == 0) {
				index = 0
				ulImg.style.left = 0 + 'px';
			}
			index++
			animation(ulImg, -index * box.offsetWidth, 10, function() {
				flas = true
			})

			if (index == liBtns.length) index = 0
			num(index)
		}
	}

	//缓冲动画  eve 元素   trage 最大值  span  移动速度  callback 节流阀
	function animation(eve, trage, span, callback) {
		if (eve.timer) {
			clearInterval(eve.timer)
		}
		eve.timer = setInterval(function() {
			if (eve.offsetLeft == trage) {
				eve.offsetLeft = trage + 'px'
				callback && callback()
			}
			let steep = (trage - eve.offsetLeft) / span
			steep = steep > 0 ? Math.ceil(steep) : Math.floor(steep)
			eve.style.left = eve.offsetLeft + steep + 'px'
		}, 30)
	}

	//小圆点关联图片
	function num(index) {
		for (let i = 0; i < liBtns.length; i++) {
			liBtns[i].classList.remove('active')
		}
		liBtns[index].classList.add('active')
	}

}