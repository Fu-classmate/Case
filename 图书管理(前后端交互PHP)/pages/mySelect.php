<?php
	header("Content-type: text/html; charset=utf-8");
	$connect = mysqli_connect('localhost','root','root','fusql');
	
	if(!$connect){
		exit('<h1>连接数据库失败</h1>');
	}
	
	$sql = 'select * from user';
	
	$query = mysqli_query($connect,$sql);
	
	if(!$query){
		exit('<h1>查询数据库失败</h1>');
	}
	
	$arr = [];
	while($rows = mysqli_fetch_assoc($query)){
		$arr[] = $rows;
	}
	echo json_encode($arr);
	
?>