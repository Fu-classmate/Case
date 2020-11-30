window.onload = function() {
	let name = document.querySelector('.name')
	let author = document.querySelector('.author')
	let category = document.querySelector('.category')
	let desc = document.querySelector('.desc')
	let btn = document.querySelector('#btn')

	btn.onclick = function(e) {
		e.preventDefault()

		let nameV = name.value
		let authorV = author.value
		let categoryV = category.value
		let descV = desc.value

		if (!nameV || !authorV || !categoryV || !descV) {
			alert('输入为空')
			return false
		}

		axios.post('http://localhost:3000/addBooks', {
				name: nameV,
				author: authorV,
				category: categoryV,
				desc: descV
			})
			.then(res => {
				alert('添加成功')
				window.location.href = 'index.html'
			})
			.catch(err => console.log(err))

	}
}
