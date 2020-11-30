$(function() {
	//查询渲染页面  index
	show()

	//删除
	$('#tbody').on('click', '.delete_btn', function() {
		let item = $(this).attr('data-item')
		axios.get('http://localhost:3000/delete', {
				params: {
					id: item
				}
			})
			.then(res => {
				show()
			})
			.catch(err => console.log('查询失败'))	})

	function show() {
		axios.get('http://localhost:3000/index')
			.then(res => {
				let HTML = template('tmp', res)
				$('#tbody').html(HTML)
			})
			.catch(err => console.log('查询失败'))
	}

})
