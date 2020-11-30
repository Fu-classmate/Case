let box = document.querySelector('div')
let ulImg = document.querySelector('.ulImg')
let LiImg = document.querySelectorAll('.ulImg>li')
let btnStr = document.querySelector('.btnStr')
let btn = document.querySelectorAll('button')

//声明点击初始变量
let flas = true
let index = 0

// 鼠标移入移出 按钮显示隐藏
box.onmouseover = function() {
	btn[0].style.display = 'block'
	btn[1].style.display = 'block'
	clearInterval(timer)
}
box.onmouseout = function() {
	btn[0].style.display = 'none'
	btn[1].style.display = 'none'
	timer = setInterval(function() {
		btn[1].onclick()
	}, 1000)
}
timer = setInterval(function() {
	btn[1].onclick()
}, 1000)

//动态添加克隆第一张图片
let oneLi = ulImg.children[0].cloneNode(true)
ulImg.appendChild(oneLi);

//动态获取div宽度
LiImgs = document.querySelectorAll('.ulImg>li')
let w = 600 * LiImgs.length
ulImg.style.width = w + 'px'

// 动态添加小圆点
for (let i = 0; i < LiImg.length; i++) { //先循环完成
	let liBtn = document.createElement('li')
	btnStr.appendChild(liBtn)
}

//小圆点点击
let liBtns = document.querySelectorAll('.btnStr>li')
for (let i = 0; i < LiImg.length; i++) { //后获取
	liBtns[0].classList.add('active')

	//给所有小圆点添加自定义属性
	liBtns[i].setAttribute('index', i)

	liBtns[i].onclick = function() {
		index = this.getAttribute('index')
		num(index)

		animation(ulImg, -index * box.offsetWidth, 10, function() {
			flas = true
		})
	}
}

//鼠标点击左右轮播
btn[0].onclick = function() { //左
	if (flas) {
		flas = false
		if (index == 0) {
			index = LiImg.length - 1
			ulImg.style.left = -index * box.offsetWidth + 'px';
		}
		index--
		animation(ulImg, -index * box.offsetWidth, 10, function() {
			flas = true
		})
		num(index)
	}
}

btn[1].onclick = function() { //右
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

		if (index == liBtns.length) {
			index = 0
		}
		num(index)
	}
}

//缓冲动画 
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
