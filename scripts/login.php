<?php 
if($_GET['action'] == 'logout') { 
    session_start(); 
    session_unset(); 
    session_destroy(); 
} 		

if (isset($_POST['login'])) {
  $filepath = '../users/' . $_POST['username'] . '/user.txt'; 
  if (file_exists($filepath)) {  
      $userdata = file($filepath); 
      if (trim($userdata[1]) != md5($_POST['password'])) { 
          header('location: ../index.php?error'); 
          exit(); 
      } 
      session_start(); 
      $_SESSION['uname'] = trim($userdata[0]); 
      $_SESSION['umail'] = $_POST['username']; 
      header('location: ' . $_SERVER['PHP_SELF']);			
  } else header('location: ../index.php?error');
} else {
	session_start(); 
	if (!empty($_SESSION['uname'])) header('location: ../index.php?success'); 
?>