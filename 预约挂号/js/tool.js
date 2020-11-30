// 排他
let tab_one = document.querySelectorAll('.tab-hospital li')
let tab_two = document.querySelectorAll('.tabs')
let news = document.querySelectorAll('.news')

row(tab_one,tab_two,news)


function row(tab_one,tab_two,news) {
	for (let i = 0; i < tab_one.length; i++) {
		news[0].style.display = 'block'
		tab_one[i].setAttribute('index', i)

		tab_one[i].addEventListener('click', function() {
			for (let i = 0; i < tab_one.length; i++) {
				tab_one[i].classList.remove('active')

				news[i].style.display = 'none'
			}
			tab_one[i].classList.add('active')

			let index = this.getAttribute('index')
			news[index].style.display = 'block'
		})
	}
	
	for (let i = 0; i < tab_two.length; i++) {
		let item = tab_two[i].children
	
		for(let i=0;i<item.length;i++){
			item[i].addEventListener('click', function() {
				for (let i = 0; i < item.length; i++) {
					item[i].classList.remove('active')
				}
				this.classList.add('active')
			})
		}	
	}
}