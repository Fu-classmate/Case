<?php
	header("Content-type: text/html; charset=utf-8");
	$connect = mysqli_connect('localhost','root','root','fusql');
	
	if(!$connect){
		exit('<h1>连接数据库失败</h1>');
	}
	
	if($_SERVER['REQUEST_METHOD']==='GET') {
		$myid = $_GET['id'];
		$sql = 'delete from user where id='.$myid;
		$query = mysqli_query($connect,$sql);
	}else{
		$avatar = '西游记';
		$name = $_POST['name'];
		$gender = $_POST['gender'];
		$birthday = $_POST['birthday'];
		
		$sql = "insert into user values(null,'{$name}','{$gender}','{$birthday}','{$avatar}')";
		$query = mysqli_query($connect,$sql);
	}
	
	if(!$query){
		exit('<h1>删除数据库失败</h1>');
	}
	
	//受影响的行
	$affect = mysqli_affected_rows($connect);
	if($affect<0){
		exit('删除失败');
	}
	$arr = ['code'=>200,'msg'=>'删除成功'];
	echo json_encode($arr);
	
?>