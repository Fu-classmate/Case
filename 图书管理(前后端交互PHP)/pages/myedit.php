<?php
	header("Content-type: text/html; charset=utf-8");
	$connect = mysqli_connect('localhost','root','root','fusql');
	if(!$connect){
		exit('<h1>数据库连接</h1>');
	}
	
	if($_SERVER['REQUEST_METHOD']==='GET') {
		$myid=$_GET['id'];
		$sql='select  *  from  user where id='.$myid;    
	}else{
		$avatar = '西游记';
		$name = $_POST['name'];
		$gender = $_POST['gender'];
		$birthday = $_POST['birthday'];
		
		$id = $_POST['id'];
		$sql=  "update  user set name='{$name}',gender='{$gender}',birthday='{$birthday}',avatar='{$avatar}'  where id={$id}";
	}
	
	$query=mysqli_query($connect,$sql);
	
	if(!$query) {
	     exit('<h1>查询数据库失败</h1>');
	};
	
	if($_SERVER['REQUEST_METHOD']==='GET') {
	    $rows=mysqli_fetch_assoc($query);
	    echo json_encode($rows);
	}else {
	  $affect=mysqli_affected_rows($connect);
	    if($affect<0) {
	      exit('更新失败');
	    };
	    $arr=['code'=>200,'msg'=>'更新成功'];
	    echo  json_encode($arr);
	}
?>