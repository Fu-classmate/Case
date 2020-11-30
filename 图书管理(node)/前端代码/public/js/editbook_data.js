window.onload = function() {
	let ulrName = window.location.search.split('=')[1]

	axios.get('http://localhost:3000/query', {
			params: {
				id: ulrName
			}
		})
		.then(res => {
			console.log(res)
			let HTML = template('tmp', res)
			$('form').html(HTML)
		})
		.catch(err => console.log(err))

	$('form').on('click','#btn',function(e) {
		e.preventDefault()

		let nameV = $('.name').val().trim()
		let authorV = $('.author').val().trim()
		let categoryV = $('.category').val().trim()
		let descV = $('.desc').val().trim()

		if (!nameV || !authorV || !categoryV || !descV) {
			alert('输入为空')
			return false
		}

		axios.post('http://localhost:3000/update', {
				id: ulrName,
				name: nameV,
				author: authorV,
				category: categoryV,
				desc: descV
			})
			.then(res => {
				alert('修改成功')
				window.location.href = 'index.html'
			})
			.catch(err => console.log(err))

	})
}
